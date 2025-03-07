# Clinic Queue Management System (CQMS)

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
   - [Database Setup](#database-setup)
6. [Configuration](#configuration)
   - [Environment Variables](#environment-variables)
   - [AI Model Integration](#ai-model-integration)
7. [Usage](#usage)
   - [Starting the Application](#starting-the-application)
   - [Accessing the Application](#accessing-the-application)
8. [API Documentation](#api-documentation)
   - [Authentication Endpoints](#authentication-endpoints)
   - [Patient Management Endpoints](#patient-management-endpoints)
   - [Queue Management Endpoints](#queue-management-endpoints)
9. [AI-Powered Time Estimation](#ai-powered-time-estimation)
   - [Model Training](#model-training)
   - [Integration with CQMS](#integration-with-cqms)
10. [Testing](#testing)
    - [Unit Tests](#unit-tests)
    - [Integration Tests](#integration-tests)
11. [Deployment](#deployment)
    - [Docker Deployment](#docker-deployment)
    - [Kubernetes Deployment](#kubernetes-deployment)
12. [Contributing](#contributing)
13. [License](#license)
14. [Contact](#contact)

---

## Introduction

The **Clinic Queue Management System (CQMS)** is a comprehensive solution designed to optimize patient flow within clinics. By leveraging modern web technologies and integrating an AI-powered time estimation model, CQMS aims to reduce patient wait times, enhance operational efficiency, and improve overall patient satisfaction.

---

## Features

- **Patient Registration:** Allows patients to register upon arrival, capturing essential details for queue management.
- **Queue Management:** Dynamically manages patient queues, ensuring fair and efficient service order.
- **AI-Powered Time Estimation:** Utilizes machine learning to predict waiting times, providing patients with accurate estimates.
- **Notification System:** Sends real-time updates to patients regarding their position in the queue and estimated wait times.
- **Admin Dashboard:** Provides clinic staff with tools to monitor queues, manage patient information, and adjust priorities as needed.
- **Reporting and Analytics:** Generates reports on patient flow, wait times, and service efficiency to aid in decision-making.

---

## Technology Stack

- **Frontend:**
  - React.js
  - Tailwind CSS for styling
  - Bootstrap for UI components 

- **Backend:**
  - Node.js with Express.js
  - MySQL database with Sequelize ORM
  - JWT for authentication-endpoints
  

- **AI Model:**
  - Python with scikit-learn
  - Random Forest algorithm for time estimation 

---

## System Architecture

The CQMS is structured into three main components:

1. **Frontend:** A React.js application that interacts with users, providing interfaces for patient registration, queue status viewing, and administrative controls.
2. **Backend:** An Express.js server that handles API requests, manages business logic, and communicates with the database.
3. **AI Module:** A Python-based service that predicts waiting times using a trained Random Forest model.

![System Architecture Diagram](./docs/system_architecture.png)

---

## Installation

### Prerequisites

- **Node.js:** Ensure you have Node.js (version 14 or higher) installed. [Download Node.js](https://nodejs.org/)
- **MongoDB:** A running instance of MongoDB (local or cloud-based). [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) is recommended for cloud deployment.
- **Python:** Python 3.7 or higher for the AI module. [Download Python](https://www.python.org/downloads/)
- **Docker:** For containerized deployment. [Get Docker](https://www.docker.com/get-started)

### Backend Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/gdg/smart_queue.git
   cd smart_queue/backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the `backend` directory with the following content:

   ```env
   PORT=5000
   MySQL_HOST=localhost
   MySQL_USER=root
   MysQL_PASSWORD=MysQL_PASSWORD
   MYSQL_DATABASE=smart_queue
   ```

4. **Start the Backend Server:**

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory:**

   ```bash
   cd ../client
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the `frontend` directory with the following content:

   ```env
   BASE_URL=http://localhost:5000/api
   ```

4. **Start the Frontend Server:**

   ```bash
   npm start
   ```

### Database Setup

    We used MySQL for the database. You can use any other database of your choice. In this project we have used all of the CRUD operations. 
---

## Configuration

### Environment Variables

- **Backend:**
  - `PORT`: Port on which the backend server runs.
  - `MYSQL_HOST`: connection string.
  - `AI_TRAINED_MODULE`: URL of the AI prediction service.

- **Frontend:**
  - `BASE_URL: Base URL for API requests.

### AI Model Integration

The AI module is a separate Python service that predicts patient waiting times.

1. **Navigate to the AI Module Directory:**

   ```bash
   cd ../AI
   ```

2. **Create a Virtual Environment and Activate It:**

   ```bash
   python -m venv env
   source env/bin/activate  # On Windows, use 'env\Scripts\activate'
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Start the AI Service:**

   ```bash
   python train.py 
   python predict.py 
   ```
   The service will return a prediction for the given input data. based on the trained model. we trained our model with the about half a thousands data points.

---

## Usage

### Starting the Application

1. **Backend:** Ensure the backend server is running on the specified port.
2. **Frontend:** Ensure the frontend server is running and accessible.
3. **AI Module:** Ensure the AI prediction service is active.

### Accessing the Application

- **Patients:** Access the patient registration and queue status pages via the frontend URL.
- **Administrators:** Access the admin dashboard through the frontend, with appropriate authentication.

---

