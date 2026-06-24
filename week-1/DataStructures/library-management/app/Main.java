package app;

import java.util.Arrays;
import java.util.Comparator;
import model.Book;
import search.BinarySearch;
import search.LinearSearch;

public class Main {

    public static void main(String[] args) {

        Book[] books = {
                new Book(1, "Java", "Varshith"),
                new Book(2, "Python", "Likita"),
                new Book(3, "C++", "Arun"),
                new Book(4, "Data Structures", "Yashasashwitha")
        };
        System.out.println("Linear Search Result:");
        Book result1 = LinearSearch.searchByTitle(books, "Python");

        if (result1 != null) result1.display();
        else System.out.println("Book not found");
        Arrays.sort(books, Comparator.comparing(Book::getTitle));
        System.out.println("\nBinary Search Result:");
        Book result2 = BinarySearch.searchByTitle(books, "Java");

        if (result2 != null) result2.display();
        else System.out.println("Book not found");
    }
}