package factory;

import document.Document;
import document.WordDocument;

public class WordFactory extends DocumentFactory {

    public Document createDocument() {
        return new WordDocument();
    }
}