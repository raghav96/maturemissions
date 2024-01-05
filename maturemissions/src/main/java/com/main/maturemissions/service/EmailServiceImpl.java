package com.main.maturemissions.service;

import com.main.maturemissions.model.User;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


/**
 * This class handles sending emails using the JavaMailSender
 */
@Service
public class EmailServiceImpl implements EmailService{

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Sends email to user
     * @param user - user object
     * @param subject - subject of email
     * @param text - content of email
     */
    @Override
    public void sendEmail(User user, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }

}
