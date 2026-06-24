CREATE OR REPLACE PROCEDURE AddNewCustomer (
    p_id      NUMBER,
    p_name    VARCHAR2,
    p_dob     DATE,
    p_balance NUMBER
)
IS
BEGIN
    INSERT INTO CUSTOMERS (CUSTOMERID, NAME, DOB, BALANCE, LASTMODIFIED)
    VALUES (p_id, p_name, p_dob, p_balance, SYSDATE);

    COMMIT;

EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Error: Customer ID already exists');
        ROLLBACK;

    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        ROLLBACK;
END;
/
