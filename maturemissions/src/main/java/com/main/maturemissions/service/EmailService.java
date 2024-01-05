package com.main.maturemissions.service;

import com.main.maturemissions.model.User;

public interface EmailService {

    public void sendEmail(User user, String subject, String text);

}
