package app;

import subject.StockMarket;
import observer.MobileApp;
import observer.WebApp;

public class Main {
    public static void main(String[] args) {

        StockMarket stockMarket = new StockMarket();

        MobileApp mobile1 = new MobileApp("App1");
        WebApp web1 = new WebApp("Web1");

        stockMarket.registerObserver(mobile1);
        stockMarket.registerObserver(web1);

        System.out.println("Stock Price Updated to 100");
        stockMarket.setPrice(100);

        System.out.println("Stock Price Updated to 200");
        stockMarket.setPrice(200);

        stockMarket.removeObserver(mobile1);

        System.out.println("Stock Price Updated to 300");
        stockMarket.setPrice(300);
    }
}