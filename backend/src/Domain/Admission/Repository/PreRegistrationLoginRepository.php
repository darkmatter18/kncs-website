<?php


namespace App\Domain\Admission\Repository;


use PDO;

final class PreRegistrationLoginRepository
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
     * @param int $application_no application_no of the user
     * @param string $email email address if the user
     * @param string $dob date of birth of the user
     * @return array user data
     */
    public function login(int $application_no, string $email, string $dob): array{
        $smt = $this->connection->prepare("SELECT T1.*, T2.status 
                                                    FROM admission_student_preregistration_login AS T1
                                                    INNER JOIN admission_student_preregistration_details AS T2
                                                    ON T1.application_no = T2.application_no
                                                    WHERE T1.application_no = :application_no
                                                    AND T1.email = :email
                                                    AND T2.dob = :dob");
        $smt->bindParam(":application_no", $application_no, PDO::PARAM_INT);
        $smt->bindParam(":email", $email, PDO::PARAM_STR);
        $smt->bindParam(":dob", $dob, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetch(PDO::FETCH_ASSOC);
    }
}