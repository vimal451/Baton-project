package com.stackroute.adminservice.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.stackroute.adminservice.service.AdminEntryService;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig  {

@Autowired
private UserDetailsService userDetailsService;


@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	 http.authorizeHttpRequests((auth)-> {
		try {
			(auth)
			     .requestMatchers("/api/register").permitAll()
			     .anyRequest().authenticated()
			     .and()
			 .formLogin()
			     .loginProcessingUrl("/api/login")
			     .permitAll()
			     .and()
			 .logout()
			     .logoutUrl("/api/logout")
			     .permitAll();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}).httpBasic(withDefaults());
	 
	 return http.build();
}
   

}