<?php


namespace App\Domain\Admission\Service;


use App\Domain\Admission\Repository\ImageUploadRepository;
use App\Exception\ValidationException;
use App\Factory\FileUploaderFactory;

final class ImageUploadService
{
    /**
     * @var ImageUploadRepository
     */
    private $imageUploadRepository;
    /**
     * @var FileUploaderFactory
     */
    private $uploader;

    public function __construct(ImageUploadRepository $imageUploadRepository)
    {
        $this->imageUploadRepository = $imageUploadRepository;

    }

    public function isUserExists(int $application_no){
        $errors = [];
        $result = $this->imageUploadRepository->isUserExists($application_no);
        if (!$result){
            $errors['user'] = "Invalid user";
        }

        if ($errors){
            throw new ValidationException('Not authorized', $errors);
        }
    }

    public function isImageExists(int $application_no): array{
        return $this->imageUploadRepository->isImageExists($application_no);
    }

    public function uploadImageName(int $application_no, string $image_name): void{
        $this->imageUploadRepository->uploadImageName($application_no, $image_name);
    }

    public function updateImageName(int $application_no, string $image_name): void{
        $this->imageUploadRepository->updateImageName($application_no, $image_name);
    }
}
