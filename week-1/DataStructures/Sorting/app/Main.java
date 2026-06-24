package app;

import model.Order;
import sorting.BubbleSort;
import sorting.QuickSort;

public class Main {

    public static void main(String[] args) {

        Order[] orders = {
                new Order(1, "Varshith", 5000),
                new Order(2, "Likita", 2000),
                new Order(3, "Arun", 8000),
                new Order(4, "Yashashwitha", 3000)
        };

        System.out.println("Before Sorting:");
        for (Order o : orders) {
            o.display();
        }

        // Bubble Sort
        BubbleSort.sort(orders);

        System.out.println("\nAfter Bubble Sort:");
        for (Order o : orders) {
            o.display();
        }

        // Quick Sort
        QuickSort.sort(orders, 0, orders.length - 1);

        System.out.println("\nAfter Quick Sort:");
        for (Order o : orders) {
            o.display();
        }
    }
}