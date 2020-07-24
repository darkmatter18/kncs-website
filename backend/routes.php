<?php
/**
 * Routes definition
 * Created by: Arkadip Bhattacharya 12/05/2020 09:40PM
 *
 */

if (!defined('_R')) {
    http_response_code(400);
    exit;
}

define('LOGIC_DIR', BASE_DIR . 'logics_xGRFqrAg3wMfGUM5js1x' . DIRECTORY_SEPARATOR);
define('INC_DIR', BASE_DIR . '_inc_73T5gENk3Oy4w3YJDZGV' . DIRECTORY_SEPARATOR);


require INC_DIR . 'Router.php';

Router::add('/', 'get', function () {
    echo 'Welcome :)';
});



/**
 * POST Requests
 */
define('POST_LOGIC_DIR', LOGIC_DIR . 'post' . DIRECTORY_SEPARATOR);

//Student Pre Registration
define('POST_STUDENT_REGISTRATION_DIR', POST_LOGIC_DIR . 'student_registration' . DIRECTORY_SEPARATOR);

// New Registration
Router::add('/preregistration', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'student_preregistration.php';
});

// Existing Registration
Router::add('/preregistration/login', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'student_preregistration_login.php';
});

//Personal info
Router::add('/preregistration/process/personal_info', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'personal_info.php';
});

//academic info
Router::add('/preregistration/process/academic_info', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'academic_info.php';
});

//PAYMENT INFO
Router::add('/preregistration/process/payment_info', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'payment_info.php';
});

//Declaration info
Router::add('/preregistration/process/declaration', 'post', function () {
    require POST_STUDENT_REGISTRATION_DIR . 'declaration.php';
});

//Log in process
Router::add('/login', 'post', function () {
    require POST_LOGIC_DIR . 'user_login_process.php';
});

/**
 * Get Requests
 */
define('GET_LOGIC_DIR', LOGIC_DIR . 'get' . DIRECTORY_SEPARATOR);

//Student Pre Registration
define('GET_STUDENT_REGISTRATION_DIR', GET_LOGIC_DIR . 'student_registration' . DIRECTORY_SEPARATOR);

//Personal info
Router::add('/preregistration/process/personal_info', 'get', function () {
    require GET_STUDENT_REGISTRATION_DIR . 'personal_info.php';
});

//academic info
Router::add('/preregistration/process/academic_info', 'get', function () {
    require GET_STUDENT_REGISTRATION_DIR . 'academic_info.php';
});

//PAYMENT INFO
Router::add('/preregistration/process/payment_info', 'get', function () {
    require GET_STUDENT_REGISTRATION_DIR . 'payment_info.php';
});

//Declaration info
Router::add('/preregistration/process/declaration', 'get', function () {
    require GET_STUDENT_REGISTRATION_DIR . 'declaration.php';
});

/**
 * Run the Router
 */
Router::run($_SERVER['HTTP_SERVER_ROOT_DIR']);

