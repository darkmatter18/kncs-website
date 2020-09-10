<?php
try {
    (require __DIR__ . '/../config/bootstrap.php')->run();
} catch (Throwable $exception){
    http_response_code(400);
    echo sprintf('Bad Request: %s', $exception->getMessage());
}
