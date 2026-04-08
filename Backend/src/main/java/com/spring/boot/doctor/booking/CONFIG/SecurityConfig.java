package com.spring.boot.doctor.booking.CONFIG;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.spring.boot.doctor.booking.FILTER.JWTAuthFilter;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Autowired
	private  UserDetailsService userDetailsService;
	
	@Autowired
	JWTAuthFilter jwtFilter;

	@Bean 
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
		.cors(Customizer.withDefaults())
		.csrf(csrf -> csrf.disable()) 
        .authorizeHttpRequests(auth -> auth
        	.requestMatchers("/error", "/v3/api-docs/**",
        		    "/swagger-ui/**",
        		    "/swagger-ui.html",
        		    "/authenticate",
        		    "/user/authenticate",
        		    "/user/register/doctor",
        		    "/user/register/patient",
        		    "/user/register/admin",
        		    "/user/check",
        		    "/api/doctors/search",
        		    "/api/doctors/get/*")
        	.permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .requestMatchers("/api/doctors/**").hasRole("DOCTOR")
            .requestMatchers("/api/patient/**").hasRole("PATIENT")
            .requestMatchers("/api/patients/**").hasRole("PATIENT")
            .requestMatchers("/api/documents/**").hasRole("PATIENT")
            .requestMatchers("/user/logout").authenticated()
            .anyRequest().authenticated()
        )
        .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		http.addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);
	    return http.build();
	}	

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of(
			"http://localhost:5173",
			"http://127.0.0.1:5173",
			"http://localhost:4173",
			"http://127.0.0.1:4173"
		));
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	 public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
		
	    AuthenticationManagerBuilder builder = http.getSharedObject(AuthenticationManagerBuilder.class);
	    builder.userDetailsService(userDetailsService)
	           .passwordEncoder(passwordEncoder());
	    return builder.build();
    }
	

}

