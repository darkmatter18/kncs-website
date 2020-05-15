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

require './_inc_73T5gENk3Oy4w3YJDZGV/Router.php';

define('LOGIC_DIR', './logics_xGRFqrAg3wMfGUM5js1x/');

Router::add('/',function(){
    echo 'Welcome :-)';
});

Router::add('/api/login',function(){
    require LOGIC_DIR.'login.php';
},'post');

//Example Protected route
Router::add('/api/admin/1',function(){
    require LOGIC_DIR.'admin1.php';
},'get');

Router::run($_SERVER['HTTP_SERVER_ROOT_DIR']);