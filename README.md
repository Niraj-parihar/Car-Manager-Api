# Car Manager API - README

Welcome to the Car Manager API! This project aims to provide a comprehensive solution for managing cars, dealerships, and deals through a RESTful API. This document outlines the project's features, database schema, installation instructions, API documentation, and more.

## Table of Contents

- [Database Schema](#database-schema)
- [Requirements](#requirements)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Data Population](#data-population)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Database Schema

The database schema is defined using a visual diagram and can be found at [this link](https://dbdiagram.io/d/64eb8ab902bd1c4a5e7c602a). It represents the relationships between cars, dealerships, users, and deals in the system.

## Requirements

The Car Manager API strives to fulfill the following requirements:

1. Implement authentication for admins, users, and dealerships using JSON Web Tokens (JWT).
2. Enable JWT invalidation for logout and password change functionality.
3. Provide REST endpoints for users and dealerships to manage cars, dealerships, and deals.
4. Utilize geographical data for user location-based operations (using maps API).
5. Support multipart/form-data for POST requests.
6. Implement asynchronous error handling using promises for all API endpoints.
7. Utilize ES6 features and coding standards.
8. Generate dummy data using the Faker.js library.
9. Provide basic API documentation for developers.

## Installation

1. Clone this repository.
2. Install the required dependencies using `npm install`.
3. Configure environment variables for database connection and JWT secret.
4. Run the server using `npm start`.

## API Documentation

For detailed API documentation, refer to the [API Documentation](/docs/api-documentation.md) file.(Under Development)

## Authentication

Authentication is implemented using JSON Web Tokens (JWT). Users, dealerships, and admins will receive a JWT upon successful login, which will be included in the headers of subsequent requests for authentication.

## Error Handling

Asynchronous error handling is consistently applied to all API endpoints. Detailed error messages and appropriate HTTP status codes are provided to facilitate graceful error handling on the client side.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Jest
- JWT for authentication
- Faker.js for generating dummy data

## Contributing

Contributions are welcome! Please follow the guidelines outlined in the [Contributing Guidelines](/CONTRIBUTING.md) to contribute to the project.(Under Development)

## License

This project is licensed under the [MIT License](/LICENSE).

## Data Population

To populate the database with dummy data, run the following command:

```bash
npm run populate-data
