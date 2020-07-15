<?php

/**
 * student_preregistration PERSONAL INFO processing logics
 * Manojit Karmakar (14/07/2020)
 */

define('_inc', true);
require INC_DIR.'index.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

//input submission checking logic
//isset($_INPUT['']) &&

if( isset($_INPUT['gender']) && isset($_INPUT['religion']) && isset($_INPUT['caste']) && isset($_INPUT['mother_tongue'])
&& isset($_INPUT['apply_for_reserved_seat']) && isset($_INPUT['caste_certificate_no']) && isset($_INPUT['weather_bpl'])
&& isset($_INPUT['bpl_card_no']) && isset($_INPUT['whatsapp_no']) && isset($_INPUT['recaptcha_token']) ){

    if(checkRecaptcha($_INPUT['recaptcha_token'])){
        //BASIC INFO--- POST
        $gender_clean = Filter::String($_INPUT['gender']);
        $religion_clean = Filter::String($_INPUT['religion']);
        $caste_clean = Filter::String($_INPUT['caste']);
        $caste_certificate_no_clean = Filter::Int($_INPUT['caste_certificate_no']);
        $mother_tongue_clean = Filter::String($_INPUT['mother_tongue']);
        $apply_for_reserved_seat_clean = Filter::String($_INPUT['apply_for_reserved_seat']);
        $weather_bpl_clean = Filter::String($_INPUT['weather_bpl']);
        $bpl_card_no_clean = Filter::Int($_INPUT['bpl_card_no']);
        $whatsapp_no_clean = Filter::Int($_INPUT['whatsapp_no']);



        // $_clean = Filter::String($_INPUT['']);

        $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_basic_info(application_no, gender, religion, caste, mother_tongue,
        apply_for_reserved_seat, caste_certificate_no,  weather_bpl, bpl_card_no, whatsapp_no) VALUES(:application_no, :gender, :religion, :caste, :mother_tongue,
        :apply_for_reserved_seat, :caste_certificate_no,  :weather_bpl, :bpl_card_no, :whatsapp_no )');
        
        //$smt->bindParam(':application_no', $application_no, PDO::PARAM_STR);
        $smt->bindParam(':gender', $gender, PDO::PARAM_STR);
        $smt->bindParam(':religion', $religion, PDO::PARAM_STR);
        $smt->bindParam(':caste', $caste, PDO::PARAM_STR);
        $smt->bindParam(':mother_tongue', $mother_tongue, PDO::PARAM_STR);
        $smt->bindParam(':apply_for_reserved_seat', $apply_for_reserved_seat, PDO::PARAM_STR);
        $smt->bindParam(':caste_certificate_no', $caste_certificate_no, PDO::PARAM_INT);
        $smt->bindParam(':weather_bpl', $weather_bpl, PDO::PARAM_STR);
        $smt->bindParam(':bpl_card_no', $bpl_card_no, PDO::PARAM_INT);
        $smt->bindParam(':whatsapp_no', $whatsapp_no, PDO::PARAM_INT);
        
        //$smt->bindParam(':', $, PDO::PARAM_STR);


    }else{
        http_response_code(401);


    }
}else{
    http_response_code(400);    
}
