# Student-Instructor Course Management API

This project is a backend API built with **TypeScript**, **Express**, **Prisma**, and **PostgreSQL**, designed to manage student and instructor functionality such as registration, login, course creation, enrollment, and more.

---

## Features

- **User Roles**: Students & Instructors
- **Authentication**: JWT-based login & register
- **Courses**:
  - Instructors can add/delete courses and view enrolled students // Students can enroll in or withdraw from courses
    
- **Validation**: Zod schema validation for API inputs
- **MVC Structure**: Organized using the Model-View-Controller pattern
# Create a .env file
- DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/yourdbname"

- JWT_SECRET="your jwt here"
# change folder
-(services)=>file(authService.ts)=>line 4 (import { Role } from "../../generated/prisma";) to(import { Role } from "@prisma/client";)

# Prisma Setup
- npx prisma generate
- npx prisma migrate dev --name init

# Start the Server
- npx ts-node-dev src/server.ts   
- npm run dev

# API Endpoints
Check the exported Postman collection or test with your own:

POST /api/auth/register

POST /api/auth/login

POST /api/courses (Instructor only)

GET /api/my-courses  (student)

DELETE /api/courses/:id   (Instructor only)

POST /api/enroll/:courseId (student)

DELETE /api/withdraw/:courseId   (student)

GET /api/instructor/my-courses (Instructor only)



 # Name: Souhaib AlMomani
