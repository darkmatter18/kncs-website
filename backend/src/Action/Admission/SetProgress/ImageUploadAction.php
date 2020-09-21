<?php


namespace App\Action\Admission\SetProgress;


use App\Domain\Admission\Service\ImageUploadService;
use App\Factory\FileUploaderFactory;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class ImageUploadAction
{
    /**
     * @var ImageUploadService
     */
    private ImageUploadService $imageUploadService;
    /**
     * @var FileUploaderFactory
     */
    private FileUploaderFactory $uploader;

    public function __construct(ImageUploadService $imageUploadService, FileUploaderFactory $uploaderFactory)
    {
        $this->imageUploadService = $imageUploadService;
        $this->uploader = $uploaderFactory;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response)
    {
        try {
            //Get application number
            $application_no = (string)$request->getAttribute('JwtClaims')['application_no'];

            //Check if user exists or not
            $this->imageUploadService->isUserExists($application_no);

            //input image
            $image = $request->getUploadedFiles()['image'];

            $this->imageUploadService->checkInputFile($image);

            //Check if image already exists or not
            $result = $this->imageUploadService->isImageExists($application_no);
            if (sizeof($result) > 0){
                //Update image
                $this->uploader->deleteFile($result['image_name']);
                $this->imageUploadService->updateImageName($application_no, $image);
            }else{
                //Upload image
                $this->imageUploadService->uploadImageName($application_no, $image);
            }

            //Returning response
            return $response->withStatus(204, 'Submitted successfully');

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}