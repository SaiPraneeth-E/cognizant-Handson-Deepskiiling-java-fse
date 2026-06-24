package search;

import model.Book;

public class LinearSearch {

    public static Book searchByTitle(Book[] books, String target) {
        for (Book b : books) {
            if (b.getTitle().equalsIgnoreCase(target)) {
                return b;
            }
        }
        return null;
    }
}