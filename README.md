**Vacation Planner App**

The Vacation Planner App is a web application designed to help manage vacations for company employees (collaborators). The app allows administrators to create, update, and delete collaborator records, as well as schedule vacations for each collaborator. Collaborators can view their details, including vacations scheduled for them. The app also provides error handling to ensure data integrity and validity.

## Features

- CRUD Operations: Create, Read, Update, and Delete collaborator records.
- Vacation Scheduling: Administrators can schedule vacations for collaborators, taking into account various validations and constraints (e.g., vacation duration, hire date, overlapping vacations).
- Collaborator Details: Collaborators can view their personal details and the vacations scheduled for them.
- Error Handling: Proper validation and error messages are displayed to users when incorrect data is submitted.

## Technologies Used

- Ruby on Rails: A web application framework used to develop the backend of the application.
- React: A JavaScript library used for building the frontend user interface.
- PostgreSQL: A powerful open-source relational database used for data storage.
- Axios: A popular HTTP client used for making API requests to the server.
- React Router: A routing library for handling navigation in the React application.
- RSpec: A testing framework for Ruby used to write test cases for models and controllers.
- Shoulda Matchers: A library that provides RSpec matchers for testing Rails applications.

## Setup

To set up the Vacation Planner App on your local machine, follow these steps:

1. Clone the repository:

```bash
git clone <repository-url>
cd vacation-planner-app
```

2. Install the required dependencies:

```bash
bundle install
npm install
```

3. Create and migrate the database:

```bash
rails db:create
rails db:migrate
```

4. Start the Rails server and React development server:

```bash
rails server
npm start
```

5. Access the app in your web browser at `http://localhost:3000/`.

## How to Use

1. **Collaborator Management**

   - Navigate to the homepage to view the list of collaborators.
   - Click on a collaborator's name to view their details, including scheduled vacations.
   - Click the "New Collaborator" button to add a new collaborator.
   - Fill in the collaborator's details (name, position, hire date), and click "Save" to create a new collaborator.

2. **Vacation Scheduling**

   - From the collaborator details page, click the "New Vacation" button to schedule a vacation for the collaborator.
   - Select the start date and end date for the vacation and click "Save" to schedule the vacation.

## Running Tests

To run the test suite for the models and controllers, use RSpec:

```bash
rspec
```
