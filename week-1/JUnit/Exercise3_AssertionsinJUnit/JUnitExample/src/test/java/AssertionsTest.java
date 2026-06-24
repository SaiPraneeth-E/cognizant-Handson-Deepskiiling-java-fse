import static org.junit.Assert.*;
import org.junit.Test;

public class AssertionsTest {

    @Test
    public void testAssertions() {

        System.out.println("Testing assertEquals");
        assertEquals(5, 2 + 3);

        System.out.println("Testing assertTrue");
        assertTrue(5 > 3);

        System.out.println("Testing assertFalse");
        assertFalse(5 < 3);

        System.out.println("Testing assertNull");
        assertNull(null);

        System.out.println("Testing assertNotNull");
        assertNotNull(new Object());

        System.out.println("All assertions passed!");
    }
    
    
    
}