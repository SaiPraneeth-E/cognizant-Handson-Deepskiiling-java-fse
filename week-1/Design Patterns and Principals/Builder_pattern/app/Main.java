package app;

import builder.Computer;

public class Main {
    public static void main(String[] args) {

        Computer basicComputer = new Computer.Builder()
                .setCPU("Intel i5")
                .setRAM("8GB")
                .setStorage("512GB SSD")
                .build();

        System.out.println("Basic Computer:");
        basicComputer.display();

        Computer gamingComputer = new Computer.Builder()
                .setCPU("Intel i9")
                .setRAM("32GB")
                .setStorage("1TB SSD")
                .setGPU("NVIDIA RTX 4080")
                .setOS("Windows 11")
                .build();

        System.out.println("Gaming Computer:");
        gamingComputer.display();
    }
}