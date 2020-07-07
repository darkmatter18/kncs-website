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
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
}

/**
 * Check the Recaptcha Toknn
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