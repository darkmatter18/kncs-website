<?php

    define('_inc', true);
    require INC_DIR . 'index.php';
    require INC_DIR . 'protected.php';

    $_INPUT = json_decode(file_get_contents('php://input'), true);

    $return = [];
    header('Content-Type: application/json');
    function execution()

    if (isset($_INPUT['application_no'])
    {
        $pdocon->beginTransaction();
        
        $smt = $pdocon->prepare("UPDATE `student_preregistration_details` SET status = 'SELECTED' WHERE application_no = :application_no");
        $smt->bind_param(':application_no', $application, PDO::PARAM_INT)
        

        foreach ($_INPUT['application_no'] as $number)
        {
            $application = $number;
            $smt->ececute();
        }
        $x = $smt->commit()

        if ($x)
        {
            $smt = $pdocon->prepare("SELECT T1.application_no, T1.first_name, T1.middle_name, T1.last_name, T1.status,
                                T2.previous_school_name, T2.year_of_madhyamik, T2.previous_student_id,
                                T3.marks_beng, T3.marks_engb, T3.marks_maths, T3.marks_psc, T3.marks_lsc, T3.marks_geo,
                                T3.marks_hist, T3.marks_total, T3.marks_percentage,
                                T4.stream, T4.first_language, T4.second_language, T4.first_major,
                                T4.second_major, T4.third_major, T4.forth_major, T4.direct_admission, T4.medium,
                                T5.father_name
                                FROM `student_preregistration_details` AS T1
                                INNER JOIN `student_preregistration_draft_previous_academic_info` AS T2
                                    ON T1.application_no=T2.application_no
                                INNER JOIN `student_preregistration_draft_previous_academic_marks` AS T3
                                    ON T1.application_no=T3.application_no
                                INNER JOIN `student_preregistration_draft_present_academic` AS T4
                                    ON T1.application_no=T4.application_no
                                INNER JOIN student_preregistration_draft_family_info AS T5 
                                    ON T1.application_no = T5.application_no
                                WHERE T1.status='SELECTED' OR T1.Status='SUBMITTED' ");
            if ($smt->execute()) 
            {
                $output = $smt->fetchAll(PDO::FETCH_ASSOC);
                $return['data'] = $output;
                $return['status'] = true;
                $return['statusText'] = "Fetch Done (SUBMITTED , SELECTED)";
                $return['error'] = null;
        
            }
            else 
            {
                http_response_code(500);
                $return['status'] = false;
                $return['statusText'] = null;
                $return['error'] = "Unable to connect database";
            }
        }
        else 
        {
            http_response_code(500);
            $return['status'] = false;
            $return['statusText'] = null;
            $return['error'] = "Unable to connect database";
        }
    }
    echo json_encode($return);
    exit;
    