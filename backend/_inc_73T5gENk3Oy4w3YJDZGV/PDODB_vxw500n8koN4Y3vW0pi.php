<?php
    //IF there is no constant defined called _CONFIG_, do not load file
    if(defined('_CON1swys135em856uv346_')){

        class PDODB_vxw500n8koN4Y3vW0pi{
            
            protected static $con;

            private function __construct($dsn,$user,$pass){

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

            public static function getConnection($dsn, $user, $pass) {

                //If this instance was not been started, start it.
                if (!self::$con) {
                    
                    // $dsn = 'mysql:charset=utf8mb4;dbname='.DB_NAME.';host='.DB_HOST.';port=3306;';
                    // $user = DB_USER;
                    // $pass = DB_PASSWORD;

                    new PDODB($dsn, $user, $pass);
                }

                //Return the writteable db connection
                return self::$con;
            }
        }
    }
    else {
        echo "Permission denided";
    }
