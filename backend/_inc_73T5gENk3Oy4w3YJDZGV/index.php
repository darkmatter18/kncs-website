<?php
/**
 * PDP INC files initiator
 * Created by: Arkadip Bhattachaya 15/05/2020 12.02PM
 */

if(!defined('_inc')){
    http_response_code(400);
    exit;
}

define('_incUse', true);
require_once INC_DIR.'PDODB.php';
require_once INC_DIR.'Filter.php';
require_once INC_DIR.'Router.php';

$pdocon = PDODB::getConnection();


function get_client_ip() {
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ip_address = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ip_address = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ip_address = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ip_address = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ip_address = $_SERVER['REMOTE_ADDR'];
    else
        $ip_address = 'UNKNOWN';
    return $ip_address;
}

/**
 * Check the Recaptcha Token
 * @param $re_response
 * @return bool
 */
function checkRecaptca($re_response){
    if(isset($re_response) && !empty($re_response)){
        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$_SERVER['HTTP_RECAPTA_SERECT'].'&response='.$re_response.'&remoteip');
        $response =  json_decode($verifyResponse); //Decode the json return obj
        if($response->success){
            return true;
        }
    }
    return true;
}