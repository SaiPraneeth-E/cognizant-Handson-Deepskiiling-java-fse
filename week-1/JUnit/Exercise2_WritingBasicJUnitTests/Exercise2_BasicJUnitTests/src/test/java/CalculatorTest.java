import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class CalculatorTest {

    @Test
    public void testAdd() {

        Calculator calculator = new Calculator();

        assertEquals(5,
                     calculator.add(2, 3));
    }

    @Test
    public void testSubtract() {

        Calculator calculator = new Calculator();

        assertEquals(3,
                     calculator.subtract(5, 2));
    }

    @Test
    public void testMultiply() {

        Calculator calculator = new Calculator();

        assertEquals(12,
                     calculator.multiply(3, 4));
    }
}