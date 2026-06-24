package app;

import context.PaymentContext;
import strategy.CreditCardPayment;
import strategy.PayPalPayment;

public class Main {
    public static void main(String[] args) {

        PaymentContext context = new PaymentContext();

        context.setStrategy(new CreditCardPayment("1234-5678-9012"));
        context.executePayment(5000);

        context.setStrategy(new PayPalPayment("user@example.com"));
        context.executePayment(2000);
    }
}