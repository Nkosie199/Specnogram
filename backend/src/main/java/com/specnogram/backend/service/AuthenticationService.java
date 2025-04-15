package com.specnogram.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.specnogram.backend.dto.LoginRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class AuthenticationService {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String redirectUri;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        RestTemplate restTemplate = new RestTemplate();

        UriComponentsBuilder builder = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("oauth2.googleapis.com")
                .path("/token")
                .queryParam("code", loginRequest.getCode())
                .queryParam("client_id", googleClientId)
                .queryParam("client_secret", googleClientSecret)
                .queryParam("redirect_uri", redirectUri)
                .queryParam("grant_type", "authorization_code");

        ResponseEntity<String> response = restTemplate.postForEntity(builder.toUriString(), null, String.class);
        String accessToken = extractValueFromResponse(response.getBody(), "access_token");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        builder = UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("www.googleapis.com")
                .path("/oauth2/v3/userinfo");

        ResponseEntity<String> userInfoResponse = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                entity,
                String.class);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "http://localhost:3000");
        responseHeaders.set("Access-Control-Allow-Credentials", "true");

        return ResponseEntity
                .ok()
                .headers(responseHeaders)
                .body(userInfoResponse.getBody());
    }

    private String extractValueFromResponse(String responseBody, String key) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            return jsonNode.get(key).asText();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
