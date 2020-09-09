<?php


namespace App\Action\Admin\School\Teacher;


use App\Domain\Admin\School\Service\TeacherService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetTeacherAction
{
    /**
     * @var TeacherService
     */
    private $teacherService;

    public function __construct(TeacherService $teacherService)
    {
        $this->teacherService = $teacherService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response)
    {
        // TODO: Implement __invoke() method.
    }
}