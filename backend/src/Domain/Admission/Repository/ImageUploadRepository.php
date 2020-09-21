<?php


namespace App\Domain\Admission\Repository;


use PDO;

final class ImageUploadRepository
{
    /**
     * @var PDO
     */
    private $connection;

    public function __construct(PDO $PDO)
    {
        $this->connection = $PDO;
    }

    /**
     * Check if user exists or not
     * @param int $application_no application number of the user
     * @return bool return boolean on the basis of existence of the user
     */
    public function isUserExists(int $application_no): bool{
        $smt = $this->connection->prepare("SELECT COUNT(*) FROM admission_student_preregistration_draft_basic_info
                                                    WHERE application_no = :application_no");
        $smt->bindParam(":application_no", $application_no, PDO::PARAM_INT);
        $smt->execute();
        return $smt->fetchColumn();
    }

    /**
     * Check if image of the applicant exists or not
     * @param int $application_no application number of the user
     * @return array return the data available on the application number
     */
    public function isImageExists(int $application_no): array{
        $smt = $this->connection->prepare("SELECT * FROM admission_student_preregistration_draft_image
                                                    WHERE application_no = :application_no");
        $smt->bindParam(":application_no", $application_no, PDO::PARAM_INT);
        $smt->execute();
        $result = $smt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result : array();
    }

    /**
     * Upload the image name of the applicant
     * @param int $application_no application number of the user
     * @param string $image_name name of the image file
     */
    public function uploadImageName(int $application_no, string $image_name): void{
        $smt = $this->connection->prepare("INSERT INTO admission_student_preregistration_draft_image
                                                    (application_no, image_name)
                                                    VALUES(:application_no, :image_name)");
        $smt->bindParam(":application_no", $application_no, PDO::PARAM_INT);
        $smt->bindParam(":image_name", $image_name, PDO::PARAM_STR);
        $smt->execute();
    }

    /**
     * Update the image of the applicant
     * @param int $application_no application number of the user
     * @param string $image_name name of the image file
     */
    public function updateImageName(int $application_no, string $image_name): void{
        $smt = $this->connection->prepare("UPDATE admission_student_preregistration_draft_image
                                                    SET image_name = :image_name
                                                    WHERE application_no = :application_no");
        $smt->bindParam(":application_no", $application_no, PDO::PARAM_INT);
        $smt->bindParam(":image_name", $image_name, PDO::PARAM_STR);
        $smt->execute();

    }
}