CREATE OR REPLACE PACKAGE AccountOperations AS

    PROCEDURE OpenAccount(
        p_accid NUMBER,
        p_custid NUMBER,
        p_balance NUMBER
    );

    PROCEDURE CloseAccount(
        p_accid NUMBER
    );

    FUNCTION GetTotalBalance(
        p_custid NUMBER
    ) RETURN NUMBER;

END AccountOperations;
/

CREATE OR REPLACE PACKAGE BODY AccountOperations AS
    PROCEDURE OpenAccount(
        p_accid NUMBER,
        p_custid NUMBER,
        p_balance NUMBER
    ) IS
    BEGIN
        INSERT INTO ACCOUNTS (ACCOUNTID, CUSTOMERID, BALANCE)
        VALUES (p_accid, p_custid, p_balance);
    END;
    PROCEDURE CloseAccount(
        p_accid NUMBER
    ) IS
    BEGIN
        DELETE FROM ACCOUNTS
        WHERE ACCOUNTID = p_accid;
    END;
    FUNCTION GetTotalBalance(
        p_custid NUMBER
    ) RETURN NUMBER IS
        v_total NUMBER;
    BEGIN
        SELECT NVL(SUM(BALANCE), 0)
        INTO v_total
        FROM ACCOUNTS
        WHERE CUSTOMERID = p_custid;

        RETURN v_total;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 0;
    END;

END AccountOperations;
/
