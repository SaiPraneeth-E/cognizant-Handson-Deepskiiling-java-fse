package com.library;

import com.library.service.BookService;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import java.util.List;

public class LibraryManagementApplication {
    public static void main(String[] args) {
        System.out.println("=== Initializing Spring Application Context ===");
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println("=== Context Initialized Successfully ===");

        // Retrieve the service bean
        BookService bookService = context.getBean("bookService", BookService.class);

        // Call the service method (this should trigger dependencies and AOP aspect)
        List<String> books = bookService.listBooks();
        System.out.println("=== Retrieval Completed. Result: " + books + " ===");

        context.close();
        System.out.println("=== Application Shutdown ===");
    }
}
