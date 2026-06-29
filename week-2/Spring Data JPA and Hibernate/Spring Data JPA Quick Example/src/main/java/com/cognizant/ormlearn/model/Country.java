package com.cognizant.ormlearn.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "country")
public class Country {

    @Id
    // Maps to co_code in the country database table
    @Column(name = "co_code", length = 2, nullable = false)
    private String code;

    // Maps to co_name in the country database table
    @Column(name = "co_name", length = 50, nullable = false)
    private String name;

    // Default constructor
    public Country() {}

    // Constructor with parameters
    public Country(String code, String name) {
        this.code = code;
        this.name = name;
    }

    // Getters and Setters
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // toString() method
    @Override
    public String toString() {
        return "Country[code=" + code + ", name=" + name + "]";
    }
}
