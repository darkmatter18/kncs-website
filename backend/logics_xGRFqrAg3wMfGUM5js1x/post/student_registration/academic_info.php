<?php

/**
 * POST ACADEMIC DETAILS INSERTING
 * DATEBASE: kncs
 * TABLE:   student_preregistration_draft_previous_academic_info
 *          student_preregistration_draft_previous_academic_marks
 *          student_preregistration_academic_info
 *
 * Manojit Karmakar (14/07/2020)
 */

define('_inc', true);
require INC_DIR . 'index.php';
require INC_DIR . 'protected.php';

$_INPUT = json_decode(file_get_contents('php://input'), true);

$return = [];
header('Content-Type: application/json');

// 20 INPUT INCLUDING APPLICATION_NO
if (isset($_INPUT['previous_school_name']) && isset($_INPUT['year_of_madhyamik'])
    && isset($_INPUT['previous_student_id']) && isset($_INPUT['marks_beng']) && isset($_INPUT['marks_engb']) && isset($_INPUT['marks_maths'])
    && isset($_INPUT['marks_psc']) && isset($_INPUT['marks_lsc']) && isset($_INPUT['marks_geo']) && isset($_INPUT['marks_hist'])
    && isset($_INPUT['marks_total']) && isset($_INPUT['marks_percentage'])&& isset($_INPUT['stream']) && isset($_INPUT['first_language'])
    && isset($_INPUT['second_language']) && isset($_INPUT['first_major']) && isset($_INPUT['second_major']) && isset($_INPUT['third_major'])
    && isset($_INPUT['forth_major']) && isset($_INPUT['direct_admission']) && isset($_INPUT['medium'])
    && isset($_INPUT['recaptcha_token'])) {

    if (checkRecaptcha($_INPUT['recaptcha_token'])) {

        $application_no = $auth_user['data']->application_no;

        // PREVIOUS SCHOOL DETAILS... 3 INPUT
        $previous_school_name_clean = Filter::String($_INPUT['previous_school_name']);
        $year_of_madhyamik_clean = Filter::String($_INPUT['year_of_madhyamik']);
        $previous_student_id_clean = Filter::Int($_INPUT['previous_student_id']);

        // PREVIOUS ACADEMIC MARKS--- 9 INPUT
        $marks_beng_clean = Filter::Int($_INPUT['marks_beng']);
        $marks_engb_clean = Filter::Int($_INPUT['marks_engb']);
        $marks_maths_clean = Filter::Int($_INPUT['marks_maths']);
        $marks_psc_clean = Filter::Int($_INPUT['marks_psc']);
        $marks_lsc_clean = Filter::Int($_INPUT['marks_lsc']);
        $marks_geo_clean = Filter::Int($_INPUT['marks_geo']);
        $marks_hist_clean = Filter::Int($_INPUT['marks_hist']);
        $marks_total_clean = Filter::Int($_INPUT['marks_total']);
        $marks_percentage_clean = Filter::Int($_INPUT['marks_percentage']);

        // PRESENT ACADEMIC DETAILS -- 9 INPUT
        $stream_clean = Filter::String($_INPUT['stream']);
        $first_language_clean = Filter::String($_INPUT['first_language']);
        $second_language_clean = Filter::String($_INPUT['second_language']);
        $first_major_clean = Filter::String($_INPUT['first_major']);
        $second_major_clean = Filter::String($_INPUT['second_major']);
        $third_major_clean = Filter::String($_INPUT['third_major']);
        $forth_major_clean = Filter::String($_INPUT['forth_major']);
        $direct_admission_clean = Filter::String($_INPUT['direct_admission']);
        $medium_clean = Filter::String($_INPUT['medium']);


        $smt = $pdocon->prepare("SELECT application_no FROM student_preregistration_draft_previous_academic_info 
                                            WHERE application_no= :application_no");
        $smt->bindParam(":application_no", $application_no, PDO::PARAM_INT);

        if($smt->execute()){
            $pdocon->beginTransaction();
            
            $smt1 = null;
            $smt2 = null;
            $smt3 = null;
            $smt4 = null;

            if($smt->rowCount() > 0){
                // TABLE : Previous Academic Info
                $smt1= $pdocon->prepare('UPDATE student_preregistration_draft_previous_academic_info
                                                        SET previous_school_name = :previous_school_name, year_of_madhyamik = :year_of_madhyamik,
                                                            previous_student_id = :previous_student_id
                                                        WHERE application_no = :application_no');
                
                // TABLE: student_preregistration_draft_previous_academic_marks
                $smt2= $pdocon->prepare('UPDATE student_preregistration_draft_previous_academic_marks
                                            SET marks_beng = :marks_beng, marks_engb = :marks_engb, marks_maths = :marks_maths,
                                                marks_psc = :marks_psc, marks_lsc = :marks_lsc, marks_geo = :marks_geo, marks_hist = :marks_hist,
                                                marks_total = :marks_total, marks_percentage = :marks_percentage
                                            WHERE application_no = :application_no');
                
                // TABLE : student_preregistration_draft_present_academic
                $smt3= $pdocon->prepare('UPDATE student_preregistration_draft_present_academic
                                            SET stream = :stream, first_language = :first_language, second_language = :second_language,
                                                first_major = :first_major, second_major = :second_major, third_major = :third_major,
                                                forth_major = :forth_major, direct_admission = :direct_admission, medium = :medium
                                            WHERE application_no = :application_no');
               

            } else {
                // TABLE : Previous Academic Info
                $smt1 = $pdocon->prepare('INSERT INTO student_preregistration_draft_previous_academic_info
                                                    (application_no, previous_school_name, year_of_madhyamik, previous_student_id)
                                            VALUES(:application_no, :previous_school_name, :year_of_madhyamik, :previous_student_id)');

                // TABLE : student_preregistration_draft_previous_academic_marks
                $smt2 = $pdocon->prepare('INSERT INTO student_preregistration_draft_previous_academic_marks
                                            (application_no, marks_beng, marks_engb, marks_maths, marks_psc, marks_lsc, marks_geo, marks_hist,
                                                marks_total, marks_percentage)
                                            VALUES(:application_no, :marks_beng, :marks_engb, :marks_maths, :marks_psc, :marks_lsc, :marks_geo,
                                            :marks_hist, :marks_total, :marks_percentage)');
                
                //TABLE : 
                $smt3 = $pdocon->prepare('INSERT INTO student_preregistration_draft_present_academic
                                (application_no, stream, first_language, second_language, first_major, second_major, 
                                 third_major, forth_major, direct_admission, medium)
                                VALUES(:application_no, :stream, :first_language, :second_language, :first_major, 
                                       :second_major, :third_major, :forth_major, :direct_admission, :medium)');
            }

            // Previous Academic Info
            $smt1->bindParam(':application_no', $application_no, PDO::PARAM_INT);
            $smt1->bindParam(':previous_school_name', $previous_school_name_clean, PDO::PARAM_STR);
            $smt1->bindParam(':year_of_madhyamik', $year_of_madhyamik_clean, PDO::PARAM_INT);
            $smt1->bindParam(':previous_student_id', $previous_student_id_clean, PDO::PARAM_STR);

            // Previous Academic Marks
            $smt2->bindParam(':application_no', $application_no, PDO::PARAM_INT);
            $smt2->bindParam(':marks_beng', $marks_beng_clean, PDO::PARAM_INT);
            $smt2->bindParam(':marks_engb', $marks_engb_clean, PDO::PARAM_INT);
            $smt2->bindParam(':marks_maths', $marks_maths_clean, PDO::PARAM_INT);
            $smt2->bindParam(':marks_psc', $marks_psc_clean, PDO::PARAM_INT);
            $smt2->bindParam(':marks_lsc', $marks_lsc_clean, PDO::PARAM_INT);
            $smt2->bindParam(':marks_geo', $marks_geo_clean, PDO::PARAM_INT);
            $smt2->bindParam(':marks_hist', $marks_hist_clean, PDO::PARAM_INT);
            $smt2->bindParam(':marks_total', $marks_total_clean, PDO::PARAM_INT);
            $smt2->bindParam(':marks_percentage', $marks_percentage_clean, PDO::PARAM_INT);

            // Present Academic
            $smt3->bindParam(':application_no', $application_no, PDO::PARAM_INT);
            $smt3->bindParam(':stream', $stream_clean, PDO::PARAM_STR);
            $smt3->bindParam(':first_language', $first_language_clean, PDO::PARAM_STR);
            $smt3->bindParam(':second_language', $second_language_clean, PDO::PARAM_STR);
            $smt3->bindParam(':first_major', $first_major_clean, PDO::PARAM_STR);
            $smt3->bindParam(':second_major', $second_major_clean, PDO::PARAM_STR);
            $smt3->bindParam(':third_major', $third_major_clean, PDO::PARAM_STR);
            $smt3->bindParam(':forth_major', $forth_major_clean, PDO::PARAM_STR);
            $smt3->bindParam(':direct_admission', $direct_admission_clean, PDO::PARAM_STR);
            $smt3->bindParam(':medium', $medium_clean, PDO::PARAM_STR);


            if($smt1->execute() && $smt2->execute() && $smt3->execute()){
                $pdocon->commit();
                $return['status'] = true;
                $return['statusText'] = null;
                $return['error'] = "Successfully Inserted or Updated";

            } else {
                $return['status'] = false;
                $return['statusText'] = null;
                $return['error'] = "Failed to commit record on Database";

            }

        } else {
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Failed to get data from .....";
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