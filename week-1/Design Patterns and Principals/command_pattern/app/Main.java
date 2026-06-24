package app;

import command.LightOffCommand;
import command.LightOnCommand;
import invoker.RemoteControl;
import receiver.Light;

public class Main {
    public static void main(String[] args) {

        Light light = new Light();

        LightOnCommand lightOn = new LightOnCommand(light);
        LightOffCommand lightOff = new LightOffCommand(light);

        RemoteControl remote = new RemoteControl();

        remote.setCommand(lightOn);
        remote.pressButton();

        remote.setCommand(lightOff);
        remote.pressButton();
    }
}