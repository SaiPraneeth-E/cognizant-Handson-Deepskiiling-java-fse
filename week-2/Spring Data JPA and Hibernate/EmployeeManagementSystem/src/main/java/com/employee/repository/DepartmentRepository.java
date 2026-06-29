package com.employee.repository;

import com.employee.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    
    // Derived query to find department by exact name match
    Optional<Department> findByName(String name);
}
