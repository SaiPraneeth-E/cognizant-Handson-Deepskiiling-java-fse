package adapter;

import payment.Processor;
import gatways.Paypal;

public class Paypaladapter implements Processor {

    private Paypal paypal = new Paypal();

    public void processPayment(double amount) {
        paypal.payWithPaypal(amount);
    }
}