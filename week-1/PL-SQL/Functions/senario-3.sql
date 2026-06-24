CREATE OR REPLACE FUNCTION HasSufficientBalance_SQL (
    p_accountid NUMBER,
    p_amount    NUMBER
)
RETURN NUMBER
IS
    v_balance NUMBER;
BEGIN
    SELECT BALANCE INTO v_balance
    FROM ACCOUNTS
    WHERE ACCOUNTID = p_accountid;

    IF v_balance >= p_amount THEN
        RETURN 1;
    ELSE
        RETURN 0;
    END IF;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN 0;
END;
/
