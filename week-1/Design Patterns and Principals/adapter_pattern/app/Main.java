package app;

import payment.Processor;
import adapter.Paypaladapter;
import adapter.Stripadapter;
import adapter.Razopayadapter;

public class Main {
    public static void main(String[] args) {

        Processor paypal = new Paypaladapter();
        paypal.processPayment(1000);

        Processor stripe = new Stripadapter();
        stripe.processPayment(2000);

        Processor razorpay = new Razopayadapter();
        razorpay.processPayment(3000);
    }
}