package com.main.maturemissions.service;

import com.main.maturemissions.model.User;

public interface SmsService {

    public void sendSms(User user, String message);
}
