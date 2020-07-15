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

//student preregistration personal info 
///api/admission/preregistration/process/presonal_info[POST]
//POST------
Router::add('api/admission/preregistration/process/presonal_info','post',function(){
    require LOGIC_DIR.'post_student_preregistration_personal_info.php';
});

// GET-----
Router::add('admission/preregistration/process/presonal_info','get',function(){
    require LOGIC_DIR.'get_';
});


//academic info
// POST---
Router::add('preregistration/process/academic_info','post',function(){
    require LOGIC_DIR.'post_student_preregistration_draft_present_academic.php';
});
Router::add('preregistration/process/academic_info','post',function(){
    require LOGIC_DIR.'post_student_preregistration_draft_previous_academic_info.php';
});
Router::add('preregistration/process/academic_info','post',function(){
    require LOGIC_DIR.'post_student_preregistration_draft_previous_academic_marks.php';
});

// GET ---
Router::add('preregistration/process/academic_info','post',function(){
    require LOGIC_DIR.'get_student_preregistration_draft_present_academic.php';
});
Router::add('preregistration/process/academic_info','post',function(){
    require LOGIC_DIR.'get_post_student_preregistration_draft_previous_academic_info.php';
});
Router::add('preregistration/process/academic_info','post',function(){
    require LOGIC_DIR.'get_post_student_preregistration_draft_previous_academic_marks.php';
});



//Declaration info
Router::add('/api/preregistration/process/declaration','post',function(){
    require LOGIC_DIR.'xxx.php';
});




Router::run($_SERVER['HTTP_SERVER_ROOT_DIR']);

