<?php


namespace App\Domain\Login\Repository;


use PDO;

final class LoginRepository{
    /**
     * @var PDO
     */
    private $connection;

    public function __construct(PDO $PDO){
        $this->connection = $PDO;
    }

    public function checkUser(string $user_id): array{
        $smt = $this->connection->prepare("SELECT user_id, user_password, user_role
                                                    FROM login WHERE user_email = :email LIMIT 1");

        $smt->bindParam(":email", $user_id, PDO::PARAM_STR);
        $smt->execute();
        $data = $smt->fetch(PDO::FETCH_ASSOC);

        return $data ? $data : array();
    }

    public function getUserDataAndLogin(string $user_id, string $user_role):array{
        $smt = null;
        if($user_role == 'student'){
            $smt = $this->connection->prepare("SELECT student_basic_details.* 
                                                            FROM student_basic_details 
                                                            WHERE student_basic_details.id= :id");
        }
        elseif($user_role == 'teacher'){
            $smt = $this->connection->prepare("SELECT teacher_basic_details.* 
                                                            FROM teacher_basic_details 
                                                            WHERE teacher_basic_details.id= :id");
        }
        elseif($user_role == 'admin'){
            $smt = $this->connection->prepare("SELECT admin_details.* FROM admin_details
                                                            WHERE admin_details.id= :id");

        }

        $smt->bindParam(':id', $user_id, PDO::PARAM_STR);
        $smt->execute();

        return $smt->fetch(PDO::FETCH_ASSOC);
    }
    public function updateLoginDateTime(string $user_id): void{

        $current_time = date('m/d/Y h:i:s a', time());
        $ip_address = null;
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ip_address = $_SERVER['HTTP_CLIENT_IP'];
        else
            $ip_address = "::1";

        $smt = $this->connection->prepare("UPDATE login SET last_login_time = :time , last_login_ip= :ip 
                                             WHERE id = :email");

        $smt->bindParam(':time', $current_time, PDO::PARAM_STR);
        $smt->bindParam(':ip', $ip_address, PDO::PARAM_STR);
        $smt->bindParam(':email', $user_id, PDO::PARAM_STR);
        $smt->execute();
    }
}