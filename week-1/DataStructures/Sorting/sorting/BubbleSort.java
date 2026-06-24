package sorting;

import model.Order;

public class BubbleSort {

    public static void sort(Order[] orders) {
        int n = orders.length;

        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;

            for (int j = 0; j < n - i - 1; j++) {

                if (orders[j].getTotalPrice() > orders[j + 1].getTotalPrice()) {

                    Order temp = orders[j];
                    orders[j] = orders[j + 1];
                    orders[j + 1] = temp;

                    swapped = true;
                }
            }

            if (!swapped) break; // optimization
        }
    }
}