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
        $this->classRepository->createClass($class_details);
    }

    public function deleteClass(string $class_id){
        $this->classRepository->deleteClass($class_id);
    }

    public function updateClass(array $new_class_details, string $class_id){
        $this->classRepository->updateClass($new_class_details, $class_id);
    }
}