DECLARE
    CURSOR ApplyAnnualFee IS
        SELECT ACCOUNTID, BALANCE FROM ACCOUNTS;
    v_accid   ACCOUNTS.ACCOUNTID%TYPE;
    v_balance ACCOUNTS.BALANCE%TYPE;
    v_fee NUMBER := 500;

BEGIN
    OPEN ApplyAnnualFee;

    LOOP
        FETCH ApplyAnnualFee INTO v_accid, v_balance;
        EXIT WHEN ApplyAnnualFee%NOTFOUND;
        UPDATE ACCOUNTS
        SET BALANCE = BALANCE - v_fee
        WHERE ACCOUNTID = v_accid;

    END LOOP;
    CLOSE ApplyAnnualFee;
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Annual fee applied to all accounts successfully.');

END;
/
