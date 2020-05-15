<?php

if(defined('_inc')){
    define('_incUse', true);
    require_once dirname(__FILE__).'/PDODB.php';
    require_once dirname(__FILE__).'/Filter.php';
    require_once dirname(__FILE__).'/Router.php';

    $pdocon = PDODB::getConnection();
}