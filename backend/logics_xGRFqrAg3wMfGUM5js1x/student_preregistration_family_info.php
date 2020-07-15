<?php

/**
 * FAMILY INFO
 * Manojit Karmakar (15/07/2020)
 */

define('_inc', true);
require INC_DIR.'index.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

//input submission checking logic
//isset($_INPUT['']) &&
//8 INPUT

if(isset($_INPUT['father_name']) && isset($_INPUT['father_occupation']) && isset($_INPUT['mother_name'])
&& isset($_INPUT['mother_occupation']) && isset($_INPUT['guardian_name']) && isset($_INPUT['guardian_occupation'])
&& isset($_INPUT['guardian_same_father']) && isset($_INPUT['recaptcha_token']) ){

    if(checkRecaptcha($_INPUT['recaptcha_token'])){
        // POST---------
        $father_name_clean = Filter::String($_INPUT['father_name']);
        $father_occupation_clean = Filter::String($_INPUT['father_occupation']);
        $mother_name_clean = Filter::String($_INPUT['mother_name']);
        $mother_occupation_clean = Filter::String($_INPUT['mother_occupation']);
        $guardian_name_clean = Filter::String($_INPUT['guardian_name']);
        $guardian_occupation_clean = Filter::String($_INPUT['guardian_occupation']);
        $guardian_same_father_clean = Filter::String($_INPUT['guardian_same_father']);
        $recaptcha_token_clean = Filter::String($_INPUT['recaptcha_token']);

        $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_family_info(application_no, father_name, father_occupation, mother_name, mother_occupation, guardian_name, guardian_occupation, guardian_same_father
        ) VALUES(:application_no, :father_name, :father_occupation, :mother_name, :mother_occupation, :guardian_name, :guardian_occupation, :guardian_same_father)');

        //$smt->bindParam(':application_no,', $application_no,, PDO::PARAM_INT);
        $smt->bindParam(':father_name', $father_name, PDO::PARAM_STR);
        $smt->bindParam(':father_occupation', $father_occupation, PDO::PARAM_STR);
        $smt->bindParam(':mother_name', $mother_name, PDO::PARAM_STR);
        $smt->bindParam(':mother_occupation', $mother_occupation, PDO::PARAM_STR);
        $smt->bindParam(':guardian_name', $guardian_name, PDO::PARAM_STR);
        $smt->bindParam(':guardian_occupation', $guardian_occupation, PDO::PARAM_STR);
        $smt->bindParam(':guardian_same_father', $guardian_same_father, PDO::PARAM_STR);
        
        //$smt->bindParam(':', $, PDO::PARAM_STR);


    }else{
        http_response_code(401);


    }
}else{
    http_response_code(400);    
}
