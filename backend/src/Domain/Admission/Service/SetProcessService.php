<?php


namespace App\Domain\Admission\Service;


use App\Domain\Admission\Repository\SetProcessRepository;
use App\Exception\ValidationException;

final class SetProcessService
{
    /**
     * @var SetProcessRepository
     */
    private $setProcessRepository;

    public function __construct(SetProcessRepository $setProcessRepository)
    {
        $this->setProcessRepository = $setProcessRepository;
    }

    /*
     * Academic info
     */
    public function fetchAcademicInfo(int $application_no): bool{
        return $this->setProcessRepository->fetchAcademicInfo($application_no);
    }

    public function checkAcademicInfo(array $academic_info): void{
        $errors = [];
        //Previous School Details   --- 3 inputs ---
        if (empty($academic_info['previous_school_name'])){
            $errors['previous_school_name'] = 'Please enter your previous school name';
        }
        if (empty($academic_info['year_of_madhyamik'])){
            $errors['year_of_madhyamik'] = 'Please enter your year of madhyamik';
        }
        if (empty($academic_info['previous_student_id'])){
            $errors['previous_student_id'] = 'Please enter your previous academic info';
        }

        //Previous academic marks    --- 9 inputs ---
        if (empty($academic_info['marks_beng'])){
            $errors['marks_beng'] = 'Please enter your marks in Bengali';
        }elseif (filter_var($academic_info['marks_beng'], FILTER_VALIDATE_INT) === false){
            $errors['marks_beng'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_engb'])){
            $errors['marks_engb'] = 'Please enter your marks in English';
        }elseif (filter_var($academic_info['marks_engb'], FILTER_VALIDATE_INT) === false){
            $errors['marks_engb'] = 'Please enter a valid marks';
        }
        if (empty($academic_info[''])){
            $errors['marks_maths'] = 'Please enter your marks in Mathematics';
        }elseif (filter_var($academic_info['marks_maths'], FILTER_VALIDATE_INT) === false){
            $errors['marks_maths'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_psc'])){
            $errors['marks_psc'] = 'Please enter your marks in Physical Science';
        }elseif (filter_var($academic_info['marks_psc'], FILTER_VALIDATE_INT) === false){
            $errors['marks_psc'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_lsc'])){
            $errors['marks_lsc'] = 'Please enter your marks in Life Science';
        }elseif (filter_var($academic_info['marks_lsc'], FILTER_VALIDATE_INT) === false){
            $errors['marks_lsc'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_geo'])){
            $errors['marks_geo'] = 'Please enter your marks in Geography';
        }elseif (filter_var($academic_info['marks_geo'], FILTER_VALIDATE_INT) === false){
            $errors['marks_geo'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_hist'])){
            $errors['marks_hist'] = 'Please enter your marks in History';
        }elseif (filter_var($academic_info['marks_hist'], FILTER_VALIDATE_INT) === false){
            $errors['marks_hist'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_total'])){
            $errors['marks_total'] = 'Please enter your total marks';
        }elseif (filter_var($academic_info['marks_total'], FILTER_VALIDATE_INT) === false){
            $errors['marks_total'] = 'Please enter a valid marks';
        }
        if (empty($academic_info['marks_percentage'])){
            $errors['marks_percentage'] = 'Please enter your percentage';
        }elseif (filter_var($academic_info['marks_percentage'], FILTER_VALIDATE_INT) === false){
            $errors['marks_percentage'] = 'Please enter a valid marks';
        }

        //Error checking
        if ($errors){
            throw new ValidationException('Please check your input', $errors);
        }
    }

    public function updateAcademicInfo(int $application_no, array $academic_info){
        $this->setProcessRepository->updateAcademicInfo($application_no, $academic_info);
    }

    public function setAcademicInfo(int $application_no, array $academic_info){
        $this->setProcessRepository->setAcademicInfo($application_no, $academic_info);
    }

    /*
     * Payment info
     */
    public function fetchPaymentInfo(int $application_no): bool{
        return $this->setProcessRepository->fetchPaymentInfo($application_no);
    }

    public function checkPaymentInfo(array $payment_info): void{
        $errors = [];
        if (empty($payment_info['mode_of_payment'])){
            $errors['mode_of_payment'] = 'Please enter the mode of payment';
        }
        if (empty($payment_info['name_of_bank'])){
            $errors['name_of_bank'] = 'Please enter the name of bank';
        }
        if (empty($payment_info['transaction_id'])){
            $errors['transaction_id'] = 'Please enter the transaction id';
        }
        if (empty($payment_info['transaction_date'])){
            $errors['transaction_date'] = 'Please enter the transaction date';
        }

        if ($errors){
            throw new ValidationException('Please check your input', $errors);
        }
    }

    public function updatePaymentInfo(int $application_no, array $payment_info){
        $this->setProcessRepository->updatePaymentInfo($application_no, $payment_info);
    }

    public function setPaymentInfo(int $application_no, array $payment_info){
        $this->setProcessRepository->setPaymentInfo($application_no, $payment_info);
    }

    /*
     * Personal info
     */
    public function fetchBasicInfo(int $application_no): bool{
        return $this->setProcessRepository->fetchBasicInfo($application_no);
    }

    public function checkBasicInfo(array $basic_info): array{
        $errors = [];

        if (empty($basic_info['gender'])){
            $errors['gender'] = 'Please enter your gender';
        }
        if (empty($basic_info['religion'])){
            $errors['religion'] = 'Please enter your religion';
        }
        if (empty($basic_info['caste'])){
            $errors['caste'] = 'Please enter your caste';
        }
        if (empty($basic_info['mother_tongue'])){
            $errors['mother_tongue'] = 'Please enter your mother tongue';
        }
        if (empty($basic_info['whatsapp_no'])){
            $errors['whatsapp_no'] = 'Please enter your whatsapp no';
        }
        if (empty($basic_info['father_name'])){
            $errors['father_name'] = 'Please enter your father name';
        }
        if (empty($basic_info['mother_name'])){
            $errors['mother_name'] = 'Please enter your mother name';
        }
        if (empty($basic_info['guardian_name'])){
            $errors['guardian_name'] = 'Please enter your guardian name';
        }
        if (empty($basic_info['guardian_occupation'])){
            $errors['guardian_occupation'] = 'Please enter your guardian occupation';
        }
        if (empty($basic_info['address_line_1'])){
            $errors['address_line_1'] = 'Please enter your address';
        }
        if (empty($basic_info['city'])){
            $errors['city'] = 'Please enter your city';
        }
        if (empty($basic_info['district'])){
            $errors['district'] = 'Please enter your district';
        }
        if (empty($basic_info['pin'])){
            $errors['pin'] = 'Please enter your pin';
        }elseif (filter_var($basic_info['pin'], FILTER_VALIDATE_INT) === false){
            $errors['pin'] = 'Please enter a valid pin';
        }
        if ($basic_info['apply_for_reserved_seat']){
            $basic_info['apply_for_reserved_seat'] = 1;
        }else{
            $basic_info['apply_for_reserved_seat'] = 0;
        }
        if ($basic_info['guardian_same_father']){
            $basic_info['guardian_same_father'] = 1;
        }else{
            $basic_info['guardian_same_father'] = 0;
        }

        //: TODO image validation

        if ($errors){
            throw new ValidationException('Please check your input', $errors);
        }else{
            return $basic_info;
        }


    }

    public function updateBasicInfo(int $application_no, array $personal_info){
        $this->setProcessRepository->updateBasicInfo($application_no, $personal_info);
    }

    public function setBasicInfo(int $application_no, array $personal_info){
        $this->setProcessRepository->setBasicInfo($application_no, $personal_info);
    }

    /*
     * Declaration info
     */
    public function checkDeclarationInfo(array $declaration_info){
        $errors = [];
        if (empty($declaration_info['date'])){
            $errors['date'] = 'Please enter a date';
        }
        if (empty($declaration_info['place'])){
            $errors['place'] = 'Please enter a place';
        }
        if (empty($declaration_info['full_name'])){
            $errors['full_name'] = 'Please enter a full name';
        }

        if ($errors){
            throw new ValidationException('Please check your input.', $errors);
        }
    }

    public function setDeclarationInfo(int $application_no, array $declaration_info){
        $this->setProcessRepository->setDeclarationInfo($application_no, $declaration_info);
    }
}