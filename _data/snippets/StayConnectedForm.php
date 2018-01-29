id: 2
source: 1
name: StayConnectedForm
properties: 'a:0:{}'

-----

if ( isset($_POST['signup_form_csrf']) ) {
	$path = MODX_CORE_PATH . 'components/signups/';
	$result = $modx->addPackage('signups',$path . 'model/','pyxl_');
	
	if (! $result) {
		$status = "error";
		$message = "Sorry, we could not process your request.";
		return json_encode(compact('status', 'message'));
	}

	if ( filter_var( $_POST['email'], FILTER_VALIDATE_EMAIL ) === FALSE ) {
		$status = "error";
		$message = "Please enter a valid email address.";
		return json_encode(compact('status', 'message'));
	}

	$signup = $modx->getObject('Signups', array('email'=>$_POST['email']));

	if (!empty($signup)) {
		$status = "error";
		$message = "That email address has already signed up.";
		return json_encode(compact('status', 'message'));
	}

	$fields = array(
        'email' => $_POST['email']
    );

    $signup = $modx->newObject('Signups', $fields);

    if ( $signup->save()) {
    	$status = "success";
		$message = "Thank you for signing up";

		$modx->getService('mail', 'mail.modPHPMailer');
		$modx->mail->set(modMail::MAIL_BODY, 'There has been a new signup on Big Ears : ' . $_POST['email']);
		$modx->mail->set(modMail::MAIL_FROM, 'mikeaperna@gmail.com');
		$modx->mail->set(modMail::MAIL_FROM_NAME, 'Big Ears');
		$modx->mail->set(modMail::MAIL_SENDER, 'mikeaperna@gmail.com');
		$modx->mail->set(modMail::MAIL_SUBJECT, 'New Big Ears Signup');
		$modx->mail->address('to', 'jmills@thinkpyxl.com', 'Jerod');
		$modx->mail->address('reply-to', 'no-reply@domain.com');
		$modx->mail->setHTML(true);

		if ($modx->mail->send()) {
			$message .= "!";
		}
		else {
			$message .= ".";
		}

    } else {
    	$status = "error";
		$message = "There was a problem while signing you up.";
    }
    
}
return json_encode(compact('status', 'message'));