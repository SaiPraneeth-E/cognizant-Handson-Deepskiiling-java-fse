package com.library.service;

import com.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookService {
    private BookRepository bookRepository;
    private String injectionMethod = "None";

    // Default constructor (required for setter injection demonstration in XML)
    public BookService() {
        System.out.println("BookService: Default constructor invoked (no-arg).");
    }

    // Constructor for constructor injection
    @Autowired
    public BookService(BookRepository bookRepository) {
        System.out.println("BookService: Constructor injection invoked with BookRepository.");
        this.bookRepository = bookRepository;
        this.injectionMethod = "Constructor Injection";
    }

    // Setter method for setter injection
    public void setBookRepository(BookRepository bookRepository) {
        System.out.println("BookService: Setter injection invoked (setBookRepository).");
        this.bookRepository = bookRepository;
        this.injectionMethod = "Setter Injection";
    }

    public List<String> listBooks() {
        System.out.println("BookService: Executing listBooks() [Dependency Injection Method: " + injectionMethod + "]");
        return bookRepository.findAll();
    }
}
