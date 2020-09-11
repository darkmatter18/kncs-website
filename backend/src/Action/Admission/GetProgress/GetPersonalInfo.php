<?php


namespace App\Action\Admission\GetProgress;


use App\Domain\Admission\Service\GetProcessService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class GetPersonalInfo{
    /**
     * @var GetProcessService
     */
    private $getServiceProcess;

    public function __construct(GetProcessService $getProcessService){
        $this->getServiceProcess = $getProcessService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response):ResponseInterface{
        try {
            $application_no = $request->getAttribute('JwtClaims')['application_no'];
            $personal_info = $this->getServiceProcess->getPersonalInfo($application_no);
        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}