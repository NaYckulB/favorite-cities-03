# Project Commands and Usage Guide

## 1. Purge the Project

To completely reset the project and remove all generated files:

- **Remove `node_modules`:**
  ```bash
  rm -rf node_modules
  ```

````

- **Remove `.next` build folder:**

  ```bash
  rm -rf .next
  ```

- **Remove the SQLite Database (if needed):**
  ```bash
  rm -f favorite_cities.db
  ```

---

## 2. Recreate the Project

To rebuild the project from scratch:

- **Install Dependencies:**

  ```bash
  npm install
  ```

- **Reinitialize Prisma:**
  If `schema.prisma` or migrations are missing:

  ```bash
  npx prisma init
  ```

- **Apply Database Migrations:**
  This recreates the database schema:

  ```bash
  npx prisma migrate dev --name init
  ```

- **Generate Prisma Client:**
  If the database schema changes:
  ```bash
  npx prisma generate
  ```

---

## 3. Run the Project

To start the development environment:

- **Start the Development Server:**

  ```bash
  npm run dev
  ```

- **Build for Production:**

  ```bash
  npm run build
  ```

- **Run in Production:**
  After building:
  ```bash
  npm start
  ```

---

## 4. Using Prisma

To manage and inspect the database:

- **Open Prisma Studio:**
  Launch a web interface to view and manage database records:

  ```bash
  npx prisma studio
  ```

- **Run Migrations:**
  Apply schema changes to the database:

  ```bash
  npx prisma migrate dev --name <migration_name>
  ```

- **Reset the Database:**
  Reapply migrations and reset data:
  ```bash
  npx prisma migrate reset
  ```

---

## 5. Google Maps API

To test and debug the Google Maps integration:

- **Set Up API Key:**
  Add this to `.env`:

  ```env
  GOOGLE_MAPS_API_KEY=your_api_key_here
  ```

- **Test the Map Component:**
  Visit the home page (`http://localhost:3000`) to verify the map loads correctly.

---

## 6. Authentication

To test user registration and login:

- **Register a User:**

  - Use an API endpoint (`POST /api/users`) or run a script (e.g., `addUser.js`) to create users.

- **Test Login:**

  - Visit `/login` to test the login functionality.

- **Debug Sessions:**
  - View session details at `/api/auth/session`.

---

## 7. Debugging and Linting

To ensure code quality and debug issues:

- **Run ESLint:**

  ```bash
  npm run lint
  ```

- **Clear Cache:**
  If Next.js builds are behaving unexpectedly:

  ```bash
  rm -rf .next
  ```

- **View Logs:**
  Add logs in key areas (e.g., `console.log` in `auth.ts`) for debugging.

---

## 8. Additional Commands

- **Install New Dependencies:**

  ```bash
  npm install <package_name>
  ```

- **Upgrade Dependencies:**

  ```bash
  npm update
  ```

- **Remove Dependencies:**
  ```bash
  npm uninstall <package_name>
  ```

---

## Notes

- Keep `.env` secure and never commit it to version control.
- Always restart the server after changing `.env` or database settings:
  ```bash
  npm run dev
  ```

```

```
````
