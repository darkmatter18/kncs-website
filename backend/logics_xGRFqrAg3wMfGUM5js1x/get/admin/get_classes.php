<?php

/**
 * GET
 * Class fetching from admin portal
 * Pranjal Gain (25/08/2020)
 */

define('_inc', true);
require INC_DIR . 'index.php';
require INC_DIR . 'protected.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

if (!empty($pdocon)) {
    if($auth_user->data->role == 'admin'){
        $user = $auth_user->data->user_id;
        $smt = $pdocon->prepare("SELECT * FROM `classes`");

        if ($smt->execute()) {
            $output = $smt->fetchAll(PDO::FETCH_ASSOC);
            $return['data'] = $output;
            $return['user'] = $user;
            $return['status'] = true;
            $return['statusText'] = "Classes fetched";
            $return['error'] = null;

        } else {
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Unable to connect database";
        }
    } else {
        http_response_code(500);
        $return['status'] = false;
        $return['statusText'] = null;
        $return['error'] = "Permission denied";
    }
} else {
    http_response_code(500);
    $return['status'] = false;
    $return['statusText'] = null;
    $return['error'] = "Unable to connect database";
}
echo json_encode($return);
exit;
