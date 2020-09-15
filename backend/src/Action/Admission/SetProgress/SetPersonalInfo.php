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
            $application_no = (string)$request->getAttribute('JwtClaims')['application_no'];

            //Verify inputs for personal info
            $this->setProcessService->checkPersonalInfoInputs($personal_info);
            print_r($this->setProcessService->isPersonalInfoExists($application_no));
            //Set or update personal info
//            if ($this->setProcessService->isPersonalInfoExists($application_no)){
//                $this->setProcessService->updateBasicInfo($application_no, $personal_info);
//            }else{
//                print_r('x');
//                $this->setProcessService->setBasicInfo($application_no, $personal_info);
//            }

            // On Successful Completion on the Request, server sends a 204 response without any body
            return $response->withStatus(204, "Submitted Successfully");

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }
    }
}