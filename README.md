# Taskflow To-Do Board - Frontend

A fully-featured task management application built with the MERN stack, featuring dynamic board layouts, customizable columns, and responsive design for optimal productivity across all devices.

## 🎯 Mission Overview

This project demonstrates proficiency in full-stack MERN development through a comprehensive To-Do List application with advanced board management capabilities. The application emphasizes clean architecture, intuitive user experience, and modern web development best practices.

[![View Backend Repo](https://img.shields.io/badge/View-Backend_Repo-blue?style=for-the-badge)](https://github.com/Kimlong168/ANB-Taskflow-Backend)

[![Watch Demo](https://img.shields.io/badge/▶️%20Watch%20Demo-YouTube-red?logo=youtube)](https://youtu.be/Mx0VF5Bk5Mg?si=1hh1r0oVZXzqFHKY)


## ✨ Core Features

### 📋 Task Management (CRUD Operations)
- **Create Tasks**: Add new tasks with title, description and priority
- **Read Tasks**: View all tasks across different columns and layouts
- **Update Tasks**: Edit task details and move between columns (drag and drop)
- **Delete Tasks**: Remove completed or unwanted tasks with confirmation
- **Multiple boards**: User can create boards as much as they need

### 🗂️ Dynamic Board View
- **Kanban-Style Columns**: Visual task organization (To Do, Doing, Done)
- **Custom Column Management**: Users can create, rename, and delete columns
- **Drag & Drop**: Intuitive task movement between columns
- **Column Ordering**: Reorder columns to match workflow preferences
- **Visual Indicators**: User can add color to each column


### 📝 List/Board View (Bonus Feature)
- **Toggle Between Views**: Switch between board and list layouts

### 🔑 Authentication
- **Authentication**: User can register a new account or login to access their boards
  
### 📱 Responsive Interface
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Desktop Experience**: Enhanced functionality for larger screens
- **Touch-Friendly**: Intuitive drag-and-drop on mobile devices
- **Adaptive Layout**: Seamlessly adjusts to any screen size


## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite (Build tool and dev server)
- React Beautiful DnD (Drag and drop functionality)
- Tailwind CSS (Styling and responsive design)
- Shadcn (UI library)
- React Router DOM (Client-side routing)
- Axios (HTTP client)
- React Toastify (Notifications)
- Lucide React (Icons)

**Development Tools:**
- ESLint (Code linting)
- Prettier (Code formatting)

## 📋 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Kimlong168/ANB-Taskflow-Client.git

cd ANB-Taskflow-Client
```

### 2. Install Dependencies

**Install all dependencies:**
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_APP_BASE_URL=http://localhost:5173

```

**Frontend development server:**
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Production Build

**Build the frontend:**
```bash
npm run build
```

## 🧱 Component Structure: Atomic Design

This project follows the **Atomic Design** methodology by [Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/) for organizing UI components in a scalable and maintainable way.

### 🔹 Structure Overview

- **Atoms** – Basic building blocks of the interface  
  _Examples: Button, Input, Label_

- **Molecules** – Groups of atoms that form a small, functional unit  
  _Examples: Form Field, Modal Header_

- **Organisms** – Complex UI components made up of molecules and atoms  
  _Examples: Navbar, Card, Product List_

- **Templates** – Page-level layout with placeholder content  
  _Examples: Dashboard Layout, Auth Page Template_

- **Pages** – Specific screens with real data and logic  
  _Examples: Home Page, Login Page_

📖 **Reference**: [Atomic Design by Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)

## 🎨 Design Decisions

### Architecture Choices

**Frontend Architecture:**
- **Component-Based Design**: Modular, reusable components for maintainability
- **Custom Hooks**: Centralized state management and API logic
- **Service Layer**: Abstracted API calls for clean separation of concerns
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technology Justification

**React with Vite:**
- Fast development server and build times
- Modern bundling with tree-shaking
- Better developer experience than Create React App

**MongoDB with Mongoose:**
- Flexible schema for evolving task requirements
- Easy integration with Node.js
- Powerful querying capabilities

**Express.js Framework:**
- Lightweight and fast
- Extensive middleware ecosystem
- Perfect for RESTful APIs

## ✨ Bonus Features Implemented

### 🎛️ Advanced Column Management
- **Dynamic Column Creation**: Users can add custom workflow stages
- **Column Customization**: Rename columns to match team terminology
- **Column Deletion**: Remove unused workflow stages
- **Column Reordering**: Drag columns to optimize workflow layout
- **Column Color Coding**: Visual distinction between different stages

### 📱 Enhanced Mobile Experience
- **Mobile-Optimized Drag & Drop**: Smooth touch interactions
- **Responsive Column Layout**: Horizontal scrolling on mobile
- **Quick Actions Menu**: Context menus for rapid task updates

### 🔄 List View Toggle
- **Seamless View Switching**: Toggle between board and list views

### 🎨 User Experience Enhancements
- **Dark/Light Mode**: System preference detection and manual toggle
- **Loading States**: Smooth transitions and feedback

## 📸 Application Screenshots

### Landing Page (Home)
![Landing Page](https://res.cloudinary.com/dzbtplz1o/image/upload/v1750676543/home_zphs9y.png)
*Dynamic board layout with customizable columns and drag-and-drop functionality*

### Desktop Board View
![Landing Page](https://res.cloudinary.com/dzbtplz1o/image/upload/v1750676491/Screenshot_2025-06-23_175941_l7f9nc.png)
*Dynamic board layout with customizable columns and drag-and-drop functionality*

### Mobile Responsive Design
![Mobile View](https://res.cloudinary.com/dzbtplz1o/image/upload/v1750676907/iPhone-13-PRO-localhost_vt4t78.png)
*Optimized mobile experience with touch-friendly interactions*

### List View Toggle
![List View](https://res.cloudinary.com/dzbtplz1o/image/upload/v1750676491/Screenshot_2025-06-23_180000_kdzpsd.png)
*Seamless switching between board and list layouts*

### Borads List
![Column Management](https://res.cloudinary.com/dzbtplz1o/image/upload/v1750676490/Screenshot_2025-06-23_175835_sqoo8e.png)
*View all available boards*

### Adding a new column
![Column Management](https://res.cloudinary.com/dzbtplz1o/image/upload/v1750677476/Screenshot_2025-06-23_181727_zj9rus.png)
*Adding a new column to the board*

### Dark Mode
![List View](https://res.cloudinary.com/dzbtplz1o/image/upload/v1750676491/Screenshot_2025-06-23_175951_lke7jo.png)
*Seamless switching between dark and light mode*

### 🚀 Demo Video
[![Task CRUD Operations](https://img.youtube.com/vi/b0YGkyuZeWY/0.jpg)](https://youtu.be/Mx0VF5Bk5Mg?si=1hh1r0oVZXzqFHKY)
> **Watch Demo** – *Complete task lifecycle: create, update, move, and delete*

## 👨‍💻 Author

**Chann Kimlong**
- GitHub: [@Kimlong168](https://github.com/Kimlong168)
- Portfolio: [Portfolio Website](https://kimlongchann.dev)

## 🙏 Acknowledgments

- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn**: UI Library for react js
- **React Beautiful DnD**: Excellent drag-and-drop library

---

**Project Completion**: Monday, June 23rd, 2024 (On Schedule)
