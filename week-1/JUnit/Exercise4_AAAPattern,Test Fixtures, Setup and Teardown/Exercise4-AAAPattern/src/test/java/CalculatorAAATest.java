import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class CalculatorAAATest {

    private Calculator calculator;

    @Before
    public void setUp() {
        System.out.println("Setup Method Executed");
        calculator = new Calculator();
    }

    @After
    public void tearDown() {
        System.out.println("Teardown Method Executed");
        calculator = null;
    }

    @Test
    public void testAdd() {

        // Arrange
        int num1 = 10;
        int num2 = 20;

        // Act
        int result = calculator.add(num1, num2);

        // Assert
        assertEquals(30, result);

    }

	
}