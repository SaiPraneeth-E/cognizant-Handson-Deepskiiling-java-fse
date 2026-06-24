CREATE OR REPLACE PACKAGE EmployeeManagement AS
    PROCEDURE HireEmployee(
        p_id NUMBER,
        p_name VARCHAR2,
        p_salary NUMBER,
        p_department VARCHAR2
    );

    PROCEDURE UpdateEmployee(
        p_id NUMBER,
        p_name VARCHAR2,
        p_salary NUMBER,
        p_department VARCHAR2
    );

    FUNCTION GetAnnualSalary(
        p_id NUMBER
    ) RETURN NUMBER;
END EmployeeManagement;
/

CREATE OR REPLACE PACKAGE BODY EmployeeManagement AS

    PROCEDURE HireEmployee(
        p_id NUMBER,
        p_name VARCHAR2,
        p_salary NUMBER,
        p_department VARCHAR2
    ) IS
    BEGIN
        INSERT INTO EMPLOYEES (EMPLOYEEID, NAME, SALARY, DEPARTMENT)
        VALUES (p_id, p_name, p_salary, p_department);
    END;

    PROCEDURE UpdateEmployee(
        p_id NUMBER,
        p_name VARCHAR2,
        p_salary NUMBER,
        p_department VARCHAR2
    ) IS
    BEGIN
        UPDATE EMPLOYEES
        SET NAME = p_name,
            SALARY = p_salary,
            DEPARTMENT = p_department
        WHERE EMPLOYEEID = p_id;
    END;

    FUNCTION GetAnnualSalary(
        p_id NUMBER
    ) RETURN NUMBER IS
        v_salary NUMBER;
    BEGIN
        SELECT SALARY INTO v_salary
        FROM EMPLOYEES
        WHERE EMPLOYEEID = p_id;

        RETURN v_salary * 12;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 0;
    END;

END EmployeeManagement;
/
