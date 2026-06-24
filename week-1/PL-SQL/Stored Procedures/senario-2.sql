SELECT table_name FROM user_tables;
DESC employees;

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
    p_department   VARCHAR2,
    p_bonus_pct    NUMBER
)
IS
BEGIN
    UPDATE EMP
    SET SAL = SAL + (SAL * p_bonus_pct / 100)
    WHERE DEPTNO = p_department;

    IF SQL%ROWCOUNT = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No employees found');
    END IF;

    COMMIT;
END;
/
