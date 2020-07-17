<?php

/**
 * GET
 * student_preregistration BASIC INFO processing logics
 * Manojit Karmakar (17/07/2020)
 */

define('_inc', true);
require INC_DIR . 'index.php';
require INC_DIR . 'protected.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

$application_no = $auth_user['data']->application_no;

$smt = $pdocon->prepare("SELECT T2.mode_of_payment, T2.name_of_bank, T2.transaction_id, T2.transaction_date,

                        FROM `student_preregistration_details` AS T1
                        INNER JOIN `student_preregistration_draft_payment_info` AS T2
                        ON T1.application_no=T2.application_no

                        WHERE T1.application_no = :application_no");


        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);

if ($smt->execute()) {
    $smt->setFetchMode(PDO::FETCH_ASSOC);
    $output = $smt->fetch();
    $return['data'] = $output;
    $return['status'] = true;
    $return['statusText'] = "Fetch Done";
    $return['error'] = null;

} else {
    http_response_code(500);
    $return['status'] = false;
    $return['statusText'] = null;
    $return['error'] = "Failed to get data from Database";
    $return['data'] = null;
}

echo json_encode($return);
exit;

