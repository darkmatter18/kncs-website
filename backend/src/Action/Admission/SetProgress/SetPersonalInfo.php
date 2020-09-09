<?php


namespace App\Action\Admission\SetProgress;


use App\Domain\Admission\Service\SetProcessService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class SetPersonalInfo
{
    /**
     * @var SetProcessService
     */
    private $setProcessService;

    public function __construct(SetProcessService $setProcessService){
        $this->setProcessService = $setProcessService;
    }

    public function __invoke(ServerRequestInterface $request, ResponseInterface $response):ResponseInterface{
        try {
            //Get data from HTTP request
            $personal_info = (array)$request->getParsedBody();

            //Get application number
            $application_no = (int)$request->getAttribute('JwtClaims')['application_no'];

            //Check personal info data
            $personal_info = $this->setProcessService->checkBasicInfo($personal_info);

            //Set or update personal info
            if ($this->setProcessService->fetchBasicInfo($application_no)){
                $this->setProcessService->updateBasicInfo($application_no, $personal_info);
            }else{
                $this->setProcessService->setBasicInfo($application_no, $personal_info);
            }



        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}