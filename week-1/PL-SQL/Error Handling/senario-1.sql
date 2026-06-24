CREATE OR REPLACE PROCEDURE SafeTransferFunds (
    p_from_acc   NUMBER,
    p_to_acc     NUMBER,
    p_amount     NUMBER
)
IS
    v_balance NUMBER;
BEGIN
    SELECT BALANCE INTO v_balance
    FROM ACCOUNTS
    WHERE ACCOUNTID = p_from_acc;
    IF v_balance < p_amount THEN
        RAISE_APPLICATION_ERROR(-20001, 'Insufficient Funds');
    END IF;
    UPDATE ACCOUNTS
    SET BALANCE = BALANCE - p_amount
    WHERE ACCOUNTID = p_from_acc;
    UPDATE ACCOUNTS
    SET BALANCE = BALANCE + p_amount
    WHERE ACCOUNTID = p_to_acc;

    COMMIT;

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: Account not found');
        ROLLBACK;

    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
        ROLLBACK;
END;
/
