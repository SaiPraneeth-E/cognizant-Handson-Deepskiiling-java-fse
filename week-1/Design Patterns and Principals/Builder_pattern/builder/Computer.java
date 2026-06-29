package builder;

public class Computer {

    private String CPU, RAM, storage, GPU, OS;

    private Computer(Builder builder) {
        this.CPU = builder.CPU;
        this.RAM = builder.RAM;
        this.storage = builder.storage;
        this.GPU = builder.GPU;
        this.OS = builder.OS;
    }

    public void display() {
        System.out.println("CPU: " + CPU);
        System.out.println("RAM: " + RAM);
        System.out.println("Storage: " + storage);
        System.out.println("GPU: " + GPU);
        System.out.println("OS: " + OS);
    }

    public static class Builder {
        private String CPU, RAM, storage, GPU, OS;

        public Builder setCPU(String CPU) { this.CPU = CPU; return this; }
        public Builder setRAM(String RAM) { this.RAM = RAM; return this; }
        public Builder setStorage(String storage) { this.storage = storage; return this; }
        public Builder setGPU(String GPU) { this.GPU = GPU; return this; }
        public Builder setOS(String OS) { this.OS = OS; return this; }

        public Computer build() {
            return new Computer(this);
        }
    }
}