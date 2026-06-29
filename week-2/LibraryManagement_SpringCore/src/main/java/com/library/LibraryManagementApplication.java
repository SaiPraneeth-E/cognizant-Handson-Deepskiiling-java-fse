package com.library;

import com.library.service.BookService;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import java.util.List;

public class LibraryManagementApplication {
    public static void main(String[] args) {
        System.out.println("=== Initializing Spring Core Application Context ===");
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println("=== Context Initialized successfully ===");

        System.out.println("\n--- Testing Component Scanned Annotation Bean (Ex 6) ---");
        // Component scanning retrieves class name camelCase bean
        BookService scannedService = context.getBean("bookService", BookService.class);
        List<String> books1 = scannedService.listBooks();
        System.out.println("Books retrieval: " + books1);

        System.out.println("\n--- Testing Explicit XML Constructor Injection Bean (Ex 7) ---");
        BookService constructorService = context.getBean("xmlBookServiceConstructor", BookService.class);
        List<String> books2 = constructorService.listBooks();
        System.out.println("Books retrieval: " + books2);

        System.out.println("\n--- Testing Explicit XML Setter Injection Bean (Ex 7) ---");
        BookService setterService = context.getBean("xmlBookServiceSetter", BookService.class);
        List<String> books3 = setterService.listBooks();
        System.out.println("Books retrieval: " + books3);

        System.out.println("\n=== Shutting down context ===");
        context.close();
    }
}
