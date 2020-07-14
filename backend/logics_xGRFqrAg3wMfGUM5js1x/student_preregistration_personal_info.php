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
&& isset($_INPUT['bpl_card_no']) && isset($_INPUT['whatsapp_no']) && isset($_INPUT['father_name']) && isset($_INPUT['father_occupation'])
&& isset($_INPUT['mother_name']) && isset($_INPUT['mother_occupation']) && isset($_INPUT['guardian_name']) && isset($_INPUT['guardian_occupation'])
&& isset($_INPUT['guardian_same_father']) && isset($_INPUT['recaptcha_token']) ){

    if(checkRecaptcha($_INPUT['recaptcha_token'])){
        $gender_clean = Filter::String($_INPUT['gender']);
        $religion_clean = Filter::String($_INPUT['religion']);
        $caste_clean = Filter::String($_INPUT['caste']);
        $mother_tongue_clean = Filter::String($_INPUT['mother_tongue']);
        $apply_for_reserved_seat_clean = Filter::String($_INPUT['apply_for_reserved_seat']);
        $caste_certificate_no_clean = Filter::String($_INPUT['caste_certificate_no']);
        $weather_bpl_clean = Filter::String($_INPUT['weather_bpl']);
        $bpl_card_no_clean = Filter::String($_INPUT['bpl_card_no']);
        $whatsapp_no_clean = Filter::String($_INPUT['whatsapp_no']);
        $father_name_clean = Filter::String($_INPUT['father_name']);
        $father_occupation_clean = Filter::String($_INPUT['father_occupation']);
        $mother_name_clean = Filter::String($_INPUT['mother_name']);
        $mother_occupation_clean = Filter::String($_INPUT['mother_occupation']);
        $guardian_name_clean = Filter::String($_INPUT['guardian_name']);
        $guardian_occupation_clean = Filter::String($_INPUT['guardian_occupation']);
        $guardian_same_father_clean = Filter::String($_INPUT['guardian_same_father']);
        $recaptcha_token_clean = Filter::String($_INPUT['recaptcha_token']);

        // $_clean = Filter::String($_INPUT['']);

        $smt = $pdocon->prepare('INSERT INTO xxx () VALUES(:, )');
        
        $smt->bindParam(':application_no', $application_no, PDO::PARAM_STR);

    }else{


    }
}else{
    
}
