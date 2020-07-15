<?php

/**
 * GET
 * student_preregistration BASIC INFO processing logics
 * Manojit Karmakar (15/07/2020)
 */

define('_inc', true);
require INC_DIR.'index.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

//$smt = $pdocon->prepare
