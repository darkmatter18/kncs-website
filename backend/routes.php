<?php
/**
 * Routes definition
 * Created by: Arkadip Bhattachaya 12/05/2020 09:40PM
 * 
 */

require './_inc_73T5gENk3Oy4w3YJDZGV/Router.php';

define('LOGIC_DIR', './logics_xGRFqrAg3wMfGUM5js1x/');

Router::add('/',function(){
    echo 'Welcome :-)';
});

Router::add('/api/login/',function(){
    //echo 'Welcome :-)';
    require LOGIC_DIR.'login.php';
});

Router::add('/api/logout',function(){
    echo '<form method="post"><input type="text" name="test" /><input type="submit" value="send" /></form>';
},'get');

Router::run('/kncs-website/backend');