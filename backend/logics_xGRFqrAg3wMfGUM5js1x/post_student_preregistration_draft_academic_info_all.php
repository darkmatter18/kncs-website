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
if (isset($_INPUT['application_no']) && isset($_INPUT['previous_school_name']) && isset($_INPUT['year_of_madhyamik'])
    && isset($_INPUT['previous_student_id'])
    && isset($_INPUT['marks_beng']) && isset($_INPUT['marks_engb']) && isset($_INPUT['marks_maths'])
    && isset($_INPUT['marks_psc']) && isset($_INPUT['marks_lsc']) && isset($_INPUT['marks_geo']) && isset($_INPUT['marks_hist'])
    && isset($_INPUT['marks_total']) && isset($_INPUT['marks_percentage'])
    && isset($_INPUT['stream']) && isset($_INPUT['first_language'])
    && isset($_INPUT['second_language']) && isset($_INPUT['first_major']) && isset($_INPUT['second_major']) && isset($_INPUT['third_major'])
    && isset($_INPUT['forth_major'])
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

        // PRESENT ACADEMIC DETAILS -- 7 INPUT
        $stream_clean = Filter::String($_INPUT['stream']);
        $first_language_clean = Filter::String($_INPUT['first_language']);
        $second_language_clean = Filter::String($_INPUT['second_language']);
        $first_major_clean = Filter::String($_INPUT['first_major']);
        $second_major_clean = Filter::String($_INPUT['second_major']);
        $third_major_clean = Filter::String($_INPUT['third_major']);
        $forth_major_clean = Filter::String($_INPUT['forth_major']);


        // INSERTING PREVIOUS ACADEMIC INFO
        // TABLE : student_preregistration_draft_previous_academic_info

        $pdocon->beginTransaction();    // check wheather it is inside the table or not
        
        $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_previous_academic_info(application_no, previous_school_name, year_of_madhyamik, previous_student_id)
                                VALUES(:application_no, :previous_school_name, :year_of_madhyamik, :previous_student_id)');

        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt->bindParam(':previous_school_name', $previous_school_name, PDO::PARAM_STR);
        $smt->bindParam(':year_of_madhyamik', $year_of_madhyamik, PDO::PARAM_INT);
        $smt->bindParam(':previous_student_id', $previous_student_id, PDO::PARAM_INT);


        if ($smt->execute()) {
            // INSERTING PREVIOUS ACADEMIC MARKS --10 INPUT INCLUDING APPLICATION_NO
            // TABLE : student_preregistration_draft_previous_academic_marks
            $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_previous_academic_marks
                                (application_no, marks_beng, marks_engb, marks_maths, marks_psc, marks_lsc, marks_geo, marks_hist, marks_total, marks_percentage)
                        VALUES(:application_no, :marks_beng, :marks_engb, :marks_maths, :marks_psc, :marks_lsc, :marks_geo, :marks_hist, :marks_total, :marks_percentage)');

            $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
            $smt->bindParam(':marks_beng', $marks_beng, PDO::PARAM_INT);
            $smt->bindParam(':marks_engb', $marks_engb, PDO::PARAM_INT);
            $smt->bindParam(':marks_maths', $marks_maths, PDO::PARAM_INT);
            $smt->bindParam(':marks_psc', $marks_psc, PDO::PARAM_INT);
            $smt->bindParam(':marks_lsc', $marks_lsc, PDO::PARAM_INT);
            $smt->bindParam(':marks_geo', $marks_geo, PDO::PARAM_INT);
            $smt->bindParam(':marks_hist', $marks_hist, PDO::PARAM_INT);
            $smt->bindParam(':marks_total', $marks_total, PDO::PARAM_INT);
            $smt->bindParam(':marks_percentage', $marks_percentage, PDO::PARAM_INT);

            if ($smt->execute()) {
                // INSERTING PRESENT ACADEMIC SUBJECTS DETAILS -- 8 COLUMN INCLUDING APPLICATION_NO  
                // TABLE : student_preregistration_academic_info
                $smt = $pdocon->prepare('INSERT INTO student_preregistration_draft_present_academic
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

                if($smt->execute()){
                    if($pdocon->commit()){
                      $return['status'] = true;
                      $return['statusText'] = "Successfully Inserted Academic Details";
                      $return['error'] = null;
                    } else {
                      http_response_code(500);
                      $return['status'] = false;
                      $return['statusText'] = null;
                      $return['error'] = "Failed to commit record on Database";
                    }
                } else {
                    http_response_code(500);
                    $return['status'] = false;
                    $return['statusText'] = null;
                    $return['error'] = "Failed to record on Database - student_preregistration_academic_info";
                }
            } else {
                http_response_code(500);
                $return['status'] = false;
                $return['statusText'] = null;
                $return['error'] = "Failed to record on Database - student_preregistration_draft_previous_academic_marks";
            }

        } else {
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Failed to record on Database - student_preregistration_draft_previous_academic_info";
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