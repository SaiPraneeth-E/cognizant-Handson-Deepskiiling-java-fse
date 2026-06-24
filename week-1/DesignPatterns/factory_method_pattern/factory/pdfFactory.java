package factory;

import document.Document;
import document.pdfDocument;

public class pdfFactory extends DocumentFactory {

    public Document createDocument() {
        return new pdfDocument();
    }
}