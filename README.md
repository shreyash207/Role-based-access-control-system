# Role-Based Access Control System


### **Project Overview**
The project implements a **role-based access control system** where users are assigned roles (e.g., `ADMIN`, `USER`) that determine their permissions. It includes:
1. **Authentication**: Users can sign up, log in, and log out using JWT-based authentication.
2. **Authorization**: Access to certain routes and actions is restricted based on user roles.
3. **Admin Features**: Admins can manage users and blog posts.
4. **Frontend**: A React-based client application with protected routes and role-specific views.

### **Project Demo**
Watch a brief demo: first log in as admin to showcase administrative features, then log in as test to demonstrate standard user functionality. [click here](https://drive.google.com/file/d/1PlMUnZBNHd3ad7yAwtUe4K8AdMiaLfoH/view).

For demonstration purposes
```bash
# Administrator Account
# Name: admin
# Email: admin@gmail.com
# Password: admin
# Role: ADMIN
```
<img width="1512" alt="Screenshot 2025-05-01 at 6 55 14 PM" src="https://github.com/user-attachments/assets/ee88cb02-4d47-4e5b-8343-181f02c2182c" />
<img width="1504" alt="Screenshot 2025-05-01 at 6 55 42 PM" src="https://github.com/user-attachments/assets/55f23f1d-3ba1-4b19-bd48-66a72dcd3689" />
<img width="1511" alt="Screenshot 2025-05-01 at 6 55 57 PM" src="https://github.com/user-attachments/assets/28e42cd6-f150-422b-8299-a09496201102" />
<img width="1512" alt="Screenshot 2025-05-01 at 6 56 14 PM" src="https://github.com/user-attachments/assets/b845c6f7-5423-4cba-b601-964a9de01521" />



```bash
# Standard User Account
# Name: test
# Email: test@gmail.com
# Password: test
# Role: user
```
<img width="1512" alt="Screenshot 2025-05-01 at 6 56 34 PM" src="https://github.com/user-attachments/assets/b0a855c9-4cb6-4ec0-ad1d-2363f6175ce8" />


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
    ├── package.json

```

## 🛠️ Project Setup
### 1. Clone the repository
```bash
# Note: Ensure you have Node.js (v14 or higher) installed on your system before proceeding.
# 1. git clone https://github.com/shreyash207/Role-based-access-control-system.git
# 2. cd Role-based-access-control-system
```


### 2. Configure the Client
```bash
# 1. cd Role-Based-Access-Control-System-client
# 2. npm install
# 3. cp .env-sample .env
```

### 3. Configure the Server
```bash
# 1. cd Role-Based-Access-Control-System-server
# 2. npm install
# 3. cp .env-sample .env
```

### 4. Configure Database (MongoDB Atlas)
```bash
# 1. Sign up at MongoDB Atlas and log in.
# 2. Create a new cluster and a database named "role-based-access-control".
# 3. Under “Database Access”, add a user (username/password).
# 4. Under “Network Access”, whitelist your IP (or 0.0.0.0/0 for testing).
# 5. Click “Connect → Connect your application”, copy the URI, then replace <username>, <password>, and <dbname> as needed.
# 6. Paste that URI into server/.env as MONGO_URI.
```

### 5. Run the apps
1. Start the backend server:
   ```sh
   # cd Role-Based-Access-Control-System-server
   # npm start
   ```

2. Start the frontend server:
   ```sh
   # cd Role-Based-Access-Control-System-client
   # npm start
   ```

3. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

### 6. Seed an Admin User
```bash
# To quickly create an Administrator account (role=ADMIN) for testing. Open a terminal and run:
curl --location --request POST http://localhost:5000/api/users \
  --header "Content-Type: application/json" \
  --data-raw '{
    "name": "admin",
    "email": "admin@gmail.com",
    "password": "admin",
    "role": "ADMIN"
  }'
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

