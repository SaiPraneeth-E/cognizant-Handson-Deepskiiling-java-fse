package com.library.repository;

import org.springframework.stereotype.Repository;
import java.util.Arrays;
import java.util.List;

@Repository
public class BookRepository {
    public List<String> findAll() {
        System.out.println("BookRepository: Retrieving books from data source...");
        return Arrays.asList("The Pragmatic Programmer", "Patterns of Enterprise Application Architecture", "Refactoring");
    }
}
