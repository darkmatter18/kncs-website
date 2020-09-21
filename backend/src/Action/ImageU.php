<?php


namespace App\Action;


use App\Factory\FileUploaderFactory;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class ImageU
{
    /**
     * @var FileUploaderFactory
     */
    private $uploader;

    public function __construct(FileUploaderFactory $uploaderFactory)
    {
        $this->uploader = $uploaderFactory;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response)
    {
        $i = $request->getUploadedFiles()['image'];
        $file_name = $this->uploader->uploadFile($i);

        $response->getBody()->write("Name:  ".$file_name);
        return $response;
    }
}