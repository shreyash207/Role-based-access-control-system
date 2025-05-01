# Role-Based Access Control System


### **Project Overview**
The project implements a **role-based access control system** where users are assigned roles (e.g., `ADMIN`, `USER`) that determine their permissions. It includes:
1. **Authentication**: Users can sign up, log in, and log out using JWT-based authentication.
2. **Authorization**: Access to certain routes and actions is restricted based on user roles.
3. **Admin Features**: Admins can manage users and blog posts.
4. **Frontend**: A React-based client application with protected routes and role-specific views.


## 🔍 Project Structure

```bash
Role-Based-Access-Control-System/
├── server/
│   ├── constant/
│   │   ├── constant.js
│   │   └── Role.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── BlogPost.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── blogPosts.js
│   │   └── users.js
│   ├── .env
│   ├── .env-sample
│   ├── package.json
│   └── server.js
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── BlogList.js
    │   │   └── NavBar.js
    │   ├── pages/
    │   │   ├── AdminBlogDashboard.js
    │   │   ├── AdminUserDashboard.js
    │   │   ├── Blogs.js
    │   │   ├── Login.js
    │   │   ├── Profile.js
    │   │   └── Signup.js
    │   ├── styles/
    │   │   ├── AdminBlogDashboard.css
    │   │   ├── AdminUserDashboard.css
    │   │   ├── Auth.css
    │   │   ├── BlogList.css
    │   │   └── Profile.css
    │   ├── AuthContext.js
    │   ├── App.js
    │   ├── index.js
    │   └── ProtectedRoute.js
    ├── .env
    ├── .env-sample
    ├── package.json
    └── package-lock.json

```

## **How It Works**

### **Authentication**
- Users can sign up and log in using their email and password.
- JWT tokens are issued upon successful login and stored as HTTP-only cookies.

### **Authorization**
- Role-based access control is implemented using roles (`ADMIN`, `USER`).
- Middleware ensures only authorized users can access specific routes.

### **Admin Features**
- Admins can:
  - Manage users (view, assign roles).
  - Manage blog posts (create, update, delete).

### **Frontend**
- React is used for the client-side application.
- Protected routes ensure only authenticated users can access certain pages.
- Admin-specific dashboards are available for managing users and blog posts.


## **Running the Project**

1. Start the backend server:
   ```sh
   cd Role-Based-Access-Control-System-server
   npm start
   ```

2. Start the frontend server:
   ```sh
   cd Role-Based-Access-Control-System-client
   npm start
   ```

3. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

---
