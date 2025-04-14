package com.specnogram.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.specnogram.backend.dto.LoginRequest;
import com.specnogram.backend.dto.RegisterRequest;
import com.specnogram.backend.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class AuthenticationService {

    private final UserService userService;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    public AuthenticationService(UserService userService) {
        this.userService = userService;
    }

    public ResponseEntity<?> login(LoginRequest loginRequest) {
        RestTemplate restTemplate = new RestTemplate();

        UriComponentsBuilder builder = UriComponentsBuilder.newInstance()
            .scheme("https")
            .host("oauth2.googleapis.com")
            .path("/token")
            .queryParam("code", loginRequest.getCode())
            .queryParam("client_id", googleClientId)
            .queryParam("client_secret", googleClientSecret)
            .queryParam("redirect_uri", "http://localhost:3000/oauth/callback")
            .queryParam("grant_type", "authorization_code");
    
        ResponseEntity<String> response = restTemplate.postForEntity(builder.toUriString(), null, String.class);
    
        String accessToken = extractValueFromResponse(response.getBody(), "access_token");
    
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);
    
        builder = UriComponentsBuilder.newInstance()
            .scheme("https")
            .host("www.googleapis.com")
            .path("/oauth2/v3/userinfo");
    
        ResponseEntity<String> userInfoResponse = restTemplate.exchange(
            builder.toUriString(),
            HttpMethod.GET,
            entity,
            String.class
        );
    
        return ResponseEntity.ok(userInfoResponse.getBody());
    }
    

    public ResponseEntity<?> register(RegisterRequest request) {
        if (userService.getUserByEmail(request.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setUserName(request.getName());

        userService.createUser(user);
        return ResponseEntity.ok("User registered. Use Google OAuth2 to log in.");
    }

    private String extractValueFromResponse(String responseBody, String key) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            return jsonNode.get(key).asText();
        } catch (Exception e) {
            // Handle parsing exceptions
            e.printStackTrace();
            return null;
        }
    }

}
