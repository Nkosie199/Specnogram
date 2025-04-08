# Specnogram
Specnogram is a micro-service based project management system which tracks project and tasks across multiple development teams. The project consists of a Java 23 backend which utilises the Spring-boot framework, as well as TypeScript frontend which utilises the React framework.

# 1. Backend
## 1.1. To Run locally:
```bash
cd backend
./gradlew clean build
./gradlew bootRun
```

## 1.2. To Run in Docker:
```bash
docker build -t specnogram-backend .
docker run -p 8080:8080 specnogram-backend
```


# 2. Frontend
## 2.1. To Run locally:
```bash
npm i
npm start
```

## 2.2. To Run in Docker:
```bash
docker build -t specnogram-frontend .
docker run -p 80:80 specnogram-frontend
```
