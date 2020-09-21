<?php


namespace App\Domain\Admission\Service;


use App\Domain\Admission\Repository\ImageUploadRepository;
use App\Exception\AuthenticationException;
use App\Exception\ValidationException;
use App\Factory\FileUploaderFactory;
use Psr\Http\Message\UploadedFileInterface;

final class ImageUploadService
{
    /**
     * @var ImageUploadRepository
     */
    private ImageUploadRepository $imageUploadRepository;
    /**
     * @var FileUploaderFactory
     */
    private FileUploaderFactory $uploader;

    public function __construct(ImageUploadRepository $imageUploadRepository, FileUploaderFactory $uploaderFactory)
    {
        $this->imageUploadRepository = $imageUploadRepository;
        $this->uploader = $uploaderFactory;
    }

    public function isUserExists(int $application_no){
        $errors = [];
        $result = $this->imageUploadRepository->isUserExists($application_no);
        if (!$result){
            $errors['user'] = "Invalid user";
        }

        if ($errors){
            throw new AuthenticationException('Not authorized', $errors);
        }
    }

    public function checkInputFile(UploadedFileInterface $uploadedFile){
        $errors = [];
        if (empty($uploadedFile)){
            $errors['image'] = 'Please upload a file';
        }else{
            $this->uploader->checkFile($uploadedFile, FileUploaderFactory::TYPE_IMG);
        }
        if ($errors){
            throw new ValidationException('Please check your input', $errors);
        }
    }

    public function getFileName(UploadedFileInterface $uploadedFile): string{
        return $this->uploader->uploadFile($uploadedFile);
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
