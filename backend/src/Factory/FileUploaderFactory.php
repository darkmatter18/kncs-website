<?php


namespace App\Factory;


use App\Exception\ValidationException;
use Exception;
use Psr\Http\Message\UploadedFileInterface;

final class FileUploaderFactory
{
    const TYPE_IMG = 0000;
    /**
     * @var string
     */
    private $path;
    /**
     * @var array
     */
    private $types_img;
    /**
     * @var array
     */
    private $max_size;

    public function __construct(array $settings)
    {
        $this->path = $settings['dir'];
        $this->types_img = $settings['types_img'];
        $this->max_size = $settings['max_size'];
    }

    /**
     * Upload Image for form-data
     *
     * @param UploadedFileInterface $uploadedFile
     * @return string|null
     */
    public function uploadFile(UploadedFileInterface $uploadedFile): ?string{
        if ($uploadedFile->getError() == UPLOAD_ERR_OK){
            return $this->moveUploadedFile($this->path, $uploadedFile);
        } else {
            return null;
        }
    }

    /**
     * Check if the uploaded file is eligible
     *
     * @param UploadedFileInterface $uploadedFile
     * @param int $file_type
     * @param int|null $size
     */
    public function checkFile(UploadedFileInterface $uploadedFile, int $file_type, int $size=null): void{
        $errors = [];
        $msg = "";
        if($uploadedFile->getError() != UPLOAD_ERR_OK){
            $msg = $errors['file_upload_error'] = "Please select a file";
        } else {
            if(!$this->getSizeEligibility($file_type,$uploadedFile->getSize(), $size)){
                $msg = $errors['file_size_error'] = "File size is large";
            }
            else {
                if(!$this->checkUploadedType($file_type, $uploadedFile->getClientMediaType())){
                    $msg = $errors['file_type_error'] = "File type is not valid";
                }
            }
        }

        if($errors){
            throw new ValidationException($msg, $errors);
        }
    }

    /**
     * @param int $allotted_file_type
     * @param string|null $uploaded_file_type
     * @return bool
     */
    private function checkUploadedType(int $allotted_file_type, string $uploaded_file_type = null){
        if(!$uploaded_file_type){
            return false;
        } else {
            switch ($allotted_file_type){
                case self::TYPE_IMG:
                    return in_array($uploaded_file_type, $this->types_img);

                default:
                    return false;
            }
        }
    }

    /**
     * Get if the file size is eligible for upload or not
     *
     * @param int $file_type - Type of the uploaded file
     * @param int|null $file_size - Size of the uploaded file
     * @param int|null $allotted_size - Allotted size by the developer
     * @return bool - Eligible ot not
     */
    private function getSizeEligibility(int $file_type, int $file_size =null, int $allotted_size = null){
        return $file_size && $this->getPermissibleSizePerType($file_type, $allotted_size) > $file_size;
    }

    /**
     * get the max permissible size as per image type
     *
     * @param int $file_type - Default Size
     * @param int|null $allotted_size - Size allotted by Developer
     * @return int - Eligible size
     */
    private function getPermissibleSizePerType(int $file_type, int $allotted_size = null): int{
        switch ($file_type){
            case self::TYPE_IMG:
                return $allotted_size ? $allotted_size : $this->max_size['img'];

            default:
                return $allotted_size ? $allotted_size : $this->max_size['max_all'];
        }
    }


    /**
     * Deletes a file
     *
     * @param string $file_name - the name of the file
     * @return bool - Whether the file is deleted or not
     */
    public function deleteFile(string $file_name): bool {
        if(file_exists($this->path.DIRECTORY_SEPARATOR.$file_name)){
            return unlink($this->path.DIRECTORY_SEPARATOR.$file_name);
        } else {
            return false;
        }
    }

    /**
     * Move the file to desired location
     *
     * @param string $directory
     * @param UploadedFileInterface $uploadedFile
     * @return string|null
     */
    private function moveUploadedFile(string $directory, UploadedFileInterface $uploadedFile): ?string
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);

        // see http://php.net/manual/en/function.random-bytes.php
        try {
            $basename = bin2hex(random_bytes(20));
            $filename = sprintf('%s.%0.8s', $basename, $extension);

            $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

            return $filename;
        } catch (Exception $e) {
            return null;
        }

    }
}