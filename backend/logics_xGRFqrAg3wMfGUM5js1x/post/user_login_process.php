<?php

/*users_login_process...
*created my Manojit Karmakar 24.07.2020
*/

define('_inc', true);
require INC_DIR . 'index.php';
require BASE_DIR . 'vendor' . DIRECTORY_SEPARATOR . 'autoload.php';
use \Firebase\JWT\JWT;

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

if (isset($_INPUT['email']) && isset($_INPUT['password']) ){
    if (checkRecaptcha($_INPUT['recaptcha_token'])){

        $pdocon->beginTransaction();

        $email_clean = Filter::Email($_INPUT['email']);
        $password_clean = Filter::String($_INPUT['password']);

        $time = time();
        $ip = get_client_ip();

        $smt = $pdocon->prepare("SELECT id, password FROM `users_login` WHERE id = :email AND password = :password LIMIT 1");

        $smt->bindParam(":email", $email_clean, PDO::PARAM_STR);
        $smt->bindParam(":password", $password_clean, PDO::PARAM_STR);

        if ($smt->execute()){

            $smt = $pdocon->prepare("UPDATE `users_login` SET last-login = :time , last-login-ip = :ip WHERE id = :email ");

            $smt->bindParam(':time', $time, PDO::PARAM_STR);
            $smt->bindParam(':ip', $ip, PDO::PARAM_STR);
            $smt->bindParam(":email", $email_clean, PDO::PARAM_STR);

            if ($smt->prepare()) {
                if($pdocon->commit()){

                    $return['status'] = true;
                    $return['statusText'] = null;
                    $return['error'] = "Login Successfull and table Updated";
                } else {

                    $return['status'] = false;
                    $return['statusText'] = null;
                    $return['error'] = "Failed to commit";
                }
                

            } else {
                http_response_code(500);
                $return['status'] = false;
                $return['statusText'] = null;
                $return['error'] = "Failed to record on database";

            }
        } else {
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Login Failed";
        }

    } else {
        http_response_code(401);
        $return['status'] = false;
        $return['jwt'] = null;
        $return['application_no'] = null;
        $return['RecStatus'] = null;
        $return['statusText'] = null;
        $return['error'] = "ReCaptcha verification failed";

    }
} else {
    http_response_code(400);
    $return['status'] = false;
    $return['jwt'] = null;
    $return['application_no'] = null;
    $return['RecStatus'] = null;
    $return['statusText'] = null;
    $return['error'] = "Invalid Request";

}

echo json_encode($return);
exit;