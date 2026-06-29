import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingExample {

    private static final Logger logger =
            LoggerFactory.getLogger(LoggingExample.class);

    public static void main(String[] args) {

        logger.info("Application started");

        logger.warn("Low disk space warning");

        logger.error("Unable to connect to database");

        logger.info("Application execution completed");
    }
}
