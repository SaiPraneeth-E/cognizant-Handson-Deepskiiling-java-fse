import static org.junit.Assert.assertEquals;
import org.junit.Test;

public class CalculatorTest {

    @Test
    public void testAdd() {

        Calculator calc = new Calculator();

        int result = calc.add(2, 3);

        System.out.println("Result = " + result);

        assertEquals(5, result);
    }
}