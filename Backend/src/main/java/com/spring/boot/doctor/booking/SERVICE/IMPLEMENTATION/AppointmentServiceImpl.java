package com.spring.boot.doctor.booking.SERVICE.IMPLEMENTATION;

import com.spring.boot.doctor.booking.DTOs.AppointmentReviewRequestDto;
import com.spring.boot.doctor.booking.DTOs.AppointmentRequestDto;
import com.spring.boot.doctor.booking.DTOs.AppointmentResponseDto;
import com.spring.boot.doctor.booking.ENTITY.Appointment;
import com.spring.boot.doctor.booking.ENTITY.Doctor;
import com.spring.boot.doctor.booking.ENTITY.Patient;
import com.spring.boot.doctor.booking.ENTITY.Users;
import com.spring.boot.doctor.booking.REPOSITORY.AppointmentRepository;
import com.spring.boot.doctor.booking.REPOSITORY.DoctorRepository;
import com.spring.boot.doctor.booking.REPOSITORY.PatientRepository;
import com.spring.boot.doctor.booking.REPOSITORY.UsersRepository;
import com.spring.boot.doctor.booking.SERVICE.AppointmentService;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired private AppointmentRepository appointmentRepository;
    @Autowired private DoctorRepository doctorRepository;
    @Autowired private PatientRepository patientRepository;
    @Autowired private UsersRepository usersRepository;

    @Override
    public AppointmentResponseDto bookAppointment(AppointmentRequestDto dto, Long patientUserId) {
        Users doctor = usersRepository.findById(dto.getDoctorId())
            .orElseThrow(() -> new EntityNotFoundException("Doctor not found: " + dto.getDoctorId()));
        if (doctor.getDoctor().getStatus() != Doctor.Status.APPROVED) {
            throw new IllegalStateException("Doctor not approved");
        }
        Users patientUser = usersRepository.findById(patientUserId)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + patientUserId));
        Patient patient = patientRepository.findByUser(patientUser)
            .orElseThrow(() -> new EntityNotFoundException("Patient profile not found"));

        Appointment appt = new Appointment();
        appt.setDoctor(doctor.getDoctor());
        appt.setPatient(patient);
        appt.setScheduledDateTime(dto.getScheduledDateTime());
        appt.setType(Appointment.Type.valueOf(dto.getType().toUpperCase()));
        appt.setStatus(Appointment.Status.PENDING);

        Appointment saved = appointmentRepository.save(appt);
        return mapToDto(saved);
    }

    @Override
    public AppointmentResponseDto getAppointmentById(Long appointmentId, Long patientUserId) {
        Appointment appt = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new EntityNotFoundException("Appointment not found: " + appointmentId));
        if (!appt.getPatient().getUser().getId().equals(patientUserId)) {
            throw new SecurityException("Not authorized");
        }
        return mapToDto(appt);
    }

    @Override
    public List<AppointmentResponseDto> getAppointmentsByPatient(Long patientUserId) {
        Users u = usersRepository.findById(patientUserId)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + patientUserId));
        Patient patient = patientRepository.findByUser(u)
            .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        return appointmentRepository.findByPatient(patient)
            .stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
    }

    @Override
    public AppointmentResponseDto updateAppointment(Long appointmentId, AppointmentRequestDto dto, Long patientUserId) {
        Appointment appt = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));
        if (!appt.getPatient().getUser().getId().equals(patientUserId)) {
            throw new SecurityException("Not authorized"+patientUserId);
        }
        if (dto.getScheduledDateTime() != null) appt.setScheduledDateTime(dto.getScheduledDateTime());
        if (dto.getType() != null) appt.setType(Appointment.Type.valueOf(dto.getType().toUpperCase()));
        return mapToDto(appointmentRepository.save(appt));
    }

    @Override
    public void cancelAppointment(Long appointmentId, Long patientUserId) {
        Appointment appt = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));
        if (!appt.getPatient().getUser().getId().equals(patientUserId)) {
            throw new SecurityException("Not authorized");
        }
        appt.setStatus(Appointment.Status.CANCELLED);
        appointmentRepository.save(appt);
    }

    @Override
    public String changeAppointmentStatus(Long appointmentId, Appointment.Status status) {
        Appointment appt = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));
        appt.setStatus(status);
        appointmentRepository.save(appt);
        return "Status updated";
    }

    @Override
    public AppointmentResponseDto reviewAppointment(Long appointmentId, AppointmentReviewRequestDto dto, Long patientUserId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
            .orElseThrow(() -> new EntityNotFoundException("Appointment not found"));

        if (!appointment.getPatient().getUser().getId().equals(patientUserId)) {
            throw new SecurityException("Not authorized");
        }

        if (appointment.getStatus() != Appointment.Status.COMPLETED) {
            throw new IllegalStateException("You can review a doctor only after a completed consultation");
        }

        if (appointment.getPatientRating() != null) {
            throw new IllegalStateException("A review has already been submitted for this appointment");
        }

        Integer rating = dto != null ? dto.getRating() : null;
        if (rating == null || rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        appointment.setPatientRating(rating);
        appointment.setPatientReview(dto.getReview());
        appointment.setReviewedAt(LocalDateTime.now());

        Appointment savedAppointment = appointmentRepository.save(appointment);

        Doctor doctor = savedAppointment.getDoctor();
        List<Appointment> reviewedAppointments = appointmentRepository.findByDoctorAndPatientRatingIsNotNull(doctor);
        double averageRating = reviewedAppointments.stream()
            .map(Appointment::getPatientRating)
            .mapToInt(Integer::intValue)
            .average()
            .orElse(0.0);
        doctor.setRatings(averageRating);
        doctorRepository.save(doctor);

        return mapToDto(savedAppointment);
    }

    private AppointmentResponseDto mapToDto(Appointment a) {
        return AppointmentResponseDto.builder()
            .appointmentId(a.getId())
            .patientId(a.getPatient().getId())
            .patientName(a.getPatient().getName())
            .scheduledDateTime(a.getScheduledDateTime())
            .type(a.getType().name())
            .status(a.getStatus().name())
            .notes(a.getNotes())
            .patientRating(a.getPatientRating())
            .patientReview(a.getPatientReview())
            .reviewedAt(a.getReviewedAt())
            .build();
    }
}
