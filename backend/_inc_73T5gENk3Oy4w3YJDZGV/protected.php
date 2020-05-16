<?php
require BASE_DIR.'vendor'.DIRECTORY_SEPARATOR.'autoload.php';
use \Firebase\JWT\JWT;
function getAuthorizationHeader(){
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    }
    else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        //print_r($requestHeaders);
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}

function getBearerToken($headers) {
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}


$authHeader = getAuthorizationHeader();
if (isset($authHeader)) {

    $jwt = getBearerToken($authHeader);
    if($jwt){
        try {
            $auth_user = JWT::decode($jwt, $_SERVER['HTTP_JWT_SERECT'], ['HS256']);
        } catch (Exception $e) {
            http_response_code(401);
            echo $e->$e->getMessage();
            echo "Access Denided";
            exit;
        }
    }
    else {
        // JWT token missing
        http_response_code(400);
        echo "JWT is missing";
        exit;
    }
}
else {
    // HTTP Auth missing
    http_response_code(400);
    echo "Authentication Failed";
    exit;
}