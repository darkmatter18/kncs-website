<?php


namespace App\Domain\Admission\Repository;


use PDO;

final class PreRegistrationRepository
{
    /**
     * @var PDO
     */
    private $connection;

    public function __construct(PDO $PDO)
    {
        $this->connection = $PDO;
    }

    public function preRegistrationDetails(array $data): void{
        $smt = $this->connection->prepare('INSERT INTO admission_student_preregistration_details
                                                    (application_no, first_name, middle_name, last_name, aadhar_no, 
                                                     email, mobile, dob, status)
                                                    VALUES(:application_no, :first_name, :middle_name, :last_name, 
                                                           :aadhar_no, :email, :mobile, :dob, :status)');

        $smt->bindParam(':application_no', $data['application_no'], PDO::PARAM_STR);
        $smt->bindParam(':first_name', $data['first_name'], PDO::PARAM_STR);
        $smt->bindParam(':middle_name', $data['middle_name'], PDO::PARAM_STR);
        $smt->bindParam(':last_name', $data['last_name'], PDO::PARAM_STR);
        $smt->bindParam(':aadhar_no', $data['aadhar_no'], PDO::PARAM_STR);
        $smt->bindParam(':email', $data['email'], PDO::PARAM_STR);
        $smt->bindParam(':mobile', $data['mobile'], PDO::PARAM_STR);
        $smt->bindParam(':dob', $data['dob'], PDO::PARAM_STR);
        $smt->bindParam(':status', $data['status'], PDO::PARAM_STR);

        $smt->execute();
        // student_preregistration_login PDO will go here
        $smt = $this->connection->prepare('INSERT INTO admission_student_preregistration_login
                                                        (application_no, email, dob) 
                                                    VALUES(:application_no, :email, :dob)');

        $smt->bindParam(':application_no', $data['application_no'], PDO::PARAM_STR);
        $smt->bindParam(':email', $data['email'], PDO::PARAM_STR);
        $smt->bindParam(':dob', $data['dob'], PDO::PARAM_STR);
        $smt->execute();
    }
}