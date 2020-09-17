<?php


namespace App\Factory;


use Exception;
use Psr\Http\Message\UploadedFileInterface;

final class FileUploaderFactory
{
    /**
     * @var string
     */
    private $path;

    public function __construct(array $settings)
    {
        $this->path = $settings['dir'];
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