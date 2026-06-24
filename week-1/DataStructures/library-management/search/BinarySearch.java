package search;

import model.Book;

public class BinarySearch {

    public static Book searchByTitle(Book[] books, String target) {

        int left = 0;
        int right = books.length - 1;

        while (left <= right) {
            int mid = (left + right) / 2;

            int result = books[mid].getTitle().compareToIgnoreCase(target);

            if (result == 0) return books[mid];
            else if (result < 0) left = mid + 1;
            else right = mid - 1;
        }

        return null;
    }
}