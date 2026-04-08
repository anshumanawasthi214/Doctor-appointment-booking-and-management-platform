package com.spring.boot.doctor.booking.DTOs;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorReviewDto {
    private Long appointmentId;
    private Long patientId;
    private String patientName;
    private Integer rating;
    private String review;
    private LocalDateTime reviewedAt;
}
