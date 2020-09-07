<?php


namespace App\Action\Admission\GetProgress;


use App\Domain\Admission\Service\GetProcessService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetAcademicInfo
{
    /**
     * @var GetProcessService
     */
    private $getProcessService;

    public function __construct(GetProcessService $getProcessService){
        $this->getProcessService = $getProcessService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response):ResponseInterface{

    }
}