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

if (isset($_INPUT['id']) && isset($_INPUT['password']) && isset($_INPUT['recaptcha_token']) ){
    if (checkRecaptcha($_INPUT['recaptcha_token'])){

        $pdocon->beginTransaction();

        $id_clean = Filter::Email($_INPUT['id']);

        $time = time();
        $ip = get_client_ip();

        $smt = $pdocon->prepare("SELECT id, password FROM `users_login` WHERE id = :email LIMIT 1");

        $smt->bindParam(":email", $id_clean, PDO::PARAM_STR);

        if ($smt->execute()){
            $_d  = $smt->fetch(PDO::FETCH_ASSOC);
            if($_d){
                $hashed_p = $_d['password'];
                if(password_verify($_INPUT['password'], $hashed_p)){

                    $smt = $pdocon->prepare("SELECT users_role.role, users_details.* FROM users_details 
                                                        INNER JOIN users_role 
                                                            ON users_role.id = users_details.id 
                                                        WHERE users_details.id= :id");
                    $smt->bindParam(':id', $id_clean, PDO::PARAM_STR);

                    if($smt->execute()) {
                        $_d  = $smt->fetch(PDO::FETCH_ASSOC);
                        $role = $_d['role'];

                        $smt = $pdocon->prepare("UPDATE users_login SET last_login = :time , last_login_ip= :ip WHERE id = :email ");

                        $smt->bindParam(':time', $time, PDO::PARAM_STR);
                        $smt->bindParam(':ip', $ip, PDO::PARAM_STR);
                        $smt->bindParam(":email", $id_clean, PDO::PARAM_STR);

                        if ($smt->execute()) {
                            if($pdocon->commit()){

                                $issuedAt = time();
                                $duration = (2 * 60 * 60);
                                $expiredAt = time() + (2 * 60 * 60); //Expired after 2 hours


                                // JWT token
                                $token = array (
                                    'iat'  => $issuedAt,              // Issued at: time when the token was generated
                                    'jti'  => $id_clean,  // Json Token Id: an unique identifier for the token
                                    'iss'  => "http://kncs.in",       // Issuer
                                    'nbf'  => $issuedAt,              // Not before
                                    'exp'  => $expiredAt,
                                    "uae"  => $_SERVER['HTTP_USER_AGENT'],
                                    "data" => array (
                                        "user_id" => $id_clean,
                                        "role" => $role
                                    )
                                );

                                $jwt = JWT::encode($token, $_SERVER['HTTP_JWT_SECRET']);


                                $return['status'] = true;
                                $return['jwt'] = $jwt;
                                $return['userId'] = $id_clean;
                                $return['role'] = $role;
                                $return['statusText'] = "Login Successful and table Updated";
                                $return['error'] = null;
                                $return["user"] = $_d;
                                $return['expiredAt'] = $duration;
                            } else {
                                $return['status'] = false;
                                $return['jwt'] = null;
                                $return['userId'] = null;
                                $return['role'] = null;
                                $return['statusText'] = null;
                                $return['error'] = "Failed to commit";
                                $return["user"] = null;
                                $return['expiredAt'] = null;
                            }
                        } else {
                            http_response_code(500);
                            $return['status'] = false;
                            $return['jwt'] = null;
                            $return['userId'] = null;
                            $return['role'] = null;
                            $return['statusText'] = null;
                            $return['error'] = "Failed to record on database";
                            $return["user"] = null;
                            $return['expiredAt'] = null;
                        }
                    } else {
                        http_response_code(500);
                        $return['status'] = false;
                        $return['jwt'] = null;
                        $return['userId'] = null;
                        $return['role'] = null;
                        $return['statusText'] = null;
                        $return['error'] = "Failed to record on database";
                        $return["user"] = null;
                        $return['expiredAt'] = null;
                    }
                } else {
                    http_response_code(401);
                    $return['status'] = false;
                    $return['jwt'] = null;
                    $return['userId'] = null;
                    $return['role'] = null;
                    $return['statusText'] = null;
                    $return['error'] = "Invalid E-mail / Password";
                    $return["user"] = null;
                    $return['expiredAt'] = null;
                }
            } else {
                http_response_code(401);
                $return['status'] = false;
                $return['jwt'] = null;
                $return['userId'] = null;
                $return['role'] = null;
                $return['statusText'] = null;
                $return['error'] = "Invalid E-mail Id";
                $return["user"] = null;
                $return['expiredAt'] = null;            }
        } else {
            http_response_code(500);
            $return['status'] = false;
            $return['jwt'] = null;
            $return['userId'] = null;
            $return['role'] = null;
            $return['statusText'] = null;
            $return['error'] = "Login Failed";
            $return["user"] = null;
            $return['expiredAt'] = null;
        }

    } else {
        http_response_code(401);
        $return['status'] = false;
        $return['jwt'] = null;
        $return['userId'] = null;
        $return['role'] = null;
        $return['statusText'] = null;
        $return['error'] = "ReCaptcha verification failed";
        $return["user"] = null;
        $return['expiredAt'] = null;
    }
} else {
    http_response_code(400);
    $return['status'] = false;
    $return['jwt'] = null;
    $return['userId'] = null;
    $return['role'] = null;
    $return['statusText'] = null;
    $return['error'] = "Invalid Request";
    $return["user"] = null;

    $return['expiredAt'] = null;
}

echo json_encode($return);
exit;
