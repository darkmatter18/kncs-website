<?php


namespace App\Domain\Admin\School\Service;


use App\Domain\Admin\School\Repository\SubjectRepository;
use App\Exception\AuthenticationException;
use App\Exception\NotFoundException;

final class SubjectService
{
    /**
     * @var SubjectRepository
     */
    private $subjectRepository;

    public function __construct(SubjectRepository $subjectRepository){
        $this->subjectRepository = $subjectRepository;
    }

    public function checkUser(string $userRole): void{
        $errors = [];
        if ($userRole != 'admin'){
            $errors = ['Unauthorized operation'];
        }

        if ($errors){
            throw new AuthenticationException($errors[0], $errors);
        }
    }

    public function checkSubjectId(string $subject_id): void{
        $errors = [];
        $subject = $this->subjectRepository->checkSubjectId($subject_id);
        if (!$subject){
            $errors = ["Subject doesn't exists"];
        }
        if ($errors){
            throw new NotFoundException($errors[0], $errors);
        }
    }

    public function getSubject(): array{
        $errors = [];
        $subjects = $this->subjectRepository->getSubject();
        if (empty($subjects)){
            $errors = ['No subjects found'];
        }

        if ($errors){
            throw new NotFoundException($errors[0], $errors);
        }else{
            return $subjects;
        }
    }

    public function createSubject(array $subject_details){
        $errors = [];
        if (empty($subject_details)){
            $errors['subject_details'] = 'Please enter subject name';
        }elseif (filter_var($subject_details, FILTER_VALIDATE_INT) === false){
            $errors['subject_details'] = 'Please enter a valid input';
        }

        if ($errors){
            throw new NotFoundException('Please check your input', $errors);
        }
        $this->subjectRepository->createSubject($subject_details);
    }

    public function updateSubject(array $new_subject_details, string $subject_id){

        $errors = [];

        //Checking if subject id is valid or not
        if (empty($subject_id)){
            $errors['subject_id'] = 'Please enter a subject ID';
        }elseif (filter_var($subject_id, FILTER_VALIDATE_INT) === false){
            $errors['subject_id'] = 'Please enter a valid input';
        }

        //Checking if new subject details is valid or not
        if (empty($new_subject_details)){
            $errors['subject_name'] = 'Please enter a subject name';
        }

        if ($errors){
            throw new NotFoundException('Please check your input', $errors);
        }

        $this->subjectRepository->updateSubject($new_subject_details, $subject_id);
    }

    public function deleteSubject(string $subject_id){
        $errors = [];
        if (empty($subject_id)){
            $errors = ['Subject ID is required to delete subject'];
        }
        if ($errors){
            throw new NotFoundException($errors[0], $errors);
        }
        $this->subjectRepository->deleteSubject($subject_id);
    }
}