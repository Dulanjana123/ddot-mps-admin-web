# DDOT MPS Admin Web

## Overview

This React TypeScript application is built using Vite for fast development and optimized builds. It leverages Docker for containerization and supports multiple environments such as local, development, qa and staging.

## Features

- **Fast Development**: Utilizes Vite for a fast development server and optimized builds.
- **TypeScript**: Ensures type safety and better development experience.
- **Dockerized**: Fully containerized application for consistent environments.
- **Environment-specific Configurations**: Supports different configurations for local, development, staging, and QA environments.

## Prerequisites

- Node.js (v18.x or later)
- npm (v6.x or later)
- Docker (v20.x or later)
- Docker Compose (v1.29.x or later)
- Familiarity with React, TypeScript, and Docker.

## Installation

1. Clone the repository.
2. Install dependencies.

```sh
npm install
```

## Running the Application

### Using npm

To run the application in the local environment:

```
npm run dev:local
```

To run the application in the development environment:

```
npm run dev:development
```

To run the application in the qa environment:

```
npm run dev:qa
```

To run the application in the staging environment:

```
npm run dev:staging
```

### Using Docker

To run the application using Docker Compose in the development environment:

```
docker-compose --env-file .env.development up --build
```

To run the application using Docker Compose in the qa environment:

```
docker-compose --env-file .env.qa up --build
```

To run the application using Docker Compose in the staging environment:

```
docker-compose --env-file .env.staging up --build
```

## Building the Application

To build the application in the local environment:

```
npm run build:local
```

To build the application in the development environment:

```
npm run build:development
```

To build the application in the qa environment:

```
npm run build:qa
```

To build the application in the staging environment:

```
npm run build:staging
```
