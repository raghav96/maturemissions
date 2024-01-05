package com.main.maturemissions.model.pojo;

public class EmailPojo {

    private long userId;
    private String subject;
    private String message;

    public EmailPojo(long userId, String subject, String message) {
        this.userId = userId;
        this.subject = subject;
        this.message = message;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
