<?php


namespace App\Action\Admission\SetProgress;


use App\Domain\Admission\Service\SetProcessService;
use Exception;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class SetAcademicInfo
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
            $academic_info = (array)$request->getParsedBody();

            //Get application number
            $application_no = (string)$request->getAttribute('JwtClaims')['application_no'];


            //Verify the inputs for Academic info
            $this->setProcessService->checkAcademicInfoInputs($academic_info);

            //Update or set academic info
            if ($this->setProcessService->isAcademicInfoExists($application_no)){
                $this->setProcessService->updateAcademicInfo($application_no, $academic_info);
            }else{
                $this->setProcessService->setAcademicInfo($application_no, $academic_info);
            }

            // On Successful Completion on the Request, server sends a 204 response without any body
            return $response->withStatus(204, "Submitted Successfully");

        }catch (Exception $e){
            return $response->withStatus($e->getCode(), $e->getMessage());
        }

    }
}