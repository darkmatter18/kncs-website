<?php
/**
 * Routes definition
 * Created by: Arkadip Bhattachaya 12/05/2020 09:40PM
 * 
 */

if(!defined('_R')){
    http_response_code(400);
    exit;
}

define('LOGIC_DIR', BASE_DIR.'logics_xGRFqrAg3wMfGUM5js1x'.DIRECTORY_SEPARATOR);
define('INC_DIR', BASE_DIR.'_inc_73T5gENk3Oy4w3YJDZGV'.DIRECTORY_SEPARATOR);

require INC_DIR.'Router.php';

Router::add('/', 'get', function(){
    echo 'Welcome :)';
});

Router::add('/login', 'post', function(){
    require LOGIC_DIR.'login.php';
});

Router::add('/preregistration', 'post', function (){
    require LOGIC_DIR.'student_preregistration.php';
});

// Preregistration_login fetching....
Router::add('/preregistration/login','post', function(){
    require LOGIC_DIR.'student_preregistration_login.php';
});

//Example Protected route
Router::add('/admin/1','get',function(){
    require LOGIC_DIR.'admin1.php';
});

//student preregistration personal info
Router::add('/preregistration/process/presonal_info','post',function(){
    require LOGIC_DIR.'student_preregistration_personal_info.php';
});

//preregistration academic info
Router::add('/preregistration/process/academic_info','post',function(){
    require LOGIC_DIR.'student_preregistration_academic_info.php';
});

//preregistration Payment info
Router::add('/preregistration/process/payment_info','post',function(){
    require LOGIC_DIR.'student_preregistration_academic_info.php';
});

//preregistration Declaration info
Router::add('/preregistration/process/declaration','post',function(){
    require LOGIC_DIR.'student_preregistration_academic_info.php';
});




Router::run($_SERVER['HTTP_SERVER_ROOT_DIR']);

