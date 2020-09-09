<?php


namespace App\Domain\Admission\Service;


use App\Domain\Admission\Repository\GetProcessRepository;
use App\Exception\NotFoundException;

final class GetProcessService
{
    /**
     * @var GetProcessRepository
     */
    private $getProcessRepository;

    public function __construct(GetProcessRepository $getProcessRepository)
    {
        $this->getProcessRepository = $getProcessRepository;
    }

    public function getAcademicInfo(int $application_no): array{
        return $this->getProcessRepository->getAcademicInfo($application_no);
    }

    public function getDeclarationInfo(int $application_no): array{
        return $this->getProcessRepository->getDeclarationInfo($application_no);
    }

    public function getPaymentInfo(int $application_no): array{
        return $this->getProcessRepository->getPaymentInfo($application_no);
    }

    public function getPersonalInfo(int $application_no): array{
        return $this->getProcessRepository->getPersonalInfo($application_no);
    }
}