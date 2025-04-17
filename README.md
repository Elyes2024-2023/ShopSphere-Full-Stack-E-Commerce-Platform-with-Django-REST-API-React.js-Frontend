# ShopSphere - E-Commerce Platform
> Developed by ELYES

A full-stack e-commerce platform built with Django and React.

## Copyright
© 2024-2025 ELYES. All rights reserved.

## Features

* Full featured shopping cart
* Product reviews and ratings
* Top products carousel
* Product pagination
* Product search feature
* User profile with orders
* Admin product management
* Admin user management
* Admin Order details page
* Mark orders as delivered option
* Checkout process (shipping, payment method, etc)
* PayPal / credit card integration
* Database seeder (products & users)

## Tech Stack

### Frontend

* React.js
* Redux (State Management)
* React Router
* React Bootstrap
* Axios

### Backend

* Django
* Django REST Framework
* PostgreSQL
* JWT Authentication

## Installation

### Backend Setup

1. Create virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

1. Install dependencies:

cd backend
pip install -r requirements.txt

1. Run migrations:

python manage.py migrate

1. Create superuser:

python manage.py createsuperuser

1. Run server:

python manage.py runserver

### Frontend Setup

1. Install dependencies:

cd frontend
npm install

1. Run development server:

npm start

## Environment Variables

Create a .env file in the backend directory with the following variables:

```
SECRET_KEY=your_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgres://user:password@localhost:5432/dbname
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your_email@gmail.com
EMAIL_HOST_PASSWORD=your_app_password
```

## API Endpoints

### Products

* GET /api/products/ - List all products
* GET /api/products/:id/ - Get product details
* POST /api/products/ - Create product (admin)
* PUT /api/products/:id/ - Update product (admin)
* DELETE /api/products/:id/ - Delete product (admin)

### Users

* POST /api/users/login/ - Login user
* POST /api/users/register/ - Register user
* GET /api/users/profile/ - Get user profile
* PUT /api/users/profile/ - Update user profile

### Orders

* POST /api/orders/ - Create order
* GET /api/orders/:id/ - Get order details
* PUT /api/orders/:id/pay/ - Update order to paid
* GET /api/orders/myorders/ - Get logged in user orders

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Authors

* **ELYES** - *Initial work* - [Elyes2024-2023](https://github.com/Elyes2024-2023)

## Acknowledgments

* Django REST Framework team
* React.js community
* All contributors and supporters

---

Developed by ELYES
© 2024-2025 ELYES. All rights reserved.

## 🚀 Features

- 🛍️ Product Management with AI-powered categorization
- 🛒 Secure Cart & Checkout with Stripe Integration
- 🔐 JWT Authentication & Social Login
- 📦 Real-time Inventory Management
- 🔎 Advanced Search with Elasticsearch
- 💬 Reviews & Ratings System
- 📈 Admin Analytics Dashboard
- 📱 Mobile-First Responsive Design

## 🛠️ Tech Stack

### Backend
- Django & Django REST Framework
- PostgreSQL (Production) / SQLite (Development)
- Redis for Caching
- JWT Authentication
- Elasticsearch for Search
- AWS S3 for Media Storage

### Frontend
- React.js with Redux Toolkit
- Tailwind CSS
- Chart.js
- React Query
- Formik

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+
- PostgreSQL (for production)
- Redis
- Elasticsearch

### Backend Setup

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start development server:
```bash
python manage.py runserver
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm start
```

## 📦 Production Deployment

The project is configured for deployment on:
- Heroku
- AWS EC2
- Docker

See deployment documentation for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

* **ELYES** - *Initial work* - [Elyes2024-2023](https://github.com/Elyes2024-2023)

## 🙏 Acknowledgments

* Django REST Framework team
* React.js community
* All contributors and supporters 