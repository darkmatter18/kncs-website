<?php

    define('_inc', true);
    require INC_DIR . 'index.php';
    require INC_DIR . 'protected.php';

    $_INPUT = json_decode(file_get_contents('php://input'), true);

    $return = [];
    header('Content-Type: application/json');
        
        $smt = $pdocon->prepare("UPDATE `student_preregistration_details` SET status = 'SELECTED' WHERE application_no = :application_no");

        if ($smt->execute()) 
        {
            $output = $smt->fetchAll(PDO::FETCH_ASSOC);
            $return['data'] = $output;
            $return['status'] = true;
            $return['statusText'] = "Update Done (SELECTED)";
            $return['error'] = null;

        } 
        else 
        {
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Unable to connect database";
        }

    echo json_encode($return);
    exit;