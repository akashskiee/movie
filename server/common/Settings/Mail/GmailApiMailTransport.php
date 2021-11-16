<?php

namespace Common\Settings\Mail;

use Illuminate\Mail\Transport\Transport;
use Swift_Mime_SimpleMessage;

class GmailApiMailTransport extends Transport
{

    public function send(Swift_Mime_SimpleMessage $message, &$failedRecipients = null)
    {
        $this->beforeSendPerformed($message);

        $response = app(GmailClient::class)->sendEmail($message->toString());

        dd('x');

        // TODO: check respone and see if can add gmail message id as a header, same as below
        // TODO: check if should use different user id

        // $userId = array_keys($message->getFrom())[0] ? array_keys($message->getFrom())[0] : 'me';

//        $messageId = $result->get('MessageId');
//
//        $message->getHeaders()->addTextHeader('X-Message-ID', $messageId);
//        $message->getHeaders()->addTextHeader('X-SES-Message-ID', $messageId);

        $this->sendPerformed($message);

        return $this->numberOfRecipients($message);
    }
}
