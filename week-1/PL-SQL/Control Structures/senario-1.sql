DESC CUSTOMERS
DESC LOANS

DECLARE
    CURSOR cust_cursor IS
        SELECT CUSTOMERID,
               FLOOR(MONTHS_BETWEEN(SYSDATE, DOB)/12) AS age
        FROM CUSTOMERS;

BEGIN
    FOR cust_rec IN cust_cursor LOOP
        IF cust_rec.age > 60 THEN
            UPDATE LOANS
            SET INTERESTRATE = INTERESTRATE * 0.99
            WHERE CUSTOMERID = cust_rec.CUSTOMERID;
        END IF;
    END LOOP;

    COMMIT;
END;
/
