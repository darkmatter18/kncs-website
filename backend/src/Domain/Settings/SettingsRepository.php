<?php


namespace App\Domain\Settings;


use PDO;

final class SettingsRepository
{
    /**
     * @var PDO
     */
    private $connection;

    public function __construct(PDO $PDO)
    {
        $this->connection = $PDO;
    }

    /**
     * Get all settings
     * @return array
     */
    public function getAllSettings(): array{
        $smt = $this->connection->prepare("SELECT setting_key, setting_value FROM website_setting");
        $smt->execute();
        return $smt->fetchAll(PDO::FETCH_ASSOC);
    }
}