package app;

import repository.CustomerRepository;
import repository.CustomerRepositoryImpl;
import service.CustomerService;

public class Main {
    public static void main(String[] args) {
        CustomerRepository repo = new CustomerRepositoryImpl();
        CustomerService service = new CustomerService(repo);

        service.getCustomerDetails(101);
    }
}