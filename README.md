# Project Title - ASNARO

A full-stack web application with a React frontend, Tailwind CSS, and a Node.js backend.

## project Overview
This project was designed to scale and handle over 1,000 monthly active users with a target uptime of 99.9%. The goal was to process 500+ transactions monthly while reducing infrastructure costs by 35%.

## Key Objectives:
**Real-Time Chat Feature**:   Asnaro includes a real-time chat feature, allowing immediate communication between buyers and sellers. This chat functionality also supports file uploads, enabling users to share product images, documents, and other media instantly. File previews are also supported to enhance the user experience.
**Real-Time Order and Delivery Status Updates**:   The platform includes real-time order status updates, ensuring that both sellers and buyers stay informed about the progress of orders. From confirming the order to tracking its delivery, both 
  parties can receive up-to-the-minute information about the status of the product.
**Quotation Creation and Real-Time Sharing**:   Sellers on Asnaro have access to a unique quotation creation platform. Sellers can generate customized quotes for buyers, and these quotes are sent and visible in real time to both the buyer and the seller, streamlining the negotiation process and improving transparency.
**Refund System**:   The platform features a comprehensive refund system, allowing users to initiate and manage refund requests efficiently. The system ensures a smooth and hassle-free experience for both buyers and sellers.
**Admin Dashboard**:   The admin dashboard offers robust controls for managing the platform. Admins can monitor transactions, track order statuses, manage users, and oversee the entire marketplace with ease.
**PDF Generation**:   Asnaro includes the capability to generate PDF documents for quotes, invoices, and other transactional records. These PDFs can be downloaded and shared, providing a professional touch to every transaction.
**Rating, Feedback, and Review System**:   Asnaro includes a robust rating and feedback system where buyers can rate their experience and leave reviews for the products and services they receive. This feature enhances the trust and credibility of the platform by allowing future buyers to make informed decisions based on previous customer experiences.


## Table of Contents

- [Description](#description)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
- [Backend](#backend)
- [Getting Started](#getting-started)
- [License](#license)

## Description

This project is a full-stack web application that combines a React frontend with Tailwind CSS for styling and a Node.js backend for server-side functionality. It includes configurations for TypeScript, Jest for testing, and package management using npm.

## Project Structure

The project is organized into two main folders: `frontend` and `backend`. Each folder contains its respective source code, configuration files, and package management files.

### Frontend

- **`frontend/`**
  - `public/`: Public assets and HTML template.
  - `src/`: React application source code.
    - `components/`: React components.
    - `App.tsx`: Main application component.
    - `index.tsx`: Entry point of the application.
  - `package-lock.json`: Lock file for npm dependencies.
  - `package.json`: Frontend project configuration.
  - `tailwind.config.js`: Tailwind CSS configuration.
  - `tsconfig.json`: TypeScript configuration.
  - `jest.config.js`: Jest configuration for testing.

### Backend

- **`backend/`**
  - `src/`: Node.js backend source code.
    - `routes/`: Backend route handlers.
    - `server.ts`: Express server setup.
  - `tests/`: Backend test files.
  - `package-lock.json`: Lock file for npm dependencies.
  - `package.json`: Backend project configuration.
  - `tsconfig.json`: TypeScript configuration.
  - `jest.config.js`: Jest configuration for testing.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/CareerSurvival/asnaro-webapp.git
