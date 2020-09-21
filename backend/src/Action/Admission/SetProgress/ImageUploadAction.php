<?php


namespace App\Action\Admission\SetProgress;


use App\Domain\Admission\Service\ImageUploadService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class ImageUploadAction
{
    /**
     * @var ImageUploadService
     */
    private ImageUploadService $imageUploadService;

    public function __construct(ImageUploadService $imageUploadService)
    {
        $this->imageUploadService = $imageUploadService;
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

            // Check Image
            $this->imageUploadService->checkInputFile($image);

            // Image upload of update
            $this->imageUploadService->imageUploadOrUpdate($application_no, $image);

            //Returning response
            return $response->withStatus(204, 'Submitted successfully');

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}