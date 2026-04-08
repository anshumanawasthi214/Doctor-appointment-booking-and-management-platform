package com.spring.boot.doctor.booking.SERVICE;

import com.spring.boot.doctor.booking.DTOs.RegisterUserRequest;
import com.spring.boot.doctor.booking.DTOs.ResponseUserDetails;
import com.spring.boot.doctor.booking.DTOs.PasswordResetRequest;

public interface UserService {
    ResponseUserDetails registerUser(RegisterUserRequest userRequest);
    ResponseUserDetails getUserDetailsByUsername(String username);
    String validateLoginCredentials(String username, String password);
    void resetPassword(PasswordResetRequest request);
	String deletePatientByUserId(Long userId);
	String deleteDoctorByUserId(Long userId);
	Object deleteAdminByUserId(Long userId);
}
