<?php

/**
 * student_preregistration ACADEMIC INFO processing logics
 * Manojit Karmakar (14/07/2020)
 */

define('_inc', true);
require INC_DIR.'index.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

//input submission checking logic
//isset($_INPUT['']) &&   
       //TOTAL 20 INPUT 
if(isset($_INPUT['application_no']) && isset($_INPUT['stream']) && isset($_INPUT['first_language'])
&& isset($_INPUT['second_language']) && isset($_INPUT['first_major']) && isset($_INPUT['second_major']) && isset($_INPUT['third_major'])
&& isset($_INPUT['forth_major']) && isset($_INPUT['recaptcha_token'])  ){

    if(checkRecaptcha($_INPUT['recaptcha_token'])){
        $application_no_clean = Filter::Int($_INPUT['application_no']);
        $stream_clean = Filter::String($_INPUT['stream']);
        $first_language_clean = Filter::String($_INPUT['first_language']);
        $second_language_clean = Filter::String($_INPUT['second_language']);
        $first_major_clean = Filter::String($_INPUT['first_major']);
        $second_major_clean = Filter::String($_INPUT['second_major']);
        $third_major_clean = Filter::String($_INPUT['third_major']);
        $forth_major_clean = Filter::String($_INPUT['forth_major']);


        $smt = $pdocon->prepare('INSERT INTO student_preregistration_academic_info
                                (application_no, stream, first_language, second_language, first_major, second_major, third_major, forth_major)
                                VALUES(:application_no, :stream, :first_language, :second_language, :first_major, :second_major, :third_major, :forth_major)');

        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt->bindParam(':stream', $stream , PDO::PARAM_STR);
        $smt->bindParam(':first_language', $first_language , PDO::PARAM_STR);
        $smt->bindParam(':second_language', $second_language , PDO::PARAM_STR);
        $smt->bindParam(':first_major', $first_major , PDO::PARAM_STR);
        $smt->bindParam(':second_major', $second_major , PDO::PARAM_STR);
        $smt->bindParam(':third_major', $third_major , PDO::PARAM_STR);
        $smt->bindParam(':forth_major', $forth_major , PDO::PARAM_STR);

    }else {
        # code...
    }
}else{

}