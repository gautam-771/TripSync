# ✈️ TripSync – Smart Trip Planning & Expense Management

TripSync is a full-stack trip planning and expense management application built to help users organize trips, collaborate with members, manage travel itineraries, store important documents, and split expenses.

The application provides a centralized platform where users can plan and manage their trips while keeping travel-related information organized.

## 🚀 Key Features

- **User Authentication:** Secure registration, login and JWT-based authentication.
- **Trip Management:** Create, view and manage trips with destinations and travel dates.
- **Trip Invitations:** Invite members to trips with different access roles.
- **Itinerary Management:** Organize daily travel plans and activities.
- **Document Management:** Upload, view and download trip-related documents.
- **Expense Management:** Add expenses and split costs among trip members.
- **Member Balances:** Track how much each member owes or should receive.
- **Settlements:** Record payments between trip members.
- **Notifications:** Receive notifications about trip invitations and related activities.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Backend | Java, Spring Boot |
| Frontend | React, Vite, JavaScript |
| Security | Spring Security, JWT |
| Database | MySQL |
| ORM | Spring Data JPA, Hibernate |
| API Documentation | Swagger / OpenAPI |
| Email Integration | JavaMailSender, SMTP |
| Build Tool | Maven |

## 🏗️ System Architecture


TripSync follows a layered backend architecture. The React frontend communicates with the Spring Boot backend through REST APIs.

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'background': '#000000',
    'primaryColor': '#050b1a',
    'primaryTextColor': '#ffffff',
    'primaryBorderColor': '#3b82f6',
    'lineColor': '#9ca3af',
    'secondaryColor': '#050b1a',
    'tertiaryColor': '#050b1a',
    'clusterBkg': '#030816',
    'clusterBorder': '#2563eb'
  }
}}%%
flowchart TD
    User([User])

    subgraph Frontend ["React Frontend"]
        direction TB
        F1["Dashboard<br/>Trips / Invitations"]
        F2["Itinerary<br/>Documents / Expenses"]
    end

    HTTP["HTTP Request (with JWT<br/>Token)"]

    subgraph Backend ["Spring Boot Backend"]
        direction TB
        Sec["Spring Security + JWT<br/>(Authenticate & Authorize<br/>Request)"]
        Ctrl["Controller Layer<br/>(Handle Request)"]
        Svc["Service Layer<br/>(Business Logic)"]
        Repo["Repository Layer<br/>(Database Operations)"]

        Sec --> Ctrl
        Ctrl --> Svc
        Svc --> Repo
    end

    DB[(MySQL Database)]

    User --> F1
    User --> F2
    F1 --> HTTP
    F2 --> HTTP
    HTTP --> Backend
    Repo --> DB

    classDef darkBox fill:#050b1a,stroke:#3b82f6,stroke-width:2px,color:#ffffff;
    classDef subgraphStyle fill:#030816,stroke:#2563eb,stroke-width:2px,color:#ffffff;

    class User,F1,F2,HTTP,Sec,Ctrl,Svc,Repo,DB darkBox;
    class Frontend,Backend subgraphStyle;
```


### Request Processing Flow

```mermaid
sequenceDiagram
    actor User
    participant React as React Frontend
    participant Security as JWT Security
    participant Controller as REST Controller
    participant Service as Service Layer
    participant Repository as Repository Layer
    participant DB as MySQL

    User->>React: Perform an action
    React->>Security: HTTP Request + JWT
    Security->>Security: Validate token
    Security->>Controller: Authorized request
    Controller->>Service: Call business method
    Service->>Repository: Database operation
    Repository->>DB: Execute query
    DB-->>Repository: Return data
    Repository-->>Service: Return result
    Service-->>Controller: Response
    Controller-->>React: JSON response
    React-->>User: Display result
```

## 💡 Backend Concepts Implemented

The backend demonstrates practical implementation of the following Spring Boot and Java concepts:

- Layered Architecture – Controller, Service and Repository.
- RESTful API Development.
- Spring Security and JWT Authentication.
- Role-Based Authorization.
- DTO (Data Transfer Object) Pattern.
- Bean Validation.
- Spring Data JPA and Hibernate.
- Entity Relationships and Database Mapping.
- Custom Exception Handling.
- Transaction Management.
- File Upload and Download.
- Email Integration using SMTP.
- API Documentation using Swagger / OpenAPI.

## 📸 Application Screenshots

### 1. Swagger API Documentation

Shows the API documentation generated using Swagger / OpenAPI.

![TripSync Swagger API](docs/screenshots/Swagger.png)

### 2. Application Dashboard

Displays the dashboard with trip information, destinations and upcoming travel plans.

![TripSync Dashboard](docs/screenshots/Dashboard.png)

### 3. Expenses and Member Balances

Displays expense management, member balances and settlement functionality.

![TripSync Expenses and Balances](docs/screenshots/Expenses-Balance.png)

### 4. Invitations and Notifications

Displays trip invitation notifications and their acceptance status.

![TripSync Invitations](docs/screenshots/Invitations.png)

### 5. Data stored
The User Registered and all the Activities

![TripSync_DataBase](docs/screenshots/MySql-Db.png)

## ⚙️ How to Run the Project

### Prerequisites

- Java Development Kit
- Maven (or Maven Wrapper)
- Node.js and npm
- MySQL Server

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd TripSync
```

### 2. Configure the Database

Create a MySQL database:

```sql
CREATE DATABASE tripsync_db;
```

Configure your database username, password and other application properties in the backend configuration.

Configure your email SMTP settings if you want to use invitation email functionality.

Do not commit passwords, JWT secrets or other private credentials to GitHub.

### 3. Run the Backend

Open the backend directory:

```bash
cd backend
```

Run the Spring Boot application using the Maven Wrapper:

**Windows:**

```powershell
.\mvnw spring-boot:run
```

The backend runs at:

`http://localhost:8080`

Swagger documentation:

`http://localhost:8080/swagger-ui/index.html`

### 4. Run the Frontend

Open another terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

`http://localhost:5173`

## 👨‍💻 Project Structure

```text
TripSync/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── docs/
│   └── screenshots/
│       ├── swagger-api.png
│       ├── dashboard.png
│       ├── expenses-balances.png
│       └── invitations.png
│
├── README.md
└── .gitignore
```

## 🎯 Project Objective

TripSync was developed to demonstrate full-stack application development using React and Spring Boot, with a focus on backend development, secure REST APIs, database management and practical business logic.

---

**TripSync – Plan. Travel. Sync.**