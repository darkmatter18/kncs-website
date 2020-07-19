<?php
/**
 * Routes definition
 * Created by: Arkadip Bhattachaya 12/05/2020 09:40PM
 *
 */

if (!defined('_R')) {
    http_response_code(400);
    exit;
}

define('LOGIC_DIR', BASE_DIR . 'logics_xGRFqrAg3wMfGUM5js1x' . DIRECTORY_SEPARATOR);
define('INC_DIR', BASE_DIR . '_inc_73T5gENk3Oy4w3YJDZGV' . DIRECTORY_SEPARATOR);

define('GET_LOGIC_DIR', LOGIC_DIR . 'get' . DIRECTORY_SEPARATOR);
define('POST_LOGIC_DIR', LOGIC_DIR . 'post' . DIRECTORY_SEPARATOR);

define('POST_STUDENT_REGISTRATION_DIR', POST_LOGIC_DIR . 'student_registration' . DIRECTORY_SEPARATOR);

define('GET_STUDENT_REGISTRATION_DIR', GET_LOGIC_DIR . 'student_registration' . DIRECTORY_SEPARATOR);

require INC_DIR . 'Router.php';

Router::add('/', 'get', function () {
    echo 'Welcome :)';
});

Router::add('/login', 'post', function () {
    require POST_LOGIC_DIR . 'login.php';
});

Router::add('/preregistration', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'student_preregistration.php';
});

// Preregistration_login fetching....
Router::add('/preregistration/login', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'student_preregistration_login.php';
});


//Personal info
//POST------
Router::add('/preregistration/process/personal_info', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'personal_info.php';
});
// GET-----
Router::add('/preregistration/process/personal_info', 'get', function () {
    require GET_STUDENT_REGISTRATION_DIR . 'personal_info.php';
});


//academic info
// POST---
Router::add('/preregistration/process/academic_info', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'academic_info.php';
});
// GET ---
Router::add('/preregistration/process/academic_info', 'get', function () {
    require GET_STUDENT_REGISTRATION_DIR . 'academic_info.php';
});


//PAYMENT INFO
//post....
Router::add('/preregistration/process/payment_info', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'payment_info.php';
});
//get...
Router::add('/preregistration/process/payment_info', 'get', function () {
    require GET_STUDENT_REGISTRATION_DIR . 'payment_info.php';
});


//Declaration info

//get
Router::add('/preregistration/process/declaration', 'get', function () {
    require GET_STUDENT_REGISTRATION_DIR . 'declaration.php';
});
//post.....
Router::add('/preregistration/process/declaration', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'declaration.php';
});

Router::run($_SERVER['HTTP_SERVER_ROOT_DIR']);

