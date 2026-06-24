CREATE OR REPLACE PACKAGE CustomerManagement AS
    PROCEDURE AddCustomer(
        p_id NUMBER,
        p_name VARCHAR2,
        p_dob DATE,
        p_balance NUMBER
    );

    PROCEDURE UpdateCustomer(
        p_id NUMBER,
        p_name VARCHAR2,
        p_dob DATE,
        p_balance NUMBER
    );

    FUNCTION GetCustomerBalance(
        p_id NUMBER
    ) RETURN NUMBER;
END CustomerManagement;
/

CREATE OR REPLACE PACKAGE BODY CustomerManagement AS

    PROCEDURE AddCustomer(
        p_id NUMBER,
        p_name VARCHAR2,
        p_dob DATE,
        p_balance NUMBER
    ) IS
    BEGIN
        INSERT INTO CUSTOMERS (CUSTOMERID, NAME, DOB, BALANCE, LASTMODIFIED)
        VALUES (p_id, p_name, p_dob, p_balance, SYSDATE);
    END;

    PROCEDURE UpdateCustomer(
        p_id NUMBER,
        p_name VARCHAR2,
        p_dob DATE,
        p_balance NUMBER
    ) IS
    BEGIN
        UPDATE CUSTOMERS
        SET NAME = p_name,
            DOB = p_dob,
            BALANCE = p_balance,
            LASTMODIFIED = SYSDATE
        WHERE CUSTOMERID = p_id;
    END;

    FUNCTION GetCustomerBalance(
        p_id NUMBER
    ) RETURN NUMBER IS
        v_balance NUMBER;
    BEGIN
        SELECT BALANCE INTO v_balance
        FROM CUSTOMERS
        WHERE CUSTOMERID = p_id;

        RETURN v_balance;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 0;
    END;

END CustomerManagement;
/
