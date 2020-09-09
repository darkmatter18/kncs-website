<?php


namespace App\Domain\Admin\School\Repository;


use PDO;

class StudentRepository
{
    /**
     * @var PDO
     */
    private $connection;

    public function __construct(PDO $PDO)
    {
        $this->connection = $PDO;
    }

    /*
     * Check if student id exists or not
     */
    public function checkID(string $id): bool{
        $smt = $this->connection->prepare("SELECT COUNT(*) FROM student_basic_details WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return (bool)$smt->fetch(PDO::FETCH_ASSOC);
    }

    /*
     * Get student basic details
     */
    public function getStudentBasicDetails(string $id): array{
        $smt = $this->connection->prepare("SELECT * FROM student_basic_details WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }

    /*
     * Get student academic info
     */
    public function getStudentAcademicDetails(string $id): array{
        $smt = $this->connection->prepare("SELECT * FROM student_academic_info WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }

    /*
     * Get student address details
     */
    public function getStudentAddressDetails(string $id): array{
        $smt = $this->connection->prepare("SELECT * FROM student_address WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }

    /*
     * Get student communication details
     */
    public function getStudentCommunicationDetails(string $id): array{
        $smt = $this->connection->prepare("SELECT * FROM student_communication WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }

    /*
     * Get student family details
     */
    public function getStudentFamilyDetails(string $id): array{
        $smt = $this->connection->prepare("SELECT * FROM student_family_details WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }

    /*
     * Get student family communication details
     */
    public function getStudentFamilyCommunicationDetails(string $id): array{
        $smt = $this->connection->prepare("SELECT * FROM student_family_communication WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }
}