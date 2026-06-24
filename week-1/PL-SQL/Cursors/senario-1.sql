DECLARE
    CURSOR GenerateMonthlyStatements IS
        SELECT ACCOUNTID, TRANSACTIONID, AMOUNT, TRANSACTIONDATE
        FROM TRANSACTIONS
        WHERE EXTRACT(MONTH FROM TRANSACTIONDATE) = EXTRACT(MONTH FROM SYSDATE)
          AND EXTRACT(YEAR FROM TRANSACTIONDATE) = EXTRACT(YEAR FROM SYSDATE);

    v_rec GenerateMonthlyStatements%ROWTYPE;

BEGIN
    OPEN GenerateMonthlyStatements;

    LOOP
        FETCH GenerateMonthlyStatements INTO v_rec;
        EXIT WHEN GenerateMonthlyStatements%NOTFOUND;

        DBMS_OUTPUT.PUT_LINE(
            'Account: ' || v_rec.ACCOUNTID ||
            ', TxnID: ' || v_rec.TRANSACTIONID ||
            ', Amount: ' || v_rec.AMOUNT ||
            ', Date: ' || TO_CHAR(v_rec.TRANSACTIONDATE, 'DD-MON-YYYY')
        );
    END LOOP;

    CLOSE GenerateMonthlyStatements;
END;
/
