package com.employee.controller;

import com.employee.entity.Department;
import com.employee.entity.Employee;
import com.employee.projection.EmployeeDto;
import com.employee.projection.EmployeeProjection;
import com.employee.repository.DepartmentRepository;
import com.employee.repository.EmployeeRepository;
import com.employee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeRepository employeeRepository, 
                              DepartmentRepository departmentRepository,
                              EmployeeService employeeService) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.employeeService = employeeService;
    }

    // ==========================================
    // Exercise 4: CRUD Operations
    // ==========================================
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        // Ensure department exists
        if (employee.getDepartment() == null || employee.getDepartment().getId() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<Department> dept = departmentRepository.findById(employee.getDepartment().getId());
        if (!dept.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        employee.setDepartment(dept.get());
        Employee saved = employeeRepository.save(employee);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return new ResponseEntity<>(employeeRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id)
                .map(employee -> new ResponseEntity<>(employee, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee details) {
        return employeeRepository.findById(id)
                .map(existing -> {
                    existing.setName(details.getName());
                    existing.setEmail(details.getEmail());
                    if (details.getDepartment() != null && details.getDepartment().getId() != null) {
                        departmentRepository.findById(details.getDepartment().getId())
                                .ifPresent(existing::setDepartment);
                    }
                    Employee updated = employeeRepository.save(existing);
                    return new ResponseEntity<>(updated, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable Long id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // ==========================================
    // Exercise 5: Custom Query Methods
    // ==========================================
    @GetMapping("/search/dept")
    public ResponseEntity<List<Employee>> getByDeptName(@RequestParam String name) {
        return new ResponseEntity<>(employeeRepository.findEmployeesByDeptName(name), HttpStatus.OK);
    }

    @GetMapping("/search/domain")
    public ResponseEntity<List<Employee>> getByEmailDomain(@RequestParam String domain) {
        // Example search format: "%" + domain
        return new ResponseEntity<>(employeeRepository.findByEmailDomain("%" + domain), HttpStatus.OK);
    }

    // ==========================================
    // Exercise 6: Pagination and Sorting
    // ==========================================
    @GetMapping("/search/paginated")
    public ResponseEntity<Page<Employee>> searchEmployees(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String deptName,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        if (keyword != null && !keyword.isEmpty()) {
            return new ResponseEntity<>(employeeRepository.searchByNameKeyword(keyword, pageable), HttpStatus.OK);
        } else if (deptName != null && !deptName.isEmpty()) {
            return new ResponseEntity<>(employeeRepository.findByDepartmentNameContaining(deptName, pageable), HttpStatus.OK);
        }
        return new ResponseEntity<>(employeeRepository.findAll(pageable), HttpStatus.OK);
    }

    // ==========================================
    // Exercise 8: Projections
    // ==========================================
    @GetMapping("/projections/interface")
    public ResponseEntity<List<EmployeeProjection>> getInterfaceProjections(@RequestParam String deptName) {
        return new ResponseEntity<>(employeeRepository.findProjectedByDepartmentName(deptName), HttpStatus.OK);
    }

    @GetMapping("/projections/dto")
    public ResponseEntity<List<EmployeeDto>> getDtoProjections(@RequestParam Long deptId) {
        return new ResponseEntity<>(employeeRepository.findEmployeeDtosByDeptId(deptId), HttpStatus.OK);
    }

    // ==========================================
    // Exercise 10: Bulk Batch Processing Operations
    // ==========================================
    @PostMapping("/batch")
    public ResponseEntity<String> saveBatch(@RequestBody List<Employee> employees) {
        employeeService.saveEmployeesInBatch(employees);
        return new ResponseEntity<>("Batch insert completed successfully", HttpStatus.CREATED);
    }
}
