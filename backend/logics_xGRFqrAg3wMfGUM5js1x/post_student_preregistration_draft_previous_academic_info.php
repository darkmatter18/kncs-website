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
if(isset($_INPUT['application_no']) && isset($_INPUT['previous_school_name']) && isset($_INPUT['year_of_madhyamik'])
&& isset($_INPUT['previous_student_id']) && isset($_INPUT['recaptcha_token'])){

    if(checkRecaptcha($_INPUT['recaptcha_token'])){
        $application_no_clean = Filter::Int($_INPUT['application_no']);
        $previous_school_name_clean = Filter::String($_INPUT['previous_school_name']);
        $year_of_madhyamik_clean = Filter::String($_INPUT['year_of_madhyamik']);
        $previous_student_id_clean = Filter::Int($_INPUT['previous_student_id']); //ata ki hobe? string na int ?

        $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_previous_academic_info(application_no, previous_school_name, year_of_madhyamik, previous_student_id)
                                VALUES(:application_no, :previous_school_name, :year_of_madhyamik, :previous_student_id)');

        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt->bindParam(':previous_school_name', $previous_school_name , PDO::PARAM_STR);
        $smt->bindParam(':year_of_madhyamik', $year_of_madhyamik , PDO::PARAM_STR);
        $smt->bindParam(':previous_student_id', $previous_student_id , PDO::PARAM_INT); // str or int ??????

    }else {
        # code...
    }
}else{

}