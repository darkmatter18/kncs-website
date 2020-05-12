<?php

function chechRecapta($re_response, $secret = "6LeehWIUAAAAAE83_TmuUYp8VaOY2uc2SXd2aOw9"){
    if(isset($re_response) && !empty($re_response)){
        $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$re_response.'&remoteip');
        $respone =  json_decode($verifyResponse); //Decode the json return obj
        if($respone->success){
            return true;
        }
    }
    return false;
}

function login($pdocon, $id, $password){
    //Check if admin already exist or not
    $smt_admin = $pdocon->prepare("SELECT id, password FROM admins WHERE id =:id LIMIT 1");
    $smt_admin->bindParam(':id', $id, PDO::PARAM_STR);
    $smt_admin->execute();
    if($smt_admin->rowCount() > 0){
        //Admin exists
        $admin_details  = $smt_admin->fetch(PDO::FETCH_ASSOC);
        $admin_id       = $admin_details['id'];
        $hashed         = $admin_details['password'];

        if(password_verify($password,$hashed)){
            return true;
        }
    return false;
}

if(true){

    define('_inc', true);
    require './../_inc_73T5gENk3Oy4w3YJDZGV/index.php';

    //return array
    $return = [];

    if(true){
        //If token matched

        //Always return Json format
        header('Content-Type: application/json');  

        //Request for recaptcha
            
        //if(chechRecapta($_POST['g_recaptcha_response'];)){
        if(true){
            //If not a robot(varified by captcha)

            $current_time = date("Y/M/d g:i:s A T P");
            $current_ip = get_client_ip();

            //Escaping variables
            $id_clean = Filter::String(clean($_POST['id']));
            $password_clean = Filter::String(clean($_POST['password']));


            if(login($pdocon, $id_clean, $password_clean)){
                //User get signed in

                setcookie("_u", hash('sha512', $_SERVER['HTTP_USER_AGENT'] . ' asdqwgfgabhg efaoyaffrgerhehe' .time() . '62n663nbsbrbyeby' . get_client_ip()), 0, "/", null, false, true);
                $return['status'] = true;
                $return['userid'] = $id_clean;
                $return['msg'] = 'Login Successfully';
            }
            else{
                //Invalid user email/password
                $return['msg'] = "Invalid User email/password";
                $return['status'] = false;
            }
        }
        else {
            $return['msg'] = "Capta failed";
            $return['status'] = false;
        }
    }
    else{
        $return['msg'] = "X-CSRF mismatched";
        $return['status']= false;
    }

    echo json_encode($return, JSON_PRETTY_PRINT);
    exit;
}
else {
    echo "Go POST";
}


?>