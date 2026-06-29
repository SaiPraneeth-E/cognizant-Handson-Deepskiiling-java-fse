package com.cognizant.springlearn.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Country {

    private static final Logger LOGGER = LoggerFactory.getLogger(Country.class);
    private String code;
    private String name;

    // No-arg constructor with requested log statement
    public Country() {
        LOGGER.debug("Inside Country Constructor.");
    }

    public Country(String code, String name) {
        LOGGER.debug("Inside Country Parameterized Constructor: {} - {}", code, name);
        this.code = code;
        this.name = name;
    }

    // Getters and Setters with debug logs
    public String getCode() {
        LOGGER.debug("Country: getCode() invoked. Value: {}", this.code);
        return code;
    }

    public void setCode(String code) {
        LOGGER.debug("Country: setCode() invoked. Setting value to: {}", code);
        this.code = code;
    }

    public String getName() {
        LOGGER.debug("Country: getName() invoked. Value: {}", this.name);
        return name;
    }

    public void setName(String name) {
        LOGGER.debug("Country: setName() invoked. Setting value to: {}", name);
        this.name = name;
    }

    @Override
    public String toString() {
        return "Country [code=" + code + ", name=" + name + "]";
    }
}
