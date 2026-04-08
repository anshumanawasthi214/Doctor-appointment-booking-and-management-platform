package com.spring.boot.doctor.booking.DTOs;

import lombok.Data;

@Data
public class PasswordResetRequest {
    private String username;
    private String newPassword;
}
