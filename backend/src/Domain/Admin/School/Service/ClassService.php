<?php


namespace App\Domain\Admin\School\Service;


use App\Domain\Admin\School\Repository\ClassRepository;
use App\Exception\AuthenticationException;

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
        $this->classRepository->checkClassId($class_id);
    }

    public function getClasses(): array{
        return (array)$this->classRepository->getClasses();
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