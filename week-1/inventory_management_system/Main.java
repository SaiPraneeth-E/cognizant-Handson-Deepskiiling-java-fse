public class Main {
    public static void main(String[] args) {
        Inventory inv = new Inventory();

        inv.addProduct(new Product(1, "Laptop", 10, 50000));
        inv.addProduct(new Product(2, "Mouse", 50, 500));

        inv.displayInventory();

        inv.updateProduct(1, 8, 48000);
        inv.deleteProduct(2);

        inv.displayInventory();
    }
}