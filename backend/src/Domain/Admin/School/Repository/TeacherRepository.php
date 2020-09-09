<?php


namespace App\Domain\Admin\School\Repository;


use PDO;

class TeacherRepository
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
     * Check if teacher id exists or not
     */
    public function checkID(string $id): bool{
        $smt = $this->connection->prepare("SELECT COUNT(*) FROM teacher_basic_details WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return (bool)$smt->fetch(PDO::FETCH_ASSOC);
    }

    /*
     * Get teacher basic details
     */
    public function getTeacherBasicDetails(string $id): array{
        $smt = $this->connection->prepare("SELECT * FROM teacher_basic_details WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }

    /*
     * Get teacher address details
     */
    public function getTeacherAddressDetails(string $id): array{
        $smt = $this->connection->prepare("SELECT * FROM teacher_address WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }

    /*
     * Get teacher communication details
     */
    public function getTeacherCommunicationDetails(string $id): array{
        $smt = $this->connection->prepare("SELECT * FROM teacher_communication WHERE id = :id");
        $smt->bindParam(":id", $id, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }
}