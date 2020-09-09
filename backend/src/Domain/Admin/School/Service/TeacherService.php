<?php


namespace App\Domain\Admin\School\Service;


use App\Domain\Admin\School\Repository\TeacherRepository;

class TeacherService
{
    /**
     * @var TeacherRepository
     */
    private $teacherRepository;

    public function __construct(TeacherRepository $teacherRepository)
    {
        $this->teacherRepository = $teacherRepository;
    }
}