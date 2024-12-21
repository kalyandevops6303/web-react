
# Trumio Web React 

## Project Overview

This is a React-based web application designed for Trumio Flexternships.

## Folder Structure

Here's an overview of the project's folder structure:

```
/trumio-web-react/
│
├── .dockerignore                              # Files to be ignored by Docker
├── .env.tru-production.local                  # Flexternships Production environment variables
├── .env.truqa.local                           # Flexternships QA environment variables
├── .env.trudev.local                          # Flexternships Test environment variables
├── .env.tru-uat.local                         # Flexternships UAT environment variables
├── .eslintignore                              # Files to be ignored by ESLint
├── .eslintrc                                  # ESLint configuration - currently not used
├── .gitignore                                 # Git ignore rules
├── .prettierrc.json                           # Prettier configuration
│
├── /src/                                      # Source code files
│   ├── @flexternships/                        # Flexternships Application Source Code
│   │   ├── actions/                           # Redux actions and action creators
│   │   ├── app/                               # Main application components
│   │   │   └── components/                    # Reusable UI components
│   │   │       ├── core/                      # Core design system components
│   │   │       ├── pages/                     # Page specific components
│   │   │       └── ui/                        # Shadcn components
│   │   ├── assets/                            # Static assets specific to flexternships
│   │   ├── constraints/                       # Type definitions and enums
│   │   │   ├── types/                         # TypeScript type definitions
│   │   │   └── enums/                         # Enumerated values
│   │   ├── lib/                               # Helper functions and utilities
│   │   ├── schemas/                           # Data validation schemas
│   │   ├── services/                          # API service integrations
│   │   ├── stores/                            # State management stores
│   │   ├── styles/                            # Styling and theme files
│   │   └── utils/                             # Utility functions
│   ├── @core/                                 # Core functionalities and assets
│   ├── assets/                                # Static assets like images and icons
│   ├── CometChatWorkspace/                    # Integration with CometChat for real-time chat
│   ├── configs/                               # Configuration files for various environments
│   ├── layouts/                               # Layout components for pages
│   ├── lib/                                   # Custom and third-party libraries
│   ├── navigation/                            # Routing and navigation logic
│   ├── redux/                                 # Redux state management
│   ├── router/                                # Application routes
│   ├── services/                              # API service files
│   ├── utility/                               # Utility functions
│   ├── views/                                 # Page-level components representing different views
│   ├── App.css                  
│   ├── App.js                
│   ├── App.test.js     
│   ├── constant.js                
│   ├── index.js                
│   ├── index.css                    
│   └── serviceWorker.js             
│   
├── /public/                                   # Public static files
│
├── package.json                               # Node.js dependencies and scripts
└── README.md                                  # Project documentation 
```

## Detailed Functionality

1. **Real-Time Chat:**  
   The project includes a real-time chat feature powered by CometChat. This allows users to communicate in real time, making it ideal for collaborative environments.

2. **State Management (Redux):**  
   The application uses Redux for state management, ensuring a scalable and maintainable state across different components and views.

3. **Routing (React Router):**  
   The app features dynamic routing using React Router, allowing for seamless navigation between different pages and components.

4. **Custom Libraries:**  
   The `lib/` folder contains custom-built libraries or direct integrations of third-party libraries that provide additional functionality.

5. **Layouts and Views:**  
   The project follows a modular approach by separating layout components and page-specific views, enhancing code reusability and organization.

6. **Service Worker:**  
   Offline capabilities are supported through a service worker, improving the user experience in low or no network environments.

7. **Environment Configurations:**  
   The project supports multiple environments (development, production, QA, UAT) with separate configuration files for each.

## Dependencies

This project relies on the following tools and libraries:

- **React:** Frontend library
- **Redux:** State management
- **React Router:** Routing library
- **CometChat:** Real-time chat integration
- **Docker:** Containerization tool
- **ESLint:** Linter for JavaScript/React code
- **Prettier:** Code formatter

You can find all dependencies in the `package.json` file.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/trumio/trumio-web-react.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd trumio-web-react
   ```

3. **Install Dependencies with Yarn:**

   ```bash
   yarn install
   ```

4. **Set Up Environment Variables:**
   - Copy the appropriate `.env` file based on your environment (development, production, etc.).
   - Customize the environment variables as needed.

5. **Run the Development Server:**

   ```bash
   yarn start
   ```

## Usage

Here’s how you can use different scripts with Yarn:

- **Development Server:**

  ```bash
  yarn start
  ```

- **Production Build:**

  ```bash
  yarn build
  ```

- **Run Tests:**

  ```bash
  yarn test
  ```

- **Linting and Formatting:**

  - **Linting with ESLint:**

    ```bash
    yarn lint
    ```

  - **Formatting with Prettier:**

    ```bash
    yarn prettier
    ```

## Detailed Code Explanation


### Key Components:

- **`App.js`:**  
  The main entry point for the application. It initializes routing, applies global styles, and sets up Redux state management.

- **`index.js`:**  
  The root file that renders the app into the DOM. It’s responsible for bootstrapping the entire application.

- **`layouts/`:**  
  Contains reusable layout components that define the structure of different pages, such as header, footer, and sidebar components.

- **`views/`:**  
  Page-specific components that represent different screens of the application, such as the home page, login page, and dashboard.

- **`services/`:**  
  Handles communication with external APIs, abstracts API calls, and manages response handling.


---

