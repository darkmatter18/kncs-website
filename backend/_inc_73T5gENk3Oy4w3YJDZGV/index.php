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
require_once dirname(__FILE__).'/PDODB.php';
require_once dirname(__FILE__).'/Filter.php';
require_once dirname(__FILE__).'/Router.php';

$pdocon = PDODB::getConnection();
