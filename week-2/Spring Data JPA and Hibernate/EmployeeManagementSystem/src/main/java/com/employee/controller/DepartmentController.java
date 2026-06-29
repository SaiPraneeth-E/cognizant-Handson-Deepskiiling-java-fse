package com.employee.controller;

import com.employee.entity.Department;
import com.employee.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentRepository departmentRepository;

    @Autowired
    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        Department saved = departmentRepository.save(department);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // READ ALL
    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        return new ResponseEntity<>(departmentRepository.findAll(), HttpStatus.OK);
    }

    // READ BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        Optional<Department> data = departmentRepository.findById(id);
        return data.map(department -> new ResponseEntity<>(department, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department details) {
        Optional<Department> data = departmentRepository.findByName(details.getName());
        if (data.isPresent() && !data.get().getId().equals(id)) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Duplicate name
        }
        
        return departmentRepository.findById(id)
                .map(existing -> {
                    existing.setName(details.getName());
                    Department updated = departmentRepository.save(existing);
                    return new ResponseEntity<>(updated, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteDepartment(@PathVariable Long id) {
        if (departmentRepository.existsById(id)) {
            departmentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
