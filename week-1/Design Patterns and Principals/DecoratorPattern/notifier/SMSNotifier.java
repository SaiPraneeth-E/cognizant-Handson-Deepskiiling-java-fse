package notifier;

public class SMSNotifier extends NotifierDecorator {

    public SMSNotifier(Notifier notifier) {
        super(notifier);
    }

    public void send(String message) {
        super.send(message);
        System.out.println("Sending SMS: " + message);
    }
}