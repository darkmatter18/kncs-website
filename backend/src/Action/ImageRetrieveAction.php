<?php


namespace App\Action;


use Intervention\Image\ImageManager;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Psr7\Factory\StreamFactory;

class ImageRetrieveAction
{
    /**
     * @var ImageManager
     */
    private $imageManager;
    /**
     * @var ContainerInterface
     */
    private $container;

    public function __construct(ImageManager $imageManager, ContainerInterface $container){
        $this->imageManager = $imageManager;
        $this->container = $container;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response, array $args)
    {
        // Get the Image from the filename
        $image = $this->imageManager->make($this->container->get('settings')['files']['dir'].
            DIRECTORY_SEPARATOR. $args['file_name']);

        //Get the Query params
        $w = (int) $request->getQueryParams()['w'];
        $h = (int) $request->getQueryParams()['h'];

        $effective_w = $image->getWidth();
        $effective_h = $image->getHeight();

        if (!empty($w) && gettype($w) == "integer" && $w < $effective_w){
            $effective_w = $w;
        }

        if (!empty($h) && gettype($h) == "integer" && $h < $effective_h){
            $effective_h = $h;
        }

        $image->resize($effective_w,$effective_h);
        // Encode image into given format (PNG) and quality (100%)
        $data = $image->encode($image->extension, 100)->getEncoded();


        // Detect and set the correct content-type, e.g. image/png
        $mime = finfo_buffer(finfo_open(FILEINFO_MIME_TYPE), $data);
        $response = $response->withHeader('Content-Type', $mime);

        // Output image as stream
        return $response->withBody((new StreamFactory())->createStream($data));
    }
}