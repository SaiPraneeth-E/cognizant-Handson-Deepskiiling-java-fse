package com.employee.service;

import com.employee.entity.Employee;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {

    @PersistenceContext
    private EntityManager entityManager;

    // Exercise 10: High-performance batch processing logic for bulk operations
    @Transactional
    public void saveEmployeesInBatch(List<Employee> employees) {
        int batchSize = 30; // Matches spring.jpa.properties.hibernate.jdbc.batch_size in application.properties
        for (int i = 0; i < employees.size(); i++) {
            entityManager.persist(employees.get(i));
            
            // Periodically flush and clear the hibernate session to release memory
            if (i > 0 && i % batchSize == 0) {
                entityManager.flush();
                entityManager.clear();
            }
        }
        // Flush and clear remaining entities
        entityManager.flush();
        entityManager.clear();
    }
}
