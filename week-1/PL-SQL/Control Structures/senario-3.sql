DECLARE
BEGIN
    FOR loan_rec IN (
        SELECT c.NAME, l.LOANID, l.ENDDATE
        FROM CUSTOMERS c
        JOIN LOANS l ON c.CUSTOMERID = l.CUSTOMERID
        WHERE l.ENDDATE BETWEEN SYSDATE AND SYSDATE + 30
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Dear ' || loan_rec.NAME ||
            ', your loan (ID: ' || loan_rec.LOANID ||
            ') is due on ' || TO_CHAR(loan_rec.ENDDATE, 'DD-MON-YYYY')
        );
    END LOOP;
END;
/
