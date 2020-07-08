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

Router::run($_SERVER['HTTP_SERVER_ROOT_DIR']);

