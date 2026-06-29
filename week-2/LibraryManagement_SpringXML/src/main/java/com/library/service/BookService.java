package com.library.service;

import com.library.repository.BookRepository;
import java.util.List;

public class BookService {
    private BookRepository bookRepository;

    // Setter method for dependency injection
    public void setBookRepository(BookRepository bookRepository) {
        System.out.println("BookService: Dependency injected via setBookRepository.");
        this.bookRepository = bookRepository;
    }

    public List<String> listBooks() {
        System.out.println("BookService: Executing listBooks business logic...");
        return bookRepository.findAll();
    }
}
