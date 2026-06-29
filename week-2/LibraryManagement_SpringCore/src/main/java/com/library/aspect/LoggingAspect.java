package com.library.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    // Before Advice: Runs before method execution
    @Before("execution(* com.library.service.BookService.*(..))")
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("[AOP-BEFORE] Logging before method execution: " + joinPoint.getSignature().toShortString());
    }

    // After Advice: Runs after method execution (whether success or exception)
    @After("execution(* com.library.service.BookService.*(..))")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("[AOP-AFTER] Logging after method execution: " + joinPoint.getSignature().toShortString());
    }
}
