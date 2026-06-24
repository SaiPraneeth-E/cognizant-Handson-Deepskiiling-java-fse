package observer;

public class WebApp implements Observer {

    private String appName;

    public WebApp(String appName) {
        this.appName = appName;
    }

    public void update(double price) {
        System.out.println(appName + " (Web) received price update: " + price);
    }
}