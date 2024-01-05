package com.main.maturemissions.model.pojo;

import java.sql.Date;

public class CheckSubscriptionPojo {

    private Long userId;

    private Date date;

    public CheckSubscriptionPojo() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
