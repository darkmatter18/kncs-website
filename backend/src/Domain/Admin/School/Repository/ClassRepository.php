<?php


namespace App\Domain\Admin\School\Repository;


use PDO;

final class ClassRepository
{
    /**
     * @var PDO
     */
    private $connection;

    public function __construct(PDO $PDO){
        $this->connection = $PDO;
    }

    public function checkClassId(string $class_id): bool{
        $smt = $this->connection->prepare("SELECT id FROM classes WHERE id = :id");
        $smt->bindParam(":id", $class_id, PDO::PARAM_STR);
        return $smt->execute();
    }

    public function getClasses(): array{
        $smt = $this->connection->prepare("SELECT * FROM classes");
        $smt->execute();
        return (array)$smt->fetch(PDO::FETCH_ASSOC);
    }

    public function createClass(array $class_details): void{
        $smt = $this->connection->prepare("INSERT INTO classes(standard, section) 
                                                    VALUES (:standard, :section)");
        $smt->bindParam(":standard", $class_details['standard'], PDO::PARAM_STR);
        $smt->bindParam(":section", $class_details['section'], PDO::PARAM_STR);
        $smt->execute();

    }

    public function deleteClass(string $class_id): void{
        $smt = $this->connection->prepare("DELETE FROM classes WHERE id = :id");
        $smt->bindParam(":id", $class_id, PDO::PARAM_STR);
        $smt->execute();
    }

    public function updateClass(array $new_class_details, string $class_id): void{
        $smt = $this->connection->prepare("UPDATE classes 
                                                    SET standard = :standard, section = :section
                                                    WHERE id = :id");
        $smt->bindParam(":standard", $new_class_details['standard'], PDO::PARAM_STR);
        $smt->bindParam(":section", $new_class_details['section'], PDO::PARAM_STR);
        $smt->bindParam(":id", $class_id, PDO::PARAM_STR);
        $smt->execute();

    }
}