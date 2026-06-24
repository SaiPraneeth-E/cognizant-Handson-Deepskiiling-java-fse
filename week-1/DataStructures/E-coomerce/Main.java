import java.util.Arrays;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {

        Product[] products = {
            new Product(1, "Laptop", "Electronics"),
            new Product(2, "Mobile", "Electronics"),
            new Product(3, "Shoes", "Fashion"),
            new Product(4, "Watch", "Accessories")
        };
        Product result1 = LinearSearch.search(products, "Shoes");
        if (result1 != null) {
            System.out.print("Linear Search Found: ");
            result1.display();
        } else {
            System.out.println("Not Found");
        }
        Arrays.sort(products, Comparator.comparing(p -> p.productName));
        Product result2 = BinarySearch.search(products, "Watch");
        if (result2 != null) {
            System.out.print("Binary Search Found: ");
            result2.display();
        } else {
            System.out.println("Not Found");
        }
    }
}