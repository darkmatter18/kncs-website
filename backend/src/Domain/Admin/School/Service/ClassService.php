<?php


namespace App\Domain\Admin\School\Service;


use App\Domain\Admin\School\Repository\ClassRepository;
use App\Exception\AuthenticationException;
use App\Exception\NotFoundException;
use App\Exception\ValidationException;

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

    public function checkInput(array $class_details): void{
        $errors = [];
        if (empty($class_details['standard'])){
            $errors['standard'] = 'Please enter a standard name';
        }elseif (filter_var($class_details['standard'], FILTER_VALIDATE_INT) === false){
            $errors['standard'] = 'Please enter a valid input';
        }
        if (empty($class_details['section'])){
            $errors['section'] = 'Please enter a section';
        }

        if ($errors){
            throw new ValidationException('Please check your input', $errors);
        }
    }

    public function getClasses(): array{
        return $this->classRepository->getClasses();
    }

    public function createClass(array $class_details): void{
        $this->classRepository->createClass($class_details);
    }

    public function deleteClass(string $class_id): void{
        $this->classRepository->deleteClass($class_id);
    }

    public function updateClass(array $new_class_details, string $class_id): void{
        $this->classRepository->updateClass($new_class_details, $class_id);
    }
}