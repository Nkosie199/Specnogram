# Specnogram
Specnogram is a micro-service based project management system which tracks project and tasks across multiple development teams. The project consists of a Java 23 backend which utilises the Spring-boot framework, as well as TypeScript frontend which utilises the React framework.


# 1. Database
## 1.1. To create the database:
```bash
psql -U your_username
CREATE DATABASE specnogram;
```
### 2. Run the following command:

```bash
psql -U your_username -d specnogram -f ./backend/db/dummy_data.sql
```

## 1.2. To add the database tables:
```bash
psql -U your_username -d specnogram -f ./backend/db/schema.sql
```


# 2. Backend
## 2.1. To Run locally:
```bash
cd backend
./gradlew clean build
./gradlew bootRun
```

## 2.2. To Run in Docker:
```bash
docker build -t specnogram-backend .
docker run -p 8080:8080 specnogram-backend
```


# 3. Frontend
## 3.1. To Run locally:
```bash
npm i
npm start
```

## 3.2. To Run in Docker:
```bash
docker build -t specnogram-frontend .
docker run -p 80:80 specnogram-frontend
```
