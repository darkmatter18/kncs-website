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
            //Get application number
            $application_no = (string)$request->getAttribute('JwtClaims')['application_no'];

            //Get personal info
            $personal_info = $this->getServiceProcess->getPersonalInfo($application_no);

            //Return response
            if (sizeof($personal_info) === 0){
                return $response->withStatus(204, 'No personal found on your id');
            }
            $result = [
                'data' => $personal_info
            ];

            $response->getBody()->write((string)json_encode($result));
            return $response
                ->withHeader('Content-Type', 'application/json');

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}