##  Clone the repository

  ```bash
  git clone git@github.com:cap-oglu/beije-case.git
  cd beije-case
  ```

## Installation

```bash
$ npm install
```

## Set up environment variables:
  Create a `.env` file in the root directory and add the necessary environment variables:
  ```plaintext
  EMAIL_USER=your_email@example.com
  EMAIL_PASS=your_email_password_or_app_password
  ```
  **For testing purposes, an example email of mine can be used that i opened for case:**
  ```plaintext
  EMAIL_USER=testforcase00@gmail.com
  EMAIL_PASS=hyhtrkeabwqamqyk
  ```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Modules, Controllers, and Services

### User Module

- **user.module.ts**: The main module for user management. Imports the User model and provides the User service and controller.
- **user.controller.ts**: Handles incoming HTTP requests related to user actions such as registration and verification.
- **user.service.ts**: Contains the business logic for user-related operations including registration and email verification.
- **user.model.ts**: Defines the User model and its schema using Sequelize.

### Mail Module

- **mail.module.ts**: The module responsible for email functionalities. Provides the Mail service.
- **mail.service.ts**: Uses Nodemailer to send verification emails to users.

**Note**: Parts of this project were developed using [ChatGPT](https://openai.com/chatgpt) and [GitHub Copilot](https://github.com/features/copilot) for generating code snippets and project structure recommendations.

To see some of the message history of ChatGPT, you can visit [this link](https://chatgpt.com/share/6ac67e12-85ad-4075-b088-b59bee9a307f).
