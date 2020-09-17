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
        //print_r($args['file_name']);
        $image = $this->imageManager->make($this->container->get('settings')['files']['dir'].
            DIRECTORY_SEPARATOR. $args['file_name']);

        $image->resize(200,200);
        // Encode image into given format (PNG) and quality (100%)
        $data = $image->encode($image->extension, 100)->getEncoded();


        // Detect and set the correct content-type, e.g. image/png
        $mime = finfo_buffer(finfo_open(FILEINFO_MIME_TYPE), $data);
        $response = $response->withHeader('Content-Type', $mime);

        // Output image as stream
        return $response->withBody((new StreamFactory())->createStream($data));
    }
}