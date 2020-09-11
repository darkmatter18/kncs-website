<?php


namespace App\Domain\Admin\School\Repository;


use PDO;

final class SubjectRepository
{
    /**
     * @var PDO
     */
    private $connection;

    public function __construct(PDO $PDO){
        $this->connection = $PDO;
    }

    /**
     * Check subject id if exists or not
     * @param string $subject_id
     * @return bool
     */
    public function checkSubjectId(string $subject_id): bool{
        $smt = $this->connection->prepare("SELECT COUNT(*) FROM subjects WHERE id = :id");
        $smt->bindParam(":id", $subject_id, PDO::PARAM_STR);
        $smt->execute();

        return (bool)$smt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Fetch all subject
     * @return array
     */
    public function getSubject(): array{
        $smt = $this->connection->prepare("SELECT * FROM subjects");
        $smt->execute();
        return (array)$smt->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Create a subject
     * @param array $subject_details
     */
    public function createSubject(array $subject_details){
        $smt = $this->connection->prepare("INSERT INTO subjects (subject_name) VALUE (:subject_name)");
        $smt->bindParam(":subject_name", $subject_details["subject_name"], PDO::PARAM_STR);
        $smt->execute();
    }

    /**
     * Update a subject
     * @param array $new_subject_details
     * @param string $subject_id
     */
    public function updateSubject(array $new_subject_details, string $subject_id){
        $smt = $this->connection->prepare("UPDATE subjects SET subject_name = :subject_name WHERE id = :id");
        $smt->bindParam(":id", $subject_id, PDO::PARAM_STR);
        $smt->bindParam(":subject_name", $new_subject_details['subject_name'], PDO::PARAM_STR);
        $smt->execute();
    }

    /**
     * Delete a subject
     * @param string $subject_id
     */
    public function deleteSubject(string $subject_id){
        $smt = $this->connection->prepare("DELETE FROM subjects WHERE id = :id");
        $smt->bindParam(":id", $subject_id, PDO::PARAM_STR);
        $smt->execute();
    }
}