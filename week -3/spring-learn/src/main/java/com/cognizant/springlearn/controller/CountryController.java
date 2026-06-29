package com.cognizant.springlearn.controller;

import com.cognizant.springlearn.model.Country;
import com.cognizant.springlearn.service.CountryService;
import com.cognizant.springlearn.service.exception.CountryNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CountryController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CountryController.class);
    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    // Expose /countries list endpoint matching Security Config rules
    @GetMapping("/countries")
    public ResponseEntity<List<Country>> getAllCountries() {
        LOGGER.info("GET /countries execution started");
        List<Country> countries = countryService.getAllCountries();
        LOGGER.info("GET /countries execution ended");
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }

    // Expose case-insensitive lookup (supporting both /countries/{code} and /country/{code} endpoints)
    @GetMapping({"/countries/{code}", "/country/{code}"})
    public ResponseEntity<Country> getCountry(@PathVariable("code") String code) throws CountryNotFoundException {
        LOGGER.info("getCountry() execution started for code: {}", code);
        Country country = countryService.getCountry(code);
        LOGGER.info("getCountry() execution ended successfully");
        return new ResponseEntity<>(country, HttpStatus.OK);
    }
}
