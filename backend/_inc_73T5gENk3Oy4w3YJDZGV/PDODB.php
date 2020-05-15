<?php
    //IF there is no constant defined called _CONFIG_, do not load file
    if(defined('_incUse')){

        class PDODB{
            
            protected static $con;

            private function __construct(){

                $dsn = 'mysql:charset=utf8mb4;dbname='.$_SERVER['HTTP_MYSQL_DB_NAME'].';host='.$_SERVER['HTTP_MYSQL_DB_HOST'].';port=3306;';
                $user = $_SERVER['HTTP_MYSQL_DB_USER'];
                $pass = $_SERVER['HTTP_MYSQL_DB_PASS'];
                
                try {
                    self::$con = new PDO($dsn,$user,$pass);
                    self::$con->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
                    self::$con->setAttribute( PDO::ATTR_PERSISTENT, false );
                }
                catch (PDOException $e) {
                    echo "Could not connect to database.";
                    echo $e;
                    exit;
                }    
            }

            public static function getConnection() {
                //If this instance was not been started, start it.
                if (!self::$con) {
                    new PDODB();
                }

                //Return the writteable db connection
                return self::$con;
            }
        }
    }
    else {
        echo "Permission denided";
    }
