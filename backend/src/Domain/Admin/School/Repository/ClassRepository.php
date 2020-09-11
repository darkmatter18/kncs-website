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

    /**
     * Checking of class ID
     * @param string $class_id
     * @return bool
     */
    public function checkClassId(string $class_id): bool{
        $smt = $this->connection->prepare("SELECT COUNT(*) FROM classes WHERE id = :id");
        $smt->bindParam(":id", $class_id, PDO::PARAM_STR);
        $smt->execute();

        return (bool)$smt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Fetch all classes
     * @return array
     */
    public function getClasses(): array{
        $smt = $this->connection->prepare("SELECT * FROM classes");
        $smt->execute();
        return (array)$smt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Create new class
     * @param array $class_details
     */
    public function createClass(array $class_details): void{
        $smt = $this->connection->prepare("INSERT INTO classes(standard, section) 
                                                    VALUES (:standard, :section)");
        $smt->bindParam(":standard", $class_details['standard'], PDO::PARAM_STR);
        $smt->bindParam(":section", $class_details['section'], PDO::PARAM_STR);
        $smt->execute();

    }

    /**
     * Delete a class
     * @param string $class_id
     */
    public function deleteClass(string $class_id): void{
        $smt = $this->connection->prepare("DELETE FROM classes WHERE id = :id");
        $smt->bindParam(":id", $class_id, PDO::PARAM_STR);
        $smt->execute();
    }

    /**
     * Update a class
     * @param array $new_class_details
     * @param string $class_id
     */
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