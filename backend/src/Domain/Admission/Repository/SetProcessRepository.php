<?php


namespace App\Domain\Admission\Repository;


use PDO;

final class SetProcessRepository
{

    /**
     * @var PDO
     */
    private $connection;

    public function __construct(PDO $PDO)
    {
        $this->connection = $PDO;
    }

    /**
     * Check if the User already has a Academic Info
     *
     * @param int $application_no application_no of the user
     * @return bool true if the exist, else false
     */
    public function isAcademicInfoExists(int $application_no): bool{
        return $this->isExist($application_no,"SELECT COUNT(*) 
                                                    FROM admission_student_preregistration_draft_previous_academic_info 
                                                    WHERE application_no= :application_no");
    }

    /**
     * Check if the User already has a Personal Info
     *
     * @param string $application_no application_no of the user
     * @return bool true if the exist, else false
     */
    public function isPersonalInfoExists(string $application_no): bool{
        return $this->isExist($application_no,"SELECT COUNT(*) 
                                                    FROM admission_student_preregistration_draft_basic_info  
                                                    WHERE application_no= :application_no");
    }

    /**
     * Check if the User already has a Payment Info
     *
     * @param int $application_no application_no of the user
     * @return bool true if the exist, else false
     */
    public function isPaymentInfoExists(int $application_no): bool{
        return $this->isExist($application_no,"SELECT COUNT(*) 
                                                    FROM admission_student_preregistration_draft_payment_info 
                                                    WHERE application_no= :application_no");
    }

    /**
     * Check if the User already exist.
     *
     * @param string $application_no application_no of the user
     * @param string $query_statement SQL Query
     * @return bool true if the exist, else false
     */
    private function isExist(string $application_no, string $query_statement): bool {
        $smt = $this->connection->prepare($query_statement);
        $smt->bindParam(":application_no", $application_no, PDO::PARAM_STR);
        $smt->execute();
        return $smt->fetchColumn();
    }

    /**
     * Update academic info
     * @param int $application_no application_no of the user
     * @param array $details academic info
     */
    public function updateAcademicInfo(int $application_no, array $details): void{
        $this->connection->beginTransaction();
        $smt1 = $this->connection->prepare("UPDATE 
                                                    admission_student_preregistration_draft_previous_academic_info
                                                    SET previous_school_name = :previous_school_name, 
                                                    year_of_madhyamik = :year_of_madhyamik,
                                                    previous_student_id = :previous_student_id
                                                    WHERE application_no = :application_no");

        // TABLE: student_preregistration_draft_previous_academic_marks
        $smt2 = $this->connection->prepare('UPDATE 
                                                    admission_student_preregistration_draft_previous_academic_marks
                                                    SET marks_beng = :marks_beng, marks_engb = :marks_engb, 
                                                    marks_maths = :marks_maths, marks_psc = :marks_psc, 
                                                    marks_lsc = :marks_lsc, marks_geo = :marks_geo, 
                                                    marks_hist = :marks_hist, marks_total = :marks_total, 
                                                    marks_percentage = :marks_percentage
                                                    WHERE application_no = :application_no');

        // TABLE : student_preregistration_draft_present_academic
        $smt3 = $this->connection->prepare('UPDATE admission_student_preregistration_draft_present_academic
                                                    SET stream = :stream, first_language = :first_language, 
                                                    second_language = :second_language, first_major = :first_major, 
                                                    second_major = :second_major, third_major = :third_major,
                                                    forth_major = :forth_major, direct_admission = :direct_admission, 
                                                    medium = :medium
                                                    WHERE application_no = :application_no');

        // Previous Academic Info
        $smt1->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt1->bindParam(':previous_school_name', $details['previous_school_name'], PDO::PARAM_STR);
        $smt1->bindParam(':year_of_madhyamik', $details['year_of_madhyamik'], PDO::PARAM_INT);
        $smt1->bindParam(':previous_student_id', $details['previous_student_id'], PDO::PARAM_STR);

        // Previous Academic Marks
        $smt2->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt2->bindParam(':marks_beng', $details['marks_beng'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_engb', $details['marks_engb'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_maths', $details['marks_maths'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_psc', $details['marks_psc'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_lsc', $details['marks_lsc'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_geo', $details['marks_geo'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_hist', $details['marks_hist'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_total', $details['marks_total'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_percentage', $details['marks_percentage'], PDO::PARAM_STR);

        // Present Academic
        $smt3->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt3->bindParam(':stream', $details['stream'], PDO::PARAM_STR);
        $smt3->bindParam(':first_language', $details['first_language'], PDO::PARAM_STR);
        $smt3->bindParam(':second_language', $details['second_language'], PDO::PARAM_STR);
        $smt3->bindParam(':first_major', $details['first_major'], PDO::PARAM_STR);
        $smt3->bindParam(':second_major', $details['second_major'], PDO::PARAM_STR);
        $smt3->bindParam(':third_major', $details['third_major'], PDO::PARAM_STR);
        $smt3->bindParam(':forth_major', $details['forth_major'], PDO::PARAM_STR);
        $smt3->bindParam(':direct_admission', $details['direct_admission'], PDO::PARAM_BOOL);
        $smt3->bindParam(':medium', $details['medium'], PDO::PARAM_STR);

        $smt1->execute();
        $smt2->execute();
        $smt3->execute();
        $this->connection->commit();
    }

    /**
     * Insert academic info
     * @param int $application_no application_no of the user
     * @param array $details academic info
     */
    public function setAcademicInfo(int $application_no, array $details): void{
        $this->connection->beginTransaction();
        // TABLE : Previous Academic Info
        $smt1 = $this->connection->prepare('INSERT INTO 
                                                    admission_student_preregistration_draft_previous_academic_info
                                                    (application_no, previous_school_name, year_of_madhyamik, 
                                                     previous_student_id)
                                                    VALUES(:application_no, :previous_school_name, :year_of_madhyamik, 
                                                           :previous_student_id)');

        // TABLE : student_preregistration_draft_previous_academic_marks
        $smt2 = $this->connection->prepare('INSERT INTO 
                                                     admission_student_preregistration_draft_previous_academic_marks
                                                    (application_no, marks_beng, marks_engb, marks_maths, marks_psc, 
                                                     marks_lsc, marks_geo, marks_hist, marks_total, marks_percentage)
                                                    VALUES(:application_no, :marks_beng, :marks_engb, :marks_maths, 
                                                           :marks_psc, :marks_lsc, :marks_geo, :marks_hist, 
                                                           :marks_total, :marks_percentage)');

        //TABLE :
        $smt3 = $this->connection->prepare('INSERT INTO 
                                                    admission_student_preregistration_draft_present_academic
                                                    (application_no, stream, first_language, second_language, 
                                                     first_major, second_major, third_major, forth_major, 
                                                     direct_admission, medium)
                                                    VALUES(:application_no, :stream, :first_language, :second_language, 
                                                           :first_major, :second_major, :third_major, :forth_major, 
                                                           :direct_admission, :medium)');

        // Previous Academic Info
        $smt1->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt1->bindParam(':previous_school_name', $details['previous_school_name'], PDO::PARAM_STR);
        $smt1->bindParam(':year_of_madhyamik', $details['year_of_madhyamik'], PDO::PARAM_INT);
        $smt1->bindParam(':previous_student_id', $details['previous_student_id'], PDO::PARAM_STR);

        // Previous Academic Marks
        $smt2->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt2->bindParam(':marks_beng', $details['marks_beng'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_engb', $details['marks_engb'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_maths', $details['marks_maths'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_psc', $details['marks_psc'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_lsc', $details['marks_lsc'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_geo', $details['marks_geo'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_hist', $details['marks_hist'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_total', $details['marks_total'], PDO::PARAM_INT);
        $smt2->bindParam(':marks_percentage', $details['marks_percentage'], PDO::PARAM_STR);

        // Present Academic
        $smt3->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt3->bindParam(':stream', $details['stream'], PDO::PARAM_STR);
        $smt3->bindParam(':first_language', $details['first_language'], PDO::PARAM_STR);
        $smt3->bindParam(':second_language', $details['second_language'], PDO::PARAM_STR);
        $smt3->bindParam(':first_major', $details['first_major'], PDO::PARAM_STR);
        $smt3->bindParam(':second_major', $details['second_major'], PDO::PARAM_STR);
        $smt3->bindParam(':third_major', $details['third_major'], PDO::PARAM_STR);
        $smt3->bindParam(':forth_major', $details['forth_major'], PDO::PARAM_STR);
        $smt3->bindParam(':direct_admission', $details['direct_admission'], PDO::PARAM_BOOL);
        $smt3->bindParam(':medium', $details['medium'], PDO::PARAM_STR);

        $smt1->execute();
        $smt2->execute();
        $smt3->execute();
        $this->connection->commit();
    }

    /**
     * Update payment info
     * @param int $application_no application_no of the user
     * @param array $payment_data payment info
     */
    public function updatePaymentInfo(int $application_no, array $payment_data): void{
        //UPDATE
        $smt = $this->connection->prepare('UPDATE admission_student_preregistration_draft_payment_info
                                                        SET mode_of_payment = :mode_of_payment, 
                                                            name_of_bank = :name_of_bank, 
                                                            transaction_id = :transaction_id, 
                                                            transaction_date = :transaction_date
                                                        WHERE application_no = :application_no');
        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt->bindParam(':mode_of_payment', $payment_data['mode_of_payment'], PDO::PARAM_STR);
        $smt->bindParam(':name_of_bank', $payment_data['name_of_bank'], PDO::PARAM_STR);
        $smt->bindParam(':transaction_id', $payment_data['transaction_id'], PDO::PARAM_STR);
        $smt->bindParam(':transaction_date', $payment_data['transaction_date'], PDO::PARAM_STR);
        $smt->execute();
    }

    public function setPaymentInfo(int $application_no, array $payment_data){
        $smt = $this->connection->prepare('INSERT INTO admission_student_preregistration_draft_payment_info
                                                (application_no, mode_of_payment, name_of_bank, transaction_id, 
                                                 transaction_date)
                                                    VALUES(:application_no, :mode_of_payment, :name_of_bank, 
                                                           :transaction_id, :transaction_date)');
        $smt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt->bindParam(':mode_of_payment', $payment_data['mode_of_payment'], PDO::PARAM_STR);
        $smt->bindParam(':name_of_bank', $payment_data['name_of_bank'], PDO::PARAM_STR);
        $smt->bindParam(':transaction_id', $payment_data['transaction_id'], PDO::PARAM_STR);
        $smt->bindParam(':transaction_date', $payment_data['transaction_date'], PDO::PARAM_STR);
        $smt->execute();
    }

    /**
     * Update personal info
     * @param int $application_no application_no of the user
     * @param array $basic_info personal info
     */
    public function updateBasicInfo(int $application_no, array $basic_info): void{
        $this->connection->beginTransaction();
        //table :  BASIC INFO
        $smt1= $this->connection->prepare('UPDATE admission_student_preregistration_draft_basic_info
                                                        SET gender = :gender, religion = :religion, caste = :caste, 
                                                            mother_tongue = :mother_tongue,
                                                            apply_for_reserved_seat = :apply_for_reserved_seat, 
                                                            caste_certificate_no = :caste_certificate_no,
                                                            weather_bpl = :weather_bpl, bpl_card_no = :bpl_card_no, 
                                                            whatsapp_no = :whatsapp_no
                                                        WHERE application_no = :application_no');
        //table: FAMILY INFO
        $smt2 = $this->connection->prepare('UPDATE admission_student_preregistration_draft_family_info
                                                        SET father_name = :father_name, 
                                                            father_occupation = :father_occupation,
                                                            mother_name = :mother_name, 
                                                            mother_occupation = :mother_occupation,
                                                            guardian_name = :guardian_name, 
                                                            guardian_occupation = :guardian_occupation,
                                                            guardian_same_father = :guardian_same_father
                                                        WHERE application_no = :application_no');

        //TABLE: ADDRESS
        $smt3 = $this->connection->prepare('UPDATE admission_student_preregistration_draft_address
                                                SET address_line_1 = :address_line_1, address_line_2 = :address_line_2,
                                                    city = :city, district = :district, pin = :pin
                                                WHERE application_no = :application_no');
        // Table : Image
        $smt4 = $this->connection->prepare('UPDATE admission_student_preregistration_draft_image
                                            SET image_type = :image_type, image = :image
                                            WHERE application_no = :application_no');

        // BASIC INFO
        $smt1->bindParam(':application_no', $application_no, PDO::PARAM_INT);
        $smt1->bindParam(':gender', $basic_info['gender'], PDO::PARAM_STR);
        $smt1->bindParam(':religion', $basic_info['religion'], PDO::PARAM_STR);
        $smt1->bindParam(':caste', $basic_info['caste'], PDO::PARAM_STR);
        $smt1->bindParam(':mother_tongue', $basic_info['mother_tongue'], PDO::PARAM_STR);
        $smt1->bindParam(':apply_for_reserved_seat', $basic_info['apply_for_reserved_seat'], PDO::PARAM_BOOL);
        $smt1->bindParam(':caste_certificate_no', $basic_info['caste_certificate_no'], PDO::PARAM_STR);
        $smt1->bindParam(':weather_bpl', $basic_info['weather_bpl'], PDO::PARAM_BOOL);
        $smt1->bindParam(':bpl_card_no', $basic_info['bpl_card_no'], PDO::PARAM_STR);
        $smt1->bindParam(':whatsapp_no', $basic_info['whatsapp_no'], PDO::PARAM_INT);

        //FAMILY INFO
        $smt2->bindParam(':application_no', $application_no, PDO::PARAM_STR);
        $smt2->bindParam(':father_name', $basic_info['father_name'], PDO::PARAM_STR);
        $smt2->bindParam(':father_occupation', $basic_info['father_occupation'], PDO::PARAM_STR);
        $smt2->bindParam(':mother_name', $basic_info['mother_name'], PDO::PARAM_STR);
        $smt2->bindParam(':mother_occupation', $basic_info['mother_occupation'], PDO::PARAM_STR);
        $smt2->bindParam(':guardian_name', $basic_info['guardian_name'], PDO::PARAM_STR);
        $smt2->bindParam(':guardian_occupation', $basic_info['guardian_occupation'], PDO::PARAM_STR);
        $smt2->bindParam(':guardian_same_father', $basic_info['guardian_same_father'], PDO::PARAM_BOOL);

        //ADDRESS INFO
        $smt3->bindParam(':application_no', $application_no, PDO::PARAM_STR);
        $smt3->bindParam(':address_line_1', $basic_info['address_line_1'], PDO::PARAM_STR);
        $smt3->bindParam(':address_line_2', $basic_info['address_line_2'], PDO::PARAM_STR);
        $smt3->bindParam(':city', $basic_info['city'], PDO::PARAM_STR);
        $smt3->bindParam(':district', $basic_info['district'], PDO::PARAM_STR);
        $smt3->bindParam(':pin', $basic_info['pin'], PDO::PARAM_INT);

        //IMAGE
        $smt4->bindParam(':application_no', $application_no, PDO::PARAM_STR);
        $smt4->bindParam(':image_type', $basic_info['image_type'], PDO::PARAM_STR);
        $smt4->bindParam(':image', $basic_info['base64_decode'], PDO::PARAM_LOB);

        $smt1->execute();
        $smt2->execute();
        $smt3->execute();
        $smt4->execute();
        $this->connection->commit();
    }

    /**
     * Insert personal info
     * @param string $application_no application_no of the user
     * @param array $basic_info personal info
     */
    public function setBasicInfo(string $application_no, array $basic_info): void{
        // TABLE : BASIC INFO
        $this->connection->beginTransaction();
        $smt1 = $this->connection->prepare('INSERT INTO admission_student_preregistration_draft_basic_info(application_no, gender, religion, caste, mother_tongue,
                                            apply_for_reserved_seat, caste_certificate_no,  weather_bpl, bpl_card_no, whatsapp_no)
                                VALUES(:application_no, :gender, :religion, :caste, :mother_tongue, :apply_for_reserved_seat,
                                        :caste_certificate_no,  :weather_bpl, :bpl_card_no, :whatsapp_no )');

        //TABLE : FAMILY INFO
        $smt2 = $this->connection->prepare('INSERT INTO admission_student_preregistration_draft_family_info
                                            (application_no, father_name, father_occupation, mother_name, mother_occupation, guardian_name,
                                                guardian_occupation, guardian_same_father)
                                            VALUES(:application_no, :father_name, :father_occupation, :mother_name, :mother_occupation,
                                                :guardian_name, :guardian_occupation, :guardian_same_father)');
        // TABLE :
        $smt3 = $this->connection->prepare('INSERT INTO admission_student_preregistration_draft_address
                                            (application_no, address_line_1, address_line_2, city, district, pin)
                                            VALUES(:application_no,:address_line_1, :address_line_2, :city, :district, :pin)');

        // Table : student_preregistration_draft_image
        $smt4 = $this->connection->prepare('INSERT INTO admission_student_preregistration_draft_image(application_no, image_type, image)
                                            VALUES(:application_no, :image_type, :image)');

        // BASIC INFO
        $smt1->bindParam(':application_no', $application_no, PDO::PARAM_STR);
        $smt1->bindParam(':gender', $basic_info['gender'], PDO::PARAM_STR);
        $smt1->bindParam(':religion', $basic_info['religion'], PDO::PARAM_STR);
        $smt1->bindParam(':caste', $basic_info['caste'], PDO::PARAM_STR);
        $smt1->bindParam(':mother_tongue', $basic_info['mother_tongue'], PDO::PARAM_STR);
        $smt1->bindParam(':apply_for_reserved_seat', $basic_info['apply_for_reserved_seat'], PDO::PARAM_BOOL);
        $smt1->bindParam(':caste_certificate_no', $basic_info['caste_certificate_no'], PDO::PARAM_STR);
        $smt1->bindParam(':weather_bpl', $basic_info['weather_bpl'], PDO::PARAM_BOOL);
        $smt1->bindParam(':bpl_card_no', $basic_info['bpl_card_no'], PDO::PARAM_STR);
        $smt1->bindParam(':whatsapp_no', $basic_info['whatsapp_no'], PDO::PARAM_INT);

        //FAMILY INFO
        $smt2->bindParam(':application_no', $application_no, PDO::PARAM_STR);
        $smt2->bindParam(':father_name', $basic_info['father_name'], PDO::PARAM_STR);
        $smt2->bindParam(':father_occupation', $basic_info['father_occupation'], PDO::PARAM_STR);
        $smt2->bindParam(':mother_name', $basic_info['mother_name'], PDO::PARAM_STR);
        $smt2->bindParam(':mother_occupation', $basic_info['mother_occupation'], PDO::PARAM_STR);
        $smt2->bindParam(':guardian_name', $basic_info['guardian_name'], PDO::PARAM_STR);
        $smt2->bindParam(':guardian_occupation', $basic_info['guardian_occupation'], PDO::PARAM_STR);
        $smt2->bindParam(':guardian_same_father', $basic_info['guardian_same_father'], PDO::PARAM_BOOL);

        //ADDRESS INFO
        $smt3->bindParam(':application_no', $application_no, PDO::PARAM_STR);
        $smt3->bindParam(':address_line_1', $basic_info['address_line_1'], PDO::PARAM_STR);
        $smt3->bindParam(':address_line_2', $basic_info['address_line_2'], PDO::PARAM_STR);
        $smt3->bindParam(':city', $basic_info['city'], PDO::PARAM_STR);
        $smt3->bindParam(':district', $basic_info['district'], PDO::PARAM_STR);
        $smt3->bindParam(':pin', $basic_info['pin'], PDO::PARAM_INT);

        //IMAGE
        $smt4->bindParam(':application_no', $application_no, PDO::PARAM_STR);
        $smt4->bindParam(':image_type', $basic_info['image_type'], PDO::PARAM_STR);
        $smt4->bindParam(':image', $basic_info['base64_decode'], PDO::PARAM_LOB);

        $smt1->execute();
        $smt2->execute();
        $smt3->execute();
        $smt4->execute();
        $this->connection->commit();
    }

    /**
     * Insert Declaration info
     * @param int $application_no application_no of the user
     * @param array $declaration_info declaration info
     */
    public function setDeclarationInfo(int $application_no, array $declaration_info): void
    {
        $this->connection->beginTransaction();
        //Insert declaration info
        $insertsmt = $this->connection->prepare('INSERT INTO 
                                                                admission_student_preregistration_draft_declaration_info 
                                                                (application_no, date, place, full_name)
                                                          VALUES(:application_no, :date, :place, :full_name)');

        $insertsmt->bindParam(':application_no', $application_no, PDO::PARAM_INT);

        $insertsmt->bindParam(':date', $declaration_info['date'], PDO::PARAM_STR);
        $insertsmt->bindParam(':place', $declaration_info['place'], PDO::PARAM_STR);
        $insertsmt->bindParam(':full_name', $declaration_info['full_name'], PDO::PARAM_STR);
        $insertsmt->execute();

        //Fetch declaration info
        $fetchSmt = $this->connection->prepare("SELECT direct_admission
                                                         FROM admission_student_preregistration_draft_present_academic
                                                         WHERE application_no = :application_no");
        $fetchSmt->bindParam(':application_no', $application_no);
        $fetchSmt->execute();
        $output = $fetchSmt->fetch(PDO::FETCH_ASSOC);

        //Update declaration info
        $updateSmt = $this->connection->prepare("UPDATE admission_student_preregistration_details 
                                                          SET status=:status WHERE application_no=:application_no");
        if ((string)$output['direct_admission'] == "1") {
            $status = "SELECTED";
            $updateSmt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
            $updateSmt->bindParam(':status', $status, PDO::PARAM_STR);
        } else {
            $status = "SUBMITTED";
            $updateSmt->bindParam(':application_no', $application_no, PDO::PARAM_INT);
            $updateSmt->bindParam(':status', $status, PDO::PARAM_STR);
        }
        $updateSmt->execute();
    }
}
