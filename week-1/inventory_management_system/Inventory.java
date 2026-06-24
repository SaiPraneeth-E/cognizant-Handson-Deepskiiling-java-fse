import java.util.HashMap;

class Inventory {
    HashMap<Integer, Product> inventory = new HashMap<>();

    public void addProduct(Product product) {
        inventory.put(product.productId, product);
        System.out.println("Product added successfully!");
    }

    public void updateProduct(int productId, int quantity, double price) {
        if (inventory.containsKey(productId)) {
            Product p = inventory.get(productId);
            p.quantity = quantity;
            p.price = price;
            System.out.println("Product updated successfully!");
        } else {
            System.out.println("Product not found!");
        }
    }
    public void deleteProduct(int productId) {
        if (inventory.remove(productId) != null) {
            System.out.println("Product deleted successfully!");
        } else {
            System.out.println("Product not found!");
        }
    }
    public void displayInventory() {
        for (Product p : inventory.values()) {
            p.display();
        }
    }
}
