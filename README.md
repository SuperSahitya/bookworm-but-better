# Bookworm

> A Full Stack E-Commerce Application for Book Sales

Bookworm is a full-stack E-commerce application for buying books. Users can log in using their Google account, add items to cart, update cart, and checkout using Stripe for payments.

## Getting Started

1. **Fork the Repository**: Start by forking the repository to your GitHub account.

2. **Clone the Repository**: Clone the forked repository to your local machine using the following command:

   ```bash
   git clone https://github.com/your-github-username/bookworm-but-better
   ```

3. **Install Required Packages**: Navigate to the cloned directory and install the required packages:

   ```bash
   npm install
   ```

4. **Set Up .env and populate it with required Environment Variables**: Create a .env file in the root directory and add the necessary environment variables, such as:

```javascript
GOOGLE_CLIENT_ID = your_google_client_id;
GOOGLE_CLIENT_SECRET = your_google_client_secret;
NEXT_PUBLIC_STRIPE_PUBLIC_KEY = your_stripe_public_key;
STRIPE_SECRET_KEY = your_stripe_secret_key;
DATABASE_URL = your_database_uri;
```

5. **Run the Development Server**: Once the server is running, start the development server for the front-end:

   ```bash
   npm run dev
   ```

   You can also use `yarn dev`, `pnpm dev`, or `bun dev` depending on your package manager.

6. **View the Application**: Open your browser and go to [http://localhost:3000](http://localhost:3000) to see the Socket application in action.

## Project Overview

Bookworm is built using Next.js, a React framework, and is bootstrapped with `create-t3-app`. It is a part of the T3 Stack, incorporating TypeScript for static typing and Drizzle ORM for databse operations and NextAuth.js for authentication.

It incorporates the following technologies and features:

- **Next.js**: Provides server-side rendering and routing capabilities.
- **TypeScript**: Ensures static typing for a more robust codebase.
- **Zustand**: Utilized for global state management, enabling efficient data handling across components.
- **Stripe**: Integrated for secure and seamless payment processing.
- **Google OAuth**: Used for user authentication and login with Google accounts.
- **Drizzle ORM**: Utilized for database operations, including PostgreSQL for data storage.

## Additional Notes:

- Make sure to have PostgreSQL installed and running on your system or use a cloud-based PostgreSQL service.
