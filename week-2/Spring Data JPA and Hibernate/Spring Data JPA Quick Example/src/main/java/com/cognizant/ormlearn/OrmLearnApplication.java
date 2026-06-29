package com.cognizant.ormlearn;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.service.CountryService;
import com.cognizant.ormlearn.service.exception.CountryNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.List;

@SpringBootApplication
public class OrmLearnApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrmLearnApplication.class);
    private static CountryService countryService;

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(OrmLearnApplication.class, args);
        countryService = context.getBean(CountryService.class);
        LOGGER.info("Inside main");

        // Execute tests
        testGetAllCountries();
        getAllCountriesTest();
        testAddCountry();
        testUpdateCountry();
        testDeleteCountry();
        testSearchCountries();
    }

    // Hands on 1: Test getting all countries
    private static void testGetAllCountries() {
        LOGGER.info("Start testGetAllCountries");
        List<Country> countries = countryService.getAllCountries();
        LOGGER.debug("countries={}", countries);
        LOGGER.info("End testGetAllCountries");
    }

    // Hands on 6: Find country by code "IN"
    private static void getAllCountriesTest() {
        LOGGER.info("Start getAllCountriesTest");
        try {
            Country country = countryService.findCountryByCode("IN");
            LOGGER.debug("Country IN fetched: {}", country);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Country not found: {}", e.getMessage());
        }
        LOGGER.info("End getAllCountriesTest");
    }

    // Hands on 7: Add a country and verify
    private static void testAddCountry() {
        LOGGER.info("Start testAddCountry");
        Country zz = new Country("ZZ", "Test Country ZZ");
        try {
            // Save country
            countryService.addCountry(zz);
            // Verify
            Country fetched = countryService.findCountryByCode("ZZ");
            LOGGER.debug("Successfully added: {}", fetched);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Error adding or verifying: {}", e.getMessage());
        }
        LOGGER.info("End testAddCountry");
    }

    // Hands on 8: Update a country name and verify
    private static void testUpdateCountry() {
        LOGGER.info("Start testUpdateCountry");
        try {
            countryService.updateCountry("ZZ", "Updated Test Country ZZ");
            Country fetched = countryService.findCountryByCode("ZZ");
            LOGGER.debug("Successfully updated: {}", fetched);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Error updating or verifying: {}", e.getMessage());
        }
        LOGGER.info("End testUpdateCountry");
    }

    // Hands on 9: Delete a country and verify
    private static void testDeleteCountry() {
        LOGGER.info("Start testDeleteCountry");
        countryService.deleteCountry("ZZ");
        try {
            // Should throw exception
            Country fetched = countryService.findCountryByCode("ZZ");
            LOGGER.error("Delete failed! Still found country: {}", fetched);
        } catch (CountryNotFoundException e) {
            LOGGER.debug("Successfully deleted country ZZ. Verification exception: {}", e.getMessage());
        }
        LOGGER.info("End testDeleteCountry");
    }

    // Hands on 5: Search country by partial name
    private static void testSearchCountries() {
        LOGGER.info("Start testSearchCountries");
        List<Country> search1 = countryService.findCountriesByName("In");
        LOGGER.debug("Search results for 'In': {}", search1);
        
        List<Country> search2 = countryService.findCountriesByName("united");
        LOGGER.debug("Search results for 'united': {}", search2);
        LOGGER.info("End testSearchCountries");
    }
}
