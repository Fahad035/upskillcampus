# UpSkill Campus - Digital Marketplace Platform

UpSkill Campus is a robust MERN-stack web application that serves as a digital services marketplace. Merchants can offer services, while customers can seamlessly browse, buy, and review offerings.

## 🌟 Features

### Customer
- **User Authentication**: Secure signup & login using JWT.
- **Browse & Search**: Explore and search services from various merchants.
- **Shopping Cart**: Add/remove services before checkout.
- **Payments**: Integrated with Razorpay for secure transactions.
- **Order Management**: Track and review order history.
- **Reviews & Ratings**: Share feedback on purchased services.
- **Client Portal**: Personal dashboard to manage purchases and profile.

### Merchant
- **Service Management**: Create, update, and manage services.
- **Order Tracking**: Monitor and respond to incoming orders.
- **Revenue Dashboard**: Real-time analytics on earnings and sales.
- **Merchant Dashboard**: Deep business metrics and performance insights.

### Admin
- **User Management**: Block/unblock users and merchants.
- **Platform Analytics**: View holistic platform stats and growth charts.
- **Order Management**: Oversee and resolve all platform orders.
- **Content Moderation**: Review/manage user-generated content.

## 🛠️ Tech Stack

### Backend
- **Node.js & Express.js** – REST API server.
- **MongoDB & Mongoose** – NoSQL database modeling.
- **JWT** – Authentication.
- **Razorpay** – Payment integration.
- **bcryptjs** – Secure password hashing.
- **Nodemailer** – Email notifications.
- **CORS** – Cross-origin support.

### Frontend
- **React 19** – Component-based UI framework.
- **React Router v7** – Advanced client-side routing.
- **Vite** – Super-fast development server.
- **Tailwind CSS** – Utility-first styling.
- **Axios** – Promise-based HTTP client.
- **React Icons** – Iconography.
- **jsPDF** – PDF invoice/report generation.

## 📦 Installation

### Prerequisites
- Node.js (v14 or above)
- MongoDB (local or Atlas)
- npm or yarn
- Razorpay account (for live/test payments)

### Backend Setup

1. **Clone repository & install dependencies:**
    ```bash
    git clone https://github.com/Fahad035/upskillcampus.git
    cd upskillcampus/backend
    npm install
    ```

2. **Configure environment:**
    - Create a `.env` file (refer to `.env.example` if present).
    - Add MongoDB URI, JWT secret, Razorpay keys, etc.

3. **Run the backend server:**
    ```bash
    npm run dev
    # or
    node index.js
    ```

### Frontend Setup

1. **Install dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

2. **Configure environment (if needed):**
    - Setup API endpoints or integration settings in `.env`.

3. **Start the frontend app:**
    ```bash
    npm run dev
    # The app typically runs at: http://localhost:5173
    ```

## 🏗️ Project Structure

```
upskillcampus/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```

## 🚀 Deployment

- Set up your environment (.env variables) on your cloud server.
- Connect to MongoDB Atlas or your preferred DB.
- Use Vercel/Netlify for frontend (React/Vite) and any Node-friendly host for backend (Heroku, AWS, Render).
- Configure CORS and environment variables as required.
- Url:- https://upskillcampus.vercel.app

## 🧪 Testing

- Backend: Use tools like Postman or Jest/Mocha for API testing.
- Frontend: Recommended - React Testing Library, Cypress for end-to-end tests.

## 🤝 Contributing

Found a bug or have a feature request? Open an issue or PR! 

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/foo-bar`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push branch (`git push origin feature/foo-bar`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 💡 Acknowledgements

- MERN stack inspiration
- Razorpay API documentation
- React, MongoDB, and OSS communities

---

_Your all-in-one platform for upskilling and service marketplace innovation!_
