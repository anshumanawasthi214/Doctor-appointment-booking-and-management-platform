package com.spring.boot.doctor.booking.DTOs;

import lombok.Data;

@Data
public class AppointmentReviewRequestDto {
    private Integer rating;
    private String review;
}
