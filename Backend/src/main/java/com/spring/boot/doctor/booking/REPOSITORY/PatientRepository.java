package com.spring.boot.doctor.booking.REPOSITORY;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.boot.doctor.booking.ENTITY.Patient;
import com.spring.boot.doctor.booking.ENTITY.Users;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByUser(Users user);
}
