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
if(isset($_INPUT['application_no']) && isset($_INPUT['marks_beng']) && isset($_INPUT['marks_engb']) && isset($_INPUT['marks_maths'])
&& isset($_INPUT['marks_psc']) && isset($_INPUT['marks_lsc']) && isset($_INPUT['marks_geo']) && isset($_INPUT['marks_hist'])
&& isset($_INPUT['marks_total']) && isset($_INPUT['marks_percentage']) && isset($_INPUT['recaptcha_token'])  ){

    if(checkRecaptcha($_INPUT['recaptcha_token'])){
        $application_no_clean = Filter::Int($_INPUT['application_no']);
        $marks_beng_clean = Filter::Int($_INPUT['marks_beng']);
        $marks_engb_clean = Filter::Int($_INPUT['marks_engb']);
        $marks_maths_clean = Filter::Int($_INPUT['marks_maths']);
        $marks_psc_clean = Filter::Int($_INPUT['marks_psc']);
        $marks_lsc_clean = Filter::Int($_INPUT['marks_lsc']);
        $marks_geo_clean = Filter::Int($_INPUT['marks_geo']);
        $marks_hist_clean = Filter::Int($_INPUT['marks_hist']);
        $marks_total_clean = Filter::Int($_INPUT['marks_total']);
        $marks_percentage_clean = Filter::Int($_INPUT['marks_percentage']);

        $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_previous_academic_marks
                                (application_no, marks_beng, marks_engb, marks_maths, marks_psc, marks_lsc, marks_geo, marks_hist, marks_total, marks_percentage, stream, first_language, second_language, first_major, second_major, third_major, forth_major)
        VALUES(:application_no, :previous_school_name, :year_of_madhyamik, :previous_student_id, :marks_beng, :marks_engb, :marks_maths, :marks_psc, :marks_lsc, :marks_geo, :marks_hist, :marks_total, :marks_percentage, :stream, :first_language, :second_language, :first_major, :second_major, :third_major, :forth_major)');


        //$smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        
        $smt->bindParam(':previous_school_name', $previous_school_name , PDO::PARAM_STR);
        $smt->bindParam(':year_of_madhyamik', $year_of_madhyamik , PDO::PARAM_STR);

        $smt->bindParam(':previous_student_id', $previous_student_id , PDO::PARAM_STR); // str or int ??????

        $smt->bindParam(':marks_beng', $marks_beng , PDO::PARAM_INT);
        $smt->bindParam(':marks_engb', $marks_engb , PDO::PARAM_INT);
        $smt->bindParam(':marks_maths', $marks_maths , PDO::PARAM_INT);
        $smt->bindParam(':marks_psc', $marks_psc , PDO::PARAM_INT);
        $smt->bindParam(':marks_lsc', $marks_lsc , PDO::PARAM_INT);
        $smt->bindParam(':marks_geo', $marks_geo , PDO::PARAM_INT);
        $smt->bindParam(':marks_hist', $marks_hist , PDO::PARAM_INT);
        $smt->bindParam(':marks_total', $marks_total , PDO::PARAM_INT);
        $smt->bindParam(':marks_percentage', $marks_percentage , PDO::PARAM_INT);
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