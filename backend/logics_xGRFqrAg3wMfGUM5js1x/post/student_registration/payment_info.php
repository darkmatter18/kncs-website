<?php

/**
 * POST
 * Student preregistration PAYMENT INFO inserting precess
 *
 * database: kncs
 *          table : student_preregistration_draft_payment_info
 *
 * Manojit Karmakar (17/07/2020)
 */


define('_inc', true);
require INC_DIR . 'index.php';
require INC_DIR . 'protected.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];

header('Content-Type: application/json');


if (isset($_INPUT['mode_of_payment']) && isset($_INPUT['name_of_bank']) && isset($_INPUT['transaction_id'])
    && isset($_INPUT['transaction_date']) && isset($_INPUT['recaptcha_token'])) {

    if (checkRecaptcha($_INPUT['recaptcha_token'])) {

        $application_no = $auth_user['data']->application_no;

        $mode_of_payment_clean = Filter::String($_INPUT['mode_of_payment']);
        $name_of_bank_clean = Filter::String($_INPUT['name_of_bank']);
        $transaction_id_clean = Filter::String($_INPUT['transaction_id']);
        $transaction_date_clean = Filter::String($_INPUT['transaction_date']);

        $smt = $pdocon->prepare("SELECT application_no FROM student_preregistration_draft_payment_info 
                                            WHERE application_no= :application_no");
        $smt->bindParam(":application_no", $application_no, PDO::PARAM_INT);
        if($smt->execute()){

            $pdocon->beginTransaction();
            $statement = null;

            if($smt->rowCount() > 0){
                //UPDATE
                $statement = $pdocon->prepare('UPDATE student_preregistration_draft_payment_info
                                                        SET mode_of_payment = :mode_of_payment, name_of_bank = :name_of_bank,
                                                            transaction_id = :transaction_id, transaction_date = :transaction_date
                                                        WHERE application_no = :application_no');

            } else {
                //INSERT
                $statement = $pdocon->prepare('INSERT INTO student_preregistration_draft_payment_info
                                                (application_no, mode_of_payment, name_of_bank, transaction_id, transaction_date)
                                        VALUES(:application_no, :mode_of_payment, :name_of_bank, :transaction_id, :transaction_date)');
            }
            // UPDATE or QUERY block end

            $statement->bindParam(':application_no', $application_no, PDO::PARAM_INT);
            $statement->bindParam(':mode_of_payment', $mode_of_payment_clean, PDO::PARAM_STR);
            $statement->bindParam(':name_of_bank', $name_of_bank_clean, PDO::PARAM_STR);
            $statement->bindParam(':transaction_id', $transaction_id_clean, PDO::PARAM_STR);
            $statement->bindParam(':transaction_date', $transaction_date_clean, PDO::PARAM_STR);

            if ($statement->execute()) {
                $pdocon->commit();
                $return['status'] = true;
                $return['statusText'] = "Payment Successful";
                $return['error'] = null;

            } else {
                http_response_code(500);
                $return['status'] = false;
                $return['statusText'] = null;
                $return['error'] = "Failed to record on Database - student_preregistration_draft_payment_info";

            }
        } else{
            //Error
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Failed to SEARCH RECORD";
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

