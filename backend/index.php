<?php

define('_R', true);
define('BASE_DIR', dirname(__FILE__).DIRECTORY_SEPARATOR);
date_default_timezone_set('Asia/Kolkata');
echo parse_url($_SERVER['REQUEST_URI'])['path'];
require './routes.php';