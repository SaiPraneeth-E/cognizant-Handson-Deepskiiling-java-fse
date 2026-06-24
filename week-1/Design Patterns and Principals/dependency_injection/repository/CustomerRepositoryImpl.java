package repository;

public class CustomerRepositoryImpl implements CustomerRepository {

    public String findCustomerById(int id) {
        return "Customer ID: " + id + ", Name: Varshith";
    }
}