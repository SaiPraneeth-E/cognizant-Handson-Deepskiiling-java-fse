DECLARE
    CURSOR UpdateLoanInterestRates IS
        SELECT LOANID, LOANAMOUNT, INTERESTRATE
        FROM LOANS;

    v_loanid        LOANS.LOANID%TYPE;
    v_loanamount    LOANS.LOANAMOUNT%TYPE;
    v_interestrate  LOANS.INTERESTRATE%TYPE;

BEGIN
    OPEN UpdateLoanInterestRates;

    LOOP
        FETCH UpdateLoanInterestRates
        INTO v_loanid, v_loanamount, v_interestrate;

        EXIT WHEN UpdateLoanInterestRates%NOTFOUND;

        IF v_loanamount > 100000 THEN
            UPDATE LOANS
            SET INTERESTRATE = INTERESTRATE + 0.5
            WHERE LOANID = v_loanid;
        ELSE
            UPDATE LOANS
            SET INTERESTRATE = INTERESTRATE + 0.2
            WHERE LOANID = v_loanid;
        END IF;

    END LOOP;

    CLOSE UpdateLoanInterestRates;

    COMMIT;
END;
/
