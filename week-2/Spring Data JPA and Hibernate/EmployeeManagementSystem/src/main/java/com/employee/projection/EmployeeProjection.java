package com.employee.projection;

import org.springframework.beans.factory.annotation.Value;

public interface EmployeeProjection {
    
    // Closed projection
    String getName();
    String getEmail();

    // Open projection: SpEL expression combining name and email
    @Value("#{target.name + ' (' + target.email + ')'}")
    String getFullNameAndEmail();

    // Fetching department name nested projection
    @Value("#{target.department != null ? target.department.name : 'Unassigned'}")
    String getDepartmentName();
}
