# 🏥 Health Connect Backend

**Health Connect Backend** is a **production-grade telemedicine backend system** designed for scalability, security, and reliability.
It powers core healthcare workflows including doctor discovery, appointment booking, consultations, prescriptions, authentication, and notifications.

Built using **Node.js, TypeScript, Fastify, PostgreSQL, Redis, and BullMQ**, this backend follows modern backend engineering best practices with observability, background jobs, and secure authentication.

<img width="1833" height="794" alt="image" src="https://github.com/user-attachments/assets/26e4cefe-e570-4a98-8ffb-1b2d782a063a" />
<img width="1793" height="803" alt="image" src="https://github.com/user-attachments/assets/408da857-9730-4a0f-99f9-53968a221ac6" />



---

# 📌 Table of Contents

* Overview
* Tech Stack
* System Architecture
* Features
* Project Structure
* Installation
* Environment Variables
* Database Setup
* Running the Application
* API Documentation
* Background Jobs
* Authentication Flow
* Observability
* Caching Strategy
* Deployment
* Security Practices
* Testing
* Future Enhancements
* License

---

# 🚀 Overview

Health Connect Backend supports:

* Patient registration & login
* Doctor onboarding & profiles
* Appointment scheduling
* Teleconsultation management
* Prescription generation
* Secure authentication with MFA
* Notification system
* Scalable async job processing
* Production-level observability

It is designed to support **thousands of concurrent users** in a real-world healthcare platform.

---

# 🧰 Tech Stack

| Category         | Technology           |
| ---------------- | -------------------- |
| Runtime          | Node.js              |
| Language         | TypeScript           |
| Framework        | Fastify              |
| Database         | PostgreSQL           |
| ORM              | Prisma               |
| Cache            | Redis                |
| Queue            | BullMQ               |
| Auth             | JWT + Refresh Tokens |
| MFA              | TOTP                 |
| API Docs         | OpenAPI 3.1          |
| Containerization | Docker               |
| Infrastructure   | Terraform            |
| Logging          | Pino                 |
| Monitoring       | Prometheus + Grafana |

---

# 🏗️ System Architecture

```
Client (Web / Mobile)
        |
        v
   API Gateway
        |
        v
   Fastify Server
   ├── Auth Module
   ├── User Module
   ├── Doctor Module
   ├── Booking Module
   ├── Consultation Module
   ├── Prescription Module
        |
        v
 PostgreSQL (Prisma ORM)

 Redis
 ├── Cache Layer
 ├── Distributed Locks
 └── BullMQ Queue

 Workers
 ├── Notifications
 ├── Reminders
 └── Reports

 Observability
 ├── Logs (Pino)
 ├── Metrics (Prometheus)
 └── Dashboards (Grafana)
```

---

# ✨ Features

## 👤 User Management

* Patient registration
* Doctor onboarding
* Role-based access control
* Profile management
* Medical history support

---

## 🩺 Doctor Module

* Doctor profiles
* Specializations
* Availability management
* Consultation pricing

---

## 📅 Appointment Booking

* Slot-based booking
* Conflict prevention
* Cancellation & rescheduling
* Appointment reminders

---

## 💬 Consultation Module

* Teleconsultation lifecycle
* Status tracking
* Session metadata storage

---

## 💊 Prescription Management

* Digital prescription creation
* Medication records
* Patient prescription history

---

## 🔐 Authentication & Security

* JWT Access Tokens
* Refresh Tokens
* TOTP Multi-Factor Authentication
* Secure password hashing

---

## ⚙️ Background Jobs

Using **BullMQ**:

* Email notifications
* SMS reminders
* Appointment reminders
* Analytics jobs

---

## 📊 Observability

* Structured logging
* Metrics collection
* Health checks
* Alerting-ready setup

---

# 📁 Project Structure

```
health-connect-backend/
│
├── src/
│   ├── app.ts
│   ├── server.ts
│
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── doctors/
│   │   ├── bookings/
│   │   ├── consultations/
│   │   └── prescriptions/
│
│   ├── common/
│   │   ├── decorators/
│   │   ├── hooks/
│   │   ├── middleware/
│   │   └── utils/
│
│   ├── config/
│   ├── database/
│   ├── queues/
│   ├── workers/
│   └── plugins/
│
├── prisma/
│   └── schema.prisma
│
├── docker/
│
├── docs/
│   └── openapi.yaml
│
├── tests/
│
├── .env.example
├── docker-compose.yml
├── package.json
└── README.md
```

---

# 🛠️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-org/health-connect-backend.git

cd health-connect-backend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

# ⚙️ Environment Variables

Create `.env` from example:

```bash
cp .env.example .env
```

Example `.env`:

```env
NODE_ENV=development

PORT=4000

DATABASE_URL=postgresql://user:password@localhost:5432/health_connect

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=super-secret-key
JWT_REFRESH_SECRET=refresh-secret

TOTP_ISSUER=HealthConnect

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user
SMTP_PASS=password

LOG_LEVEL=info
```

---

# 🗄️ Database Setup

## Run Prisma Migration

```bash
npx prisma migrate dev
```

Generate Prisma Client:

```bash
npx prisma generate
```

Seed database:

```bash
npm run seed
```

---

# ▶️ Running the Application

## Development

```bash
npm run dev
```

---

## Production

```bash
npm run build

npm start
```

---

# 📚 API Documentation

OpenAPI 3.1 documentation:

```
http://localhost:4000/docs
```

Generated using:

* Fastify Swagger Plugin
* OpenAPI 3.1

Includes:

* Request schemas
* Response schemas
* Authentication examples

---

# 🔁 Background Jobs

Powered by **BullMQ**.

## Queues:

```
emailQueue
notificationQueue
reminderQueue
analyticsQueue
```

Worker example:

```bash
npm run worker
```

---

# 🔐 Authentication Flow

```
User Login
     |
     v
Validate Credentials
     |
Generate Access Token
Generate Refresh Token
     |
Optional TOTP MFA
     |
Authenticated Session
```

Token Lifecycle:

| Token         | Expiry     |
| ------------- | ---------- |
| Access Token  | 15 minutes |
| Refresh Token | 7 days     |

---

# 📊 Observability

## Logging

Using **Pino**:

```json
{
  "level": "info",
  "message": "User logged in",
  "userId": "123"
}
```

---

## Metrics

Collected using:

* Prometheus

Metrics include:

* Request duration
* Error rate
* Queue latency
* Database latency

---

## Health Check

```
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

---

# ⚡ Caching Strategy

Using **Redis**.

Cached Entities:

* Doctor profiles
* Specializations
* Appointment slots

Cache Pattern:

```
cache:key:id
```

Example:

```
doctor:profile:123
```

---

# 🚀 Deployment

## Using Docker

```bash
docker-compose up --build
```

Includes:

* API Server
* PostgreSQL
* Redis
* Workers

---

## Infrastructure (Terraform)

Provision:

* Database
* Redis
* Load Balancer
* Monitoring stack

---

# 🔒 Security Practices

* Password hashing with bcrypt
* Rate limiting
* Helmet security headers
* Input validation
* SQL injection protection
* Secure JWT handling
* MFA with TOTP

---

# 🧪 Testing

Run tests:

```bash
npm run test
```

Test Types:

* Unit tests
* Integration tests
* API tests

Tools:

* Jest
* Supertest

---

# 📈 Performance Considerations

* Redis caching
* Async job queues
* Connection pooling
* Horizontal scaling ready
* Stateless API design

---

# 🧭 Future Enhancements

* WebRTC video integration
* Payment gateway support
* AI-based symptom checker
* EHR integration
* Multi-language support
* Audit logging
* Role-based dashboard analytics

---

# 🤝 Contributing

Steps:

1. Fork repository
2. Create feature branch
3. Commit changes
4. Open Pull Request

---

# 📄 License

MIT License

---

# 👨‍⚕️ Project Vision

Health Connect Backend is designed to support modern telemedicine workflows with reliability, security, and scalability — enabling digital healthcare platforms to deliver seamless patient experiences.
