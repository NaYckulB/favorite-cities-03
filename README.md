# favorite-cities

📁 prisma
----📄 schema.prisma
📁 pages
----📄 \_app.js # Global app wrapper (includes Navbar, etc.)

----📄 index.js # Home Page with Google Map
----📄 register.js # User Registration Page
----📄 login.js # User Login Page
----📄 favorites.js # List of Favorite Cities
----📁 api
-----📄 auth/[...nextauth].ts # NextAuth API Route
-----📄📄 users.js # API for user registration
-----📄 cities.js # API for saving/retrieving cities
📁 src
----📁 components
-----📄 Map.js # Google Maps Component
-----📄 CityCard.js # Favorite City Card Component
-----📄 Navbar.js # Navigation Bar
----📁 utils
-----📄 userService.js # User-related database operations
-----📄 cityService.js # City-related database operations
📄 .env # Environment variables
