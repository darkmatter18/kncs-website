<?php


namespace App\Domain\Admin\School\Service;


use App\Domain\Admin\School\Repository\ClassRepository;
use App\Exception\AuthenticationException;
use App\Exception\NotFoundException;

final class ClassService{
    /**
     * @var ClassRepository
     */
    private $classRepository;

    public function __construct(ClassRepository $classRepository){
        $this->classRepository = $classRepository;
    }

    public function checkUser(string $user_role): void{
        $errors = [];
        if($user_role != 'admin'){
            $errors = ['Unauthorized operation'];
        }

        if($errors){
            throw new AuthenticationException("Permission not granted.");
        }
    }

    public function checkClassId(string $class_id): void{
        $errors = [];
        $class = $this->classRepository->checkClassId($class_id);

        if($class){
            $errors = ["Class doesn't exists."];
        }

        if($errors){
            throw new NotFoundException($errors[0], $errors);
        }

    }

    public function getClasses(): array{
        $errors = [];
        $class = $this->classRepository->getClasses();

        if(!$class){
            $errors = ["No classes found."];
        }

        if($errors){
            throw new NotFoundException($errors[0], $errors);
        }else{
            return $class;
        }

    }

    public function createClass(array $class_details){
        $errors = [];
        if (empty($class_details['standard'])){
            $errors['standard'] = 'Please enter standard name';
        }elseif (filter_var($class_details['standard'], FILTER_VALIDATE_INT) === false){
            $errors['standard'] = 'Please enter a valid input';
        }
        if (empty($class_details['section'])){
            $errors['section'] = 'Please enter a section';
        }

        if ($errors){
            throw new NotFoundException('Please check your input', $errors);
        }
        $this->classRepository->createClass($class_details);
    }

    public function deleteClass(string $class_id){
        $this->classRepository->deleteClass($class_id);
    }

    public function updateClass(array $new_class_details, string $class_id){
        $errors = [];

        //Checking if class id is valid or not
        if (empty($class_id)){
            $errors['class_id'] = 'Please enter a class id';
        }elseif (filter_var($class_id, FILTER_VALIDATE_INT) === false){
            $errors['class_id'] = 'Please enter a valid class id';
        }

        //Checking if new class details is valid or not
        if (empty($new_class_details['standard'])){
            $errors['standard'] = 'Please enter standard name';
        }elseif (filter_var($new_class_details['standard'], FILTER_VALIDATE_INT) === false){
            $errors['standard'] = 'Please enter a valid input';
        }
        if (empty($new_class_details['section'])){
            $errors['section'] = 'Please enter a section';
        }

        if ($errors){
            throw new NotFoundException('Please check your input', $errors);
        }
        $this->classRepository->createClass($new_class_details);
    }
}