package com.spring.boot.doctor.booking.DTOs;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorPatientCaseDto {
    private Long appointmentId;
    private Long patientId;
    private String patientName;
    private String patientEmail;
    private String patientPhone;
    private String patientAddress;
    private LocalDate dateOfBirth;
    private String gender;
    private String emergencyContact;
    private String medicalHistory;
    private String bloodGroup;
    private String allergies;
    private LocalDateTime scheduledDateTime;
    private String type;
    private String status;
    private String notes;
    private List<MedicalDocumentResponseDto> documents;
}
