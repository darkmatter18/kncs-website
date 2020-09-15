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

    /**
     * Fetch academic info
     * @param int $application_no
     * @return array
     */
    public function getAcademicInfo(int $application_no): array{
        return $this->getProcessRepository->getAcademicInfo($application_no);
    }

    /**
     * Get declaration info
     * @param int $application_no
     * @return array
     */
    public function getDeclarationInfo(int $application_no): array{
        return $this->getProcessRepository->getDeclarationInfo($application_no);
    }

    /**
     * Get payment info
     * @param int $application_no
     * @return array
     */
    public function getPaymentInfo(int $application_no): array{
        return $this->getProcessRepository->getPaymentInfo($application_no);
    }

    /**
     * Get personal info
     * @param int $application_no
     * @return array
     */
    public function getPersonalInfo(int $application_no): array{
        return $this->getProcessRepository->getPersonalInfo($application_no);
    }
}