# SSR E-Commerce Product Management Dashboard

This project is a Server-Side Rendered (SSR) Admin Dashboard built with Next.js for managing products in an e-commerce system.
It focuses on performance, clean architecture, and real-world admin workflows like product CRUD, image uploads, analytics, and authentication.

# Live Project

Live URL: https://ssr-ecommerce-productmanagement-das.vercel.app/

Login Page: /login

# Demo Admin Credentials

Use these credentials to access the dashboard:

Email: admin@demo.com

Password: admin123


These are dummy credentials created only for evaluation and demo purposes.


# What You Can Do?

-Log in as an admin and securely access the dashboard

-View all products rendered using SSR

-Add new products with image uploads

-View product stock, price, and category

-Delete and edit products (The Edit and Delete actions are intentionally kept minimal in the current submission. While the UI for Edit and Delete actions is present and aligned with real-world admin dashboards, full mutation handling and optimistic updates were deprioritized to focus on SSR performance, backend integration, and deployment stability. The current architecture fully supports extending Edit/Delete functionality and can be completed with additional client-side state handling if required.)

-See dashboard analytics like:

Total number of products

Total stock available

Total inventory value

-Upload and store images securely using Cloudinary

-Log out safely

# Tech Stack
Core: Next.js (App Router, SSR), React + TypeScript

Backend & Database: MongoDB Atlas, Mongoose

Image Upload: Cloudinary

Charts & Analytics: Recharts

Validation: Zod

Deployment: Vercel


# Application Workflow
Admin requests dashboard
→ Server fetches products from MongoDB
→ Page rendered on server
→ HTML sent to browser
→ Admin interacts with UI
→ Server updates data
→ UI refreshes with latest data

# Dashboard Metrics

The dashboard shows:

Total Products

Total Stock

Total Inventory Value

Stock distribution chart

These values are calculated server-side for accuracy and performance.

# Setup Instructions
1. Clone the repository

git clone https://github.com/cosmophile31/SSR-E-Commerce-Product-Management-Dashboard

cd ecommerce-admin

2. Install dependencies

npm install

3. Configure environment variables


Create a .env.local file in the project root and add:

MONGODB_URI=your_mongodb_connection_string


CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Do not commit .env.local to GitHub.

4. Run the development server

npm run dev


Open http://localhost:3000 in  the browser.


