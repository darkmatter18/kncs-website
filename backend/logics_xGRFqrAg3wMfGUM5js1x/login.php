<?php
/**
 * Login Pipe Line
 * Created by: Arkadip Bhattachaya 15/05/2020 12.17PM
 */

function chechRecapta($re_response){
    if(isset($re_response) && !empty($re_response)){
        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$_SERVER['HTTP_RECAPTA_SERECT'].'&response='.$re_response.'&remoteip');
        $respone =  json_decode($verifyResponse); //Decode the json return obj
        if($respone->success){
            return true;
        }
    }
    return true;
}

function login($pdocon, $id, $password){
    //Check if admin already exist or not
    $smt = $pdocon->prepare("SELECT id, password FROM `users_login` WHERE id =:id LIMIT 1");
    $smt->bindParam(':id', $id, PDO::PARAM_STR);
    $smt->execute();
    if($smt->rowCount() > 0){
        //Admin exists
        $_d  = $smt->fetch(PDO::FETCH_ASSOC);
        $hashed = $_d['password'];

        if(password_verify($password,$hashed)){
            //loggedin
            $smt = $pdocon->prepare("UPDATE `users_login` SET `last-login-ip`= :ip WHERE id = :id");
            $time = time();
            $ip = get_client_ip();
            $smt->bindParam(':ip', $ip, PDO::PARAM_STR);
            $smt->bindParam(':id', $id, PDO::PARAM_STR);
            if($smt->execute()){
                return true;
            }
        }
    }
    return false;
}

function get_user_role($pdocon, $id){
    $smt = $pdocon->prepare("SELECT role FROM `users_role` WHERE id= :id");
    $smt->bindParam(':id', $id, PDO::PARAM_STR);
    $smt->execute();
    if($smt->rowCount() > 0){
        $_d  = $smt->fetch(PDO::FETCH_ASSOC);
        return $_d['role'];
    }
    return;
}



define('_inc', true);
require dirname(dirname(__FILE__)).'/_inc_73T5gENk3Oy4w3YJDZGV/index.php';
require dirname(dirname(__FILE__))."/vendor/autoload.php";
use \Firebase\JWT\JWT;


//return array
$return = [];

if (isset($_POST['id']) && isset($_POST['password']) && isset($_POST['g_recaptcha_response'])) {

    //Set the return content type
    header('Content-Type: application/json');

    if(chechRecapta($_POST['g_recaptcha_response'])){
        //Escaping variables
        $id_clean = Filter::String($_POST['id']);
        $password_clean = Filter::String($_POST['password']);

        if(login($pdocon, $id_clean, $password_clean)){
            
            $role = get_user_role($pdocon, $id_clean);

            if(!empty($role)){
                //JWT config
                $issusedAt = time();
                $expiredAt = time() + 2 * 60* 60; //Exprired after 2 hours

                // JWT token
                $token = array (
                    "iat" => $issusedAt,
                    "eat" => $expiredAt,
                    "uae" =>$_SERVER['HTTP_USER_AGENT'],
                    "data" => array (
                        "id" => $id_clean,
                        "role" => $role
                    )
                );

                $jwt = JWT::encode($token, $_SERVER['HTTP_JWT_SERECT']);
                
                $return['user'] = array(
                    "id" => $id_clean,
                    "role" => $role,
                    "loginAt" => $issusedAt,
                    "jwt" => $jwt,
                    "expiresAt" => $expiredAt
                );
                $return['status'] = "Login Successfully";
                http_response_code(200);
            }
        }
        else {
            http_response_code(401);
            $return['status'] = "Invalid Username/Password";
        }
    }
    else{
        http_response_code(401);
        $return['status'] = "Re-captcha Verification failed";
    }
}
else {
    http_response_code(400);
    $return['status'] = "Invalid Request Params";
}

echo json_encode($return, JSON_PRETTY_PRINT);
exit;