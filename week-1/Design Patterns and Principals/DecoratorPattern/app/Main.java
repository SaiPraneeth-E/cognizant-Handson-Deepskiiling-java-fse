package app;

import notifier.*;

public class Main {
    public static void main(String[] args) {

        Notifier email = new EmailNotifier();

        Notifier multiChannel = new SlackNotifierDecorator(
                new SMSNotifier(email)
        );

        multiChannel.send("Hello User!");
    }
}