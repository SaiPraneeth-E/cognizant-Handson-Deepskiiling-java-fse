package com.cognizant.ormlearn.service;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.repository.CountryRepository;
import com.cognizant.ormlearn.service.exception.CountryNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    private final CountryRepository countryRepository;

    @Autowired
    public CountryService(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    // Hands on 1: Retrieve all countries
    @Transactional(readOnly = true)
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    // Hands on 6: Find country by country code, throw exception if missing
    @Transactional(readOnly = true)
    public Country findCountryByCode(String countryCode) throws CountryNotFoundException {
        Optional<Country> result = countryRepository.findById(countryCode);
        if (!result.isPresent()) {
            throw new CountryNotFoundException("Country with code '" + countryCode + "' not found.");
        }
        return result.get();
    }

    // Hands on 7: Add a new country record
    @Transactional
    public void addCountry(Country country) {
        countryRepository.save(country);
    }

    // Hands on 8: Update name of an existing country by code
    @Transactional
    public void updateCountry(String code, String name) throws CountryNotFoundException {
        Optional<Country> result = countryRepository.findById(code);
        if (!result.isPresent()) {
            throw new CountryNotFoundException("Country with code '" + code + "' cannot be updated because it does not exist.");
        }
        Country country = result.get();
        country.setName(name);
        countryRepository.save(country);
    }

    // Hands on 9: Delete an existing country by code
    @Transactional
    public void deleteCountry(String code) {
        countryRepository.deleteById(code);
    }

    // Hands on 5: Find matching countries by partial name
    @Transactional(readOnly = true)
    public List<Country> findCountriesByName(String name) {
        return countryRepository.findByNameContaining(name);
    }
}
