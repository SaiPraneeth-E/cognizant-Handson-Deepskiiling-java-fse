package com.library.repository;

import java.util.Arrays;
import java.util.List;

public class BookRepository {
    public List<String> findAll() {
        System.out.println("BookRepository: Fetching books from database...");
        try {
            // Add a mock delay to test AOP method execution time logging
            Thread.sleep(120);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        return Arrays.asList("Spring in Action", "Clean Code", "Effective Java");
    }
}
