package com.employee;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

// Exclude DataSourceAutoConfiguration to allow our custom Primary and Secondary DataSources to configure and run without conflict.
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class EmployeeManagementSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(EmployeeManagementSystemApplication.class, args);
    }
}
