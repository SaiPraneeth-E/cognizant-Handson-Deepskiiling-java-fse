package com.cognizant.springlearn.service;

import com.cognizant.springlearn.model.Country;
import com.cognizant.springlearn.service.exception.CountryNotFoundException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    private final List<Country> countriesList;

    @SuppressWarnings("unchecked")
    public CountryService() {
        // Load the Spring XML application context to extract country beans (Hands on 4/5 integration)
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        this.countriesList = (List<Country>) context.getBean("countriesList", List.class);
    }

    // Get country by code with case-insensitive stream lookup
    public Country getCountry(String code) throws CountryNotFoundException {
        return countriesList.stream()
                .filter(c -> c.getCode().equalsIgnoreCase(code))
                .findFirst()
                .orElseThrow(() -> new CountryNotFoundException("Country not found for code: " + code));
    }

    // Expose full list if needed
    public List<Country> getAllCountries() {
        return this.countriesList;
    }
}
