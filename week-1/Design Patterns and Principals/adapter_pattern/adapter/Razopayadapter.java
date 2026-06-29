package adapter;

import payment.Processor;
import gatways.Razopay;

public class Razopayadapter implements Processor {

    private Razopay razorpay = new Razopay();

    public void processPayment(double amount) {
        razorpay.sendPayment(amount);
    }
}