package com.cognizant.springlearn.controller;

import com.cognizant.springlearn.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthenticationController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    // Expose GET /authenticate to read authorization headers and issue a JWT
    @GetMapping("/authenticate")
    public Map<String, String> authenticate(@RequestHeader("Authorization") String authHeader) {
        LOGGER.info("authenticate() execution started");
        LOGGER.debug("Authorization Header received: {}", authHeader);

        String token = "";
        
        try {
            if (authHeader != null && authHeader.startsWith("Basic ")) {
                // Decode basic credentials: Basic Base64(username:password)
                String base64Credentials = authHeader.substring("Basic ".length()).trim();
                byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);
                String credentials = new String(decodedBytes, StandardCharsets.UTF_8);
                
                String[] credentialValues = credentials.split(":", 2);
                if (credentialValues.length == 2) {
                    String username = credentialValues[0];
                    // Generate JWT token using decrypted user subject details
                    token = jwtUtil.generateToken(username);
                    LOGGER.debug("JWT Token generated successfully for user: {}", username);
                }
            }
        } catch (Exception e) {
            LOGGER.error("Failed to decode basic credentials or generate token: {}", e.getMessage());
        }

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        LOGGER.info("authenticate() execution ended");
        return response;
    }
}
