<?php
require dirname(dirname(__FILE__))."/vendor/autoload.php";
use \Firebase\JWT\JWT;

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    $arr = explode(" ", $authHeader);
    $jwt = $arr[1];
    if($jwt){
        try {
            $auth_user = JWT::decode($jwt, $_SERVER['HTTP_JWT_SERECT']);
        } catch (Exception $e) {
            http_response_code(401);
            echo "Access Denided";
            exit;
        }
    }
    else {
        // JWT token missing
        http_response_code(400);
        echo "Authentication Failed";
        exit;
    }
}
else {
    // HTTP Auth missing
    http_response_code(400);
    echo "Authentication Failed";
    exit;
}