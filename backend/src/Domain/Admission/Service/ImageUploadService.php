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

    public function imageUploadOrUpdate(string $application_no, UploadedFileInterface $image){
        $res = $this->imageUploadRepository->isImageExists($application_no);
        if (sizeof($res) > 0){
            //Update image
            $this->uploader->deleteFile($res['image_name']);
            $file_name = $this->getFileName($image);
            $this->imageUploadRepository->updateImageName($application_no, $file_name);
        }else{
            //Upload image
            $file_name = $this->getFileName($image);
            $this->imageUploadRepository->uploadImageName($application_no, $file_name);
        }
    }

    private function getFileName(UploadedFileInterface $uploadedFile): string{
        return $this->uploader->uploadFile($uploadedFile);
    }

}
