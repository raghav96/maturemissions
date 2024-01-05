package com.main.maturemissions.model.pojo;

import java.sql.Date;
import java.sql.Timestamp;

public class BookServicePojo {

    private Long userId;
    private Long serviceId;
    private Date date;
    private Timestamp times;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Timestamp getTimes() {
        return times;
    }

    public void setTimes(Timestamp times) {
        this.times = times;
    }
}
