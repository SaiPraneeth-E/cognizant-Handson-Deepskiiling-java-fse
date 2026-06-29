package com.library.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;

@Aspect
public class LoggingAspect {

    @Around("execution(* com.library.service.BookService.*(..)) || execution(* com.library.repository.BookRepository.*(..))")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        
        System.out.println("[AOP-LOG] Method execution started: " + joinPoint.getSignature().toShortString());
        
        Object proceed = joinPoint.proceed();
        
        long executionTime = System.currentTimeMillis() - start;
        System.out.println("[AOP-LOG] Method execution completed: " + joinPoint.getSignature().toShortString() + " in " + executionTime + " ms");
        
        return proceed;
    }
}
