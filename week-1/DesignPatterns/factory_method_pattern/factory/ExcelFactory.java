package factory;

import document.Document;
import document.ExcelDocument;

public class ExcelFactory extends DocumentFactory {

    public Document createDocument() {
        return new ExcelDocument();
    }
}