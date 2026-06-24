CREATE OR REPLACE PROCEDURE UpdateSalary (
    p_empid      NUMBER,
    p_percentage NUMBER
)
IS
BEGIN
    UPDATE EMPLOYEES
    SET SALARY = SALARY + (SALARY * p_percentage / 100)
    WHERE EMPID = p_empid;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Employee not found');
    END IF;

    COMMIT;

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        ROLLBACK;
END;
/
