package app;

import controller.StudentController;
import model.Student;
import view.StudentView;

public class Main {
    public static void main(String[] args) {
        Student student = new Student("Varshith", 101, "A");
        StudentView view = new StudentView();
        StudentController controller = new StudentController(student, view);
        controller.updateView();
        controller.setStudentName("Likita");
        controller.setStudentGrade("A+");
        controller.updateView();
    }
}