package com.main.maturemissions.service;

import com.main.maturemissions.model.User;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * This service implementation is responsible for sending SMS messages via Twilio's API.
 * It utilizes the Twilio SDK's {@code Message} class to create and send a new message.
 */
@Service
public class SmsServiceImpl implements SmsService {

    /**
     * The phone number associated with the Twilio account, injected from application properties.
     */
    @Value("${twilio.phone_number}")
    private String twilioPhoneNumber;

    /**
     * Sends an SMS message to a specified user.
     * <p>
     * The method constructs a new {@code Message} instance using the Twilio SDK,
     * specifying the recipient's phone number, the Twilio phone number, and the message text.
     * </p>
     *
     * @param user    the user to whom the SMS will be sent. The user's phone number is obtained
     *                by invoking {@code user.getPhoneNumber()}.
     * @param message the text of the message to be sent.
     */
    @Override
    public void sendSms(User user, String message) {

        Message.creator(
                new PhoneNumber("+61" + user.getPhoneNumber().toString()),
                new PhoneNumber(twilioPhoneNumber),
                message
        ).create();

    }
}
