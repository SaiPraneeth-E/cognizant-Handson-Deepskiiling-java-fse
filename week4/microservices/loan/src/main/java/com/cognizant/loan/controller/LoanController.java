package com.cognizant.loan.controller;

import com.cognizant.loan.model.Loan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoanController {

    @GetMapping("/loans/{number}")
    public Loan getLoanDetails(@PathVariable String number) {
        String loanNo = (number == null || number.isEmpty()) ? "H00987987972342" : number;
        return new Loan(loanNo, "car", 400000.0, 3258.0, 18);
    }
}
