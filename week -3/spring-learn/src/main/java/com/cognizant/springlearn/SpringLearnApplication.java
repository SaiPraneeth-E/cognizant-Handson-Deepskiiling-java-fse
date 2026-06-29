package com.cognizant.springlearn;

import com.cognizant.springlearn.model.Country;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

@SpringBootApplication
public class SpringLearnApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(SpringLearnApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SpringLearnApplication.class, args);
        LOGGER.info("Inside main");

        // Invoke XML loading demonstration test method (Hands on 4)
        displayCountry();
    }

    // Method to read country bean from Spring XML configuration and log details
    public static void displayCountry() {
        LOGGER.info("displayCountry() execution started");
        
        ApplicationContext context = new ClassPathXmlApplicationContext("country.xml");
        Country country = context.getBean("country", Country.class);
        
        LOGGER.debug("Country: {}", country.toString());
        LOGGER.info("displayCountry() execution ended");
    }
}
