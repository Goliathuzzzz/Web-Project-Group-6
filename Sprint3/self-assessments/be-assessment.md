# Backend Self-Assessment

## Tests

### Adding a teardown file for modularity

Replacing an ``afterAll()`` cleanup logic with a teardown file to exit the process gracefully. Moving the teardown logic to a dedicated file separates it from other test logic. This makes the test files focused solely on testing while delegating cleanup responsibilities to a centralized teardown file. This also adds reusability, when a shared ``teardown.js`` file can be reused across test suites instead of duplicating the cleanup logic in each test.

```js
module.exports = () => {
  process.exit(0);
};
```

### Improvements:
- The tests don't include failure scenarios, such as invalid credentials, missing or invalid tokens etc.
- Declaring variables like ``createdUser`` and ``userId`` globally would make using them more effective.

## Controllers

The controllers handle CRUD operations while adhering to security practices, modular design, and user experience considerations

### Contact Form Controllers

``getAllContactForms``
- Fetches all contact forms sorted by creation date (newest first).
- Returns a 200 response with the list or a 500 response on failure.

``createContactForm``
- Creates a new contact form from the provided request body.
- Returns a 201 response for success or a 400 error with details on invalid data.

``getContactFormById``
- Retrieves a contact form by its unique ID.
- Handles invalid IDs and missing forms with clear 400/404 responses.

``deleteContactForm``
- Deletes a contact form by ID.
- Provides feedback on invalid IDs or non-existent forms.

**Quality Features:**
- Error Handling: Comprehensive, with appropriate status codes and descriptive messages.
- Sorting: Ensures user-friendly ordering for listing data.
- Input Validation: Uses ``mongoose.Types.ObjectId`` for ID verification

### User Controllers

``getAllUsers``
- Lists all registered users in descending order of creation.

``createUser``
- Registers a new user with hashed passwords.
- Prevents duplicate email registrations and handles validation errors.

``getUserById``
Retrieves user data by ID, ensuring secure and efficient fetching.

``getMe``
- Fetches the currently logged-in user’s details without sensitive fields like passwords.

``userLogin``
- Validates user credentials and generates JWT tokens for authentication.

``googleLogin``
- Facilitates Google OAuth login and account creation.

``replaceUser``
- Replaces a user’s data with a new set of fields, ensuring data consistency.

``updateUser``
- Partially updates user data with an option to upload profile pictures.

``deleteUser``
- Deletes a user by ID, ensuring safe removal.

``addUserStation`` & ``removeUserStation``
Allows users to associate or disassociate stations with their profile.

**Quality Features:**
- Authentication: Secure endpoints with token-based authentication (JWT).
- Password Security: Uses bcrypt for hashing.
- Third-party Integration: Leverages Google APIs for OAuth login.
- Modular Reusability: Modularized utility functions like generateToken and hashPassword.

## Overall Strengths

**Modular Codebase**
- Separation of Concerns: Routes, middleware, and database connection are modularized for maintainability.
- Reusable Middleware: Helmet, CORS, and a custom logger middleware are implemented effectively.

**Security**
- Helmet Integration: Adds secure HTTP headers to reduce vulnerabilities like XSS and clickjacking.
- Environment Variables: Sensitive data (e.g., MONGO_URI) is stored securely in .env.

**API Documentation**
- Swagger Integration: Adds well-documented API endpoints accessible at /api-docs.
- Custom Swagger UI Styling: Enhances the visual appeal with customCssUrl and customfavIcon.

**Static Asset Handling**
- Serves static files for uploads and the public directory (/uploads and public).

**Error Prevention**
- Environment Variable Check: Ensures MONGO_URI is set before starting the application.
- Graceful Exit: Exits the process with a meaningful error message if required variables are missing.

**Scalability**
- Includes separate routes for users, chargers, reviews, and contact forms.
- Middleware like express.json() and express.urlencoded() ensures it can handle various content types.

**Development Flexibility**
Conditional server startup allows testing by exporting the app without immediately starting the server.