package com.employee.repository;

import com.employee.entity.Employee;
import com.employee.projection.EmployeeDto;
import com.employee.projection.EmployeeProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // ==========================================
    // Exercise 3: Derived Query Methods
    // ==========================================
    List<Employee> findByName(String name);
    Employee findByEmail(String email);
    List<Employee> findByDepartmentId(Long departmentId);
    List<Employee> findByNameStartingWith(String prefix);

    // ==========================================
    // Exercise 5: Custom Query Methods using @Query
    // ==========================================
    // Positional parameters
    @Query("SELECT e FROM Employee e WHERE e.department.name = ?1")
    List<Employee> findEmployeesByDeptName(String deptName);

    // Named parameters
    @Query("SELECT e FROM Employee e WHERE e.name = :name AND e.email = :email")
    List<Employee> findByNameAndEmail(@Param("name") String name, @Param("email") String email);

    // Native SQL Query
    @Query(value = "SELECT * FROM employees WHERE email LIKE %:suffix", nativeQuery = true)
    List<Employee> findByEmailSuffixNative(@Param("suffix") String suffix);

    // Exercise 5: Execution of Entity Named Query
    // Looks up "Employee.findByEmailDomain" declared in Employee entity class
    List<Employee> findByEmailDomain(@Param("domain") String domain);

    // ==========================================
    // Exercise 6: Pagination and Sorting
    // ==========================================
    // Derived query supporting pagination
    Page<Employee> findByDepartmentNameContaining(String deptName, Pageable pageable);

    // Custom JPQL query supporting pagination
    @Query("SELECT e FROM Employee e WHERE e.name LIKE %:keyword%")
    Page<Employee> searchByNameKeyword(@Param("keyword") String keyword, Pageable pageable);

    // ==========================================
    // Exercise 8: Projections
    // ==========================================
    // Interface-based projection
    List<EmployeeProjection> findProjectedByDepartmentName(String deptName);

    // Class-based projection (DTO) using Constructor Expression
    @Query("SELECT new com.employee.projection.EmployeeDto(e.name, e.email, e.department.name) " +
           "FROM Employee e WHERE e.department.id = :deptId")
    List<EmployeeDto> findEmployeeDtosByDeptId(@Param("deptId") Long deptId);
}
