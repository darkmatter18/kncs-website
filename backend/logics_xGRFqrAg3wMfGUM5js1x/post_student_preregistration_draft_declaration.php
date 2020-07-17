<?php

/**
 * POST
 * Student preregistration DECLARATION INFO inserting precess
 * 
 * database: kncs
 *          table : student_preregistration_draft_declaration_info
 * 
 * Manojit Karmakar (17/07/2020) 
 */


define('_inc', true);
require INC_DIR . 'index.php';
require INC_DIR . 'protected.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];

header('Content-Type: application/json');

if( isset($_INPUT['application_no']) && isset($_INPUT['date']) && isset($_INPUT['place']) && isset($_INPUT['full_name'])
    && isset($_INPUT['recaptcha_token']) ){

        if (checkRecaptcha($_INPUT['recaptcha_token'])) {

            $application_no = $auth_user["data"]["application_no"];
            $date = Filter::String($_INPUT['date']);
            $place = Filter::String($_INPUT['place']);
            $full_name = Filter::String($_INPUT['full_name']);

            $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_declaration_info (application_no, date, place, full_name)
                                                 VALUES(:application_no, :date, :place, :full_name)');
            
            $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);

            $smt->bindParam(':date', $date, PDO::PARAM_STR);
            $smt->bindParam(':place', $place, PDO::PARAM_STR);
            $smt->bindParam(':full_name', $full_name, PDO::PARAM_STR);

            if ($smt->execute()) {
                $return['status'] = true;
                $return['statusText'] = "Declaration Complete";
                $return['error'] = null;

            } else {
                http_response_code(500);
                $return['status'] = false;
                $return['statusText'] = null;
                $return['error'] = "Failed to record on Database - student_preregistration_draft_declaration_info";
                
            }

        } else {
            http_response_code(401);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Recaptcha Verification Failed";

        }

} else {
    http_response_code(400);
    $return['status'] = false;
    $return['statusText'] = null;
    $return['error'] = "Invalid Parameter";
}

echo json_encode($return);
exit;

