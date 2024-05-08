package com.stackroute.userservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "newDb")
@Data
@Entity
@NoArgsConstructor
public class User {

    @Id
    @Column(name = "email", length = 128)
    private String emailId;
    @Column(name = "password", length = 128)
    private String password;
    @Column(name = "username", length = 128, unique = true)
    private String userName;
    @Column(name = "mobileNumber", length = 128)
    private String mobileNumber;
    @Column(name = "location", length = 128)
    private String location;

    public User(String emailId, String password, String userName, String mobileNumber, String location) {
        this.emailId = emailId;
        this.password = password;
        this.userName = userName;
        this.mobileNumber = mobileNumber;
        this.location = location;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "User{" +
                "emailId='" + emailId + '\'' +
                ", password='" + password + '\'' +
                ", userName='" + userName + '\'' +
                ", mobileNumber='" + mobileNumber + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}