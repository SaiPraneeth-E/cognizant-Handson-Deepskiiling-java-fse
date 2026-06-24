package adapter;

import payment.Processor;
import gatways.Stripe;

public class Stripadapter implements Processor {

    private Stripe stripe = new Stripe();

    public void processPayment(double amount) {
        stripe.makeStripePayment(amount);
    }
}