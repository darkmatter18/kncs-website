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
        $transaction_date_clean = Filter::String($_INPUT['mode_of_payment']);

        $pdocon->beginTransaction();    // check wheather it is inside the table or not

        $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_payment_info
                                                (application_no, mode_of_payment, name_of_bank, transaction_id, transaction_date)
                                        VALUES(:application_no, :mode_of_payment, :name_of_bank, :transaction_id, :transaction_date)');

        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt->bindParam(':mode_of_payment', $mode_of_payment, PDO::PARAM_STR);
        $smt->bindParam(':name_of_bank', $name_of_bank, PDO::PARAM_STR);
        $smt->bindParam(':transaction_id', $transaction_id, PDO::PARAM_STR);
        $smt->bindParam(':transaction_date', $transaction_date, PDO::PARAM_STR);

        if ($smt->execute()) {
            $pdocon->commit();  // commited
            $return['status'] = true;
            $return['statusText'] = "Payment Successful";
            $return['error'] = null;

        } else {
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Failed to record on Database - student_preregistration_draft_payment_info";

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

