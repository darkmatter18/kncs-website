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

            $application_no = $auth_user['data']->application_no;
            $date = Filter::String($_INPUT['date']);
            $place = Filter::String($_INPUT['place']);
            $full_name = Filter::String($_INPUT['full_name']);

            $pdocon->beginTransaction();    // check wheather it is inside the table or not

            $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_declaration_info (application_no, date, place, full_name)
                                                 VALUES(:application_no, :date, :place, :full_name)');
            
            $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);

            $smt->bindParam(':date', $date, PDO::PARAM_STR);
            $smt->bindParam(':place', $place, PDO::PARAM_STR);
            $smt->bindParam(':full_name', $full_name, PDO::PARAM_STR);

            if ($smt->execute()) {
                $smt = $pdocon->prepare('SELECT T2.direct_admission
                                            FROM `student_preregistration_details` AS T1
                                            LEFT OUTER JOIN `student_preregistration_draft_present_academic` AS T2
                                            ON T1.application_no=T2.application_no
                                            WHERE T1.application_no = :application_no');
                
                $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
                
                if ($smt->execute()) {
                    $smt->setFetchMode(PDO::FETCH_ASSOC);
                    
                    $output = $smt->fetch();
                    $direct_access = $output['direct_admission'];
                
                } else {
                    http_response_code(500);
                    $return['status'] = false;
                    $return['statusText'] = null;
                    $return['error'] = "Failed to get data from Database";
                    $return['data'] = null;
                }

            } else {

            }

            if ($smt->execute()) {
                    $smt = $pdocon->prepare("UPDATE student_preregistration_details SET status='SUBMITTED' WHERE application_no=:applicaion_no");

                    $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);

                    if ($smt->execute()){
                        $pdocon->commit();  // commited
                        $return['status'] = true;
                        $return['statusText'] = "Final Submission Complete";
                        $return['error'] = null;

                    }else{
                        http_response_code(500);
                        $return['status']=false;
                        $return['statusText'] = null;
                        $return['error'] = "Final Submission not Complete";

                    }

            } else {
                http_response_code(500);
                $return['status']=false;
                $return['statusText'] = null;
                $return['error'] = "Declaration not Complete";
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

