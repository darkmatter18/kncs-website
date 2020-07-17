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
    echo 'Welcome :-)';
});

Router::add('/api/preregistration', 'post', function (){
    require LOGIC_DIR.'student_preregistration.php';
});


Router::add('/api/login', 'post', function(){
    require LOGIC_DIR.'login.php';
});

// Preregistration_login fetching....
Router::add('/api/preregistration/login','post', function(){
    require LOGIC_DIR.'student_preregistration_login.php';
});

//Example Protected route
Router::add('/api/admin/1','get',function(){
    require LOGIC_DIR.'admin1.php';
});


//Personal info 
//POST------
Router::add('/preregistration/process/presonal_info','post',function(){
    require LOGIC_DIR.'post_student_preregistration_personal_info.php';
});

// GET-----
Router::add('/preregistration/process/presonal_info','get',function(){
    require LOGIC_DIR.'get_student_preregistration_personal_info.php';
});


//academic info
// POST---
Router::add('/preregistration/process/academic_info','post',function(){
    require LOGIC_DIR.'post_student_preregistration_draft_academic_info_all.php';
});

// GET ---
Router::add('/preregistration/process/academic_info','get',function(){
    require LOGIC_DIR.'get_student_preregistration_draft_academic_info.php';
});


//PAYMENT INFO
//post....
Router::add('/preregistration/process/payment_info','post',function(){
    require LOGIC_DIR.'post_student_preregistration_draft_payment_info.php';
});
//get...
Router::add('/preregistration/process/payment_info','get',function(){
    require LOGIC_DIR.'get_student_preregistration_draft_payment_info.php';
});


//Declaration info
//post.....
Router::add('/preregistration/process/declaration','post',function(){
    require LOGIC_DIR.'post_student_preregistration_draft_declaration.php';
});

Router::run($_SERVER['HTTP_SERVER_ROOT_DIR']);

