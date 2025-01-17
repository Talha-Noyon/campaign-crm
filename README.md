# Campaign Monitoring Dashboard

A professional and interactive React + TypeScript application for monitoring campaigns, creating and scheduling campaigns with real-time updates, and user-friendly forms.

## Features

- 📊 **Campaign Monitoring**: View the success rate, and failures of campaigns in real-time.
- 🗂️ **Campaign Creation**: Intuitive form supporting campaign name, message content, recipient list (email input), category selection, and scheduling.
- ⚡ **Real-Time Updates**: Get live updates using WebSockets.
- 🎨 **Modern UI**: Built with `React`, `TailwindCSS` (with `tw-` prefix), and `lucide-react`.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Formik
- **Date & Time**: `react-aria-components`
- **Forms**: Formik & Yup Validation
- **Email Input**: `react-select` for recipient email management
- **Real-Time Updates**: Socket.io

## Getting Started
To check out the live version of the application, visit: [Live App Link](https://campaign-crm-production.up.railway.app/auth)


### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/campaign-dashboard.git
   cd campaign-dashboard (for backend)
   cd campaign-dashboard/frontend (for frontend)
2. Install dependencies
   ```bash
   npm install
   
3. Start the development server:
  ```bash
  npm run backend (for backend)
  npm run dev (for frontend)
```

### Architecture

### 1. **Frontend**
The frontend is built using **React**, **TypeScript**, and **Vite**, with **TailwindCSS** for styling. The application architecture follows a component-driven development approach, ensuring scalability and maintainability.

#### Key Features:
- **Component-Based Architecture**: 
  - Reusable components like `CampaignForm`, `MetricsCard`, and `DatePicker` allow modular development and simplify maintenance.
- **State Management**: 
  - Local component states are managed with Zustand React's `useState` and `Formik` for form state management.
- **Real-Time Updates**: 
  - WebSocket (`socket.io-client`) integration enables real-time campaign metric updates without page reloads.
- **Validation Layer**: 
  - Form validations are implemented using `Yup`, ensuring accurate and secure data input.

---

### 2. **Backend Integration**
The frontend communicates with the backend API for the following operations:
- **Fetching Campaign Metrics**: 
  - Uses RESTful endpoints to retrieve metrics based on a date range.
- **Form Submission**: 
  - Submits campaign details to the backend for processing and scheduling.
- **Real-Time Updates**: 
  - Listens for WebSocket events (`campaign-update`) to receive live updates on campaign status.

#### API Communication:
- API calls are abstracted using a centralized utility function.

---

### 3. **WebSocket Integration**
- **Socket Events**:
  - Listens to `campaign-update` events to dynamically update campaign metrics.
- **Event Handling**:
  - Campaign metrics are updated locally with minimal re-renders using React's `useState`.

---

### 4. **Form Management**
- **Formik**:
  - Manages form state, submission, and validation seamlessly.
- **Yup Validation**:
  - Ensures fields like campaign name, message content, recipient list, and schedule time are validated before submission.

---

### 5. **UI/UX**
- **TailwindCSS**:
  - Custom utility classes (prefixed with `tw-`) ensure a consistent and modern UI design.
- **Responsive Design**:
  - Layouts are optimized for all screen sizes using responsive grid and flexbox utilities.
- **Interactive Elements**:
  - Buttons, dropdowns (`react-tagify`), and progress bars enhance user experience.

---

### 6. **Scalability**
This architecture is designed for scalability with the following considerations:
- **Component Reusability**:
  - Components like `MetricsCard` and `CampaignForm` can be extended or reused across different parts of the application.
- **Socket-Based Real-Time Updates**:
  - Efficient event-driven architecture for real-time metrics without polling.
- **Clean Separation of Concerns**:
  - API communication, state management, and UI rendering are well-isolated, ensuring maintainability.

---

## License

This project is licensed under the **MIT License**.  

You are free to use, modify, and distribute this software in both private and commercial projects, provided that the original license and copyright notice are included in all copies or substantial portions of the software.

---

### MIT License


