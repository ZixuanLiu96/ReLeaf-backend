# ReLeaf-backend

🌿 ReLeaf - Plant Adoption Platform

ReLeaf is a modern plant adoption platform that connects people with plants they can adopt, care for, and grow with.
Built with Node.js, Express, and MongoDB (Mongoose), it promotes sustainable living and environmental awareness.

🚀 Features

🪴 Browse available plants for adoption
💚 User registration and authentication (JWT-based)
🌱 Adopt or return plants
📸 Upload and display plant images
📖 Plant care instructions
👩‍🌾 Admin dashboard to manage users and plants

| Category               | Technology              |
| ---------------------- | ----------------------- |
| **Backend Framework**  | Express.js              |
| **Database**           | MongoDB + Mongoose      |
| **Authentication**     | JSON Web Token (JWT)    |
| **File Upload**        | Multer / Cloudinary     |
| **Language**           | JavaScript (ES Modules) |
| **Environment Config** | dotenv                  |

| Method     | Endpoint            | Description              | Access               |
| ---------- | ------------------- | ------------------------ | -------------------- |
| **GET**    | `/api/plants`       | Get all plants           | Public               |
| **GET**    | `/api/plants/:id`   | Get single plant details | Public               |
| **POST**   | `/api/plants`       | Create a new plant       | Admin/(public later) |
| **PATCH**  | `/api/plants/:id`   | Update plant info        | Admin/(public later) |
| **DELETE** | `/api/plants/:id`   | Delete plant             | Admin/(public later) |
| **POST**   | `/api/users/signup` | Register a new user      | Public               |
| **POST**   | `/api/users/login`  | User login               | Public               |
| **GET**    | `/api/users/:id`    | Get user details         | Authenticated        |
| **POST**   | `/api/adoptions`    | Adopt a plant            | Authenticated        |

🧑‍💻 Developer

Author: Zixuan Liu
Email: liusherry08@gmail.com
GitHub: @ZixuanLiu96
