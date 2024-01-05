package com.main.maturemissions.configuration;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import com.twilio.Twilio;


/**
 * This class is to initialize the Twilio so that users can be contacted through email or sms
 */
@Configuration
public class TwilioInitialiser {

    @Value("${twilio.account_sid}")
    private String accountSid;

    @Value("${twilio.auth_token}")
    private String authToken;

    @PostConstruct
    public void init() {
        Twilio.init(accountSid, authToken);
    }
}
