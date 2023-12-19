# Social Media App

Welcome to the Social Media App! This web application allows users to post messages, view all messages, and perform various social interactions.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Database Configuration](#database-configuration)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Introduction

The Social Media App provides a platform for users to share messages, engage with content, and connect with others. This README will guide you through the setup and usage of the application.

## Features

- User authentication and registration
- Posting new messages
- Viewing all messages
- Updating and deleting messages

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/isomer04/social-media-app.git
   ```

2. Navigate to the project directory:

  ```bash
  cd social-media-app
```
3. Install dependencies:
  ```bash
  npm install
  ```

## Usage
To run the Social Media App, use the following command:

```bash
npm start
```

Visit http://localhost:3000 in your web browser to access the application.



## Database Configuration
Ensure that you have a MySQL database set up with the following configuration:

- Database name: social_media_db
- Tables: accounts, messages

For table schema details, refer to the SQL commands in the Database Configuration section of this README.

## API Endpoints
- POST /register: Register a new user
- POST /login: Log in as an existing user
- GET /accounts/username/{username}/userId: Retrieve user ID by username
- GET /allmessages: Retrieve all messages
- POST /messages: Create a new message
- GET /messages: Retrieve all user messages
- GET /messages/{message_id}: Retrieve a message by ID
- DELETE /messages/{message_id}: Delete a message by ID
- PATCH /messages/{message_id}: Update a message by ID

For detailed API documentation, refer to the API Endpoints section of this README.

## Contributing
We welcome contributions! Please follow the Contributing Guidelines for details on how to contribute to this project.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
The Social Media App was built using React and Java with Javalin.
Special thanks to the developers of axios for simplifying HTTP requests.

