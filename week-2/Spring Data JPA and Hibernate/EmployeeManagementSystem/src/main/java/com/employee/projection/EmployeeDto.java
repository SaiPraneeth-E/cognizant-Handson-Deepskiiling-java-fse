package com.employee.projection;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class EmployeeDto {
    private final String name;
    private final String email;
    private final String departmentName;

    // Required constructor for constructor expression query projections
    public EmployeeDto(String name, String email, String departmentName) {
        this.name = name;
        this.email = email;
        this.departmentName = departmentName;
    }
}
