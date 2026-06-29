CREATE OR REPLACE FUNCTION CalculateMonthlyInstallment (
    p_amount   NUMBER,
    p_rate     NUMBER,
    p_years    NUMBER
)
RETURN NUMBER
IS
    v_r NUMBER;
    v_n NUMBER;
    v_emi NUMBER;
BEGIN
    v_r := p_rate / (12 * 100); 
    v_n := p_years * 12;        

    IF v_r = 0 THEN
        v_emi := p_amount / v_n;
    ELSE
        v_emi := (p_amount * v_r * POWER(1 + v_r, v_n)) /
                 (POWER(1 + v_r, v_n) - 1);
    END IF;

    RETURN ROUND(v_emi, 2);
END;
/
