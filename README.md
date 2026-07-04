# MegaBlog

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=fff)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=fff)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=fff)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=fff)
![TinyMCE](https://img.shields.io/badge/TinyMCE-1976D2?style=for-the-badge&logo=tinymce&logoColor=fff)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=fff)

A full-stack blog management application built with React, Redux, and Appwrite. Create, edit, and manage blog posts with rich text editing, image uploads, and user authentication.

---

## Features ✨

- 🔐 **User Authentication** — Sign up, login, logout with Appwrite
- ✍️ **Rich Text Editor** — Create and edit posts with TinyMCE editor
- 🖼️ **Image Upload** — Upload featured images for posts
- 📝 **CRUD Operations** — Create, read, update, and delete blog posts
- 🔒 **Protected Routes** — Access control based on authentication status
- 🌐 **Responsive Design** — Works on mobile, tablet, and desktop
- ⚡ **Fast Performance** — Built with Vite for optimized development and production builds

---

## Tech Stack 🛠️

**Frontend:**
- React 18
- Vite
- Redux Toolkit (state management)
- React Router (routing)
- React Hook Form (form management)
- TinyMCE (rich text editor)
- Tailwind CSS (styling)

**Backend & Services:**
- Appwrite (authentication, database, file storage)

---

## Prerequisites 📋

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

---

## Installation 🚀

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd blog-manager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory with your Appwrite credentials:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

### 4. Set up Appwrite (if not already done)
1. Go to [Appwrite Cloud](https://cloud.appwrite.io)
2. Create a new project
3. Create a database and collection for posts
4. Create a storage bucket for images
5. Copy the IDs and add them to your `.env` file

### 5. Set up TinyMCE
1. Go to [TinyMCE](https://www.tiny.cloud/)
2. Sign up and create an API key
3. Add your domain(s) to the approved domains list
4. Add the API key to your `.env` file

### 6. Run the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── Input.jsx
│   ├── Button.jsx
│   ├── Select.jsx
│   ├── RTE.jsx         # Rich Text Editor wrapper
│   ├── PostForm.jsx    # Create/Edit post form
│   └── index.js        # Barrel export
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── CreatePost.jsx
│   ├── EditPost.jsx
│   └── PostDetail.jsx
├── store/              # Redux state management
│   ├── authSlice.js    # Auth state reducer
│   └── store.js        # Redux store configuration
├── appwrite/           # Appwrite service integration
│   ├── conf.js         # Config variables
│   ├── auth.js         # Authentication service
│   └── config.js       # Database & storage service
├── App.jsx
├── main.jsx
└── index.css
```

---

## Key Components 🧩

### **authSlice.js**
Redux slice for managing authentication state (login/logout, user data)

### **auth.js (AuthService)**
Appwrite Account API wrapper for user authentication

### **config.js (Service)**
Appwrite Database & Storage API wrapper for blog posts and images

### **RTE.jsx**
Rich Text Editor component that combines TinyMCE with React Hook Form

### **PostForm.jsx**
Reusable form for creating and editing blog posts (handles both cases)

---

## Usage 💻

### Create a Blog Post
1. Login to your account
2. Click "Create Post"
3. Fill in the form:
   - Title
   - Slug (URL-friendly name)
   - Content (using rich text editor)
   - Featured image
   - Status (active/inactive)
4. Click "Publish"

### Edit a Blog Post
1. Navigate to your post
2. Click "Edit"
3. Modify the content
4. Click "Update"

### Delete a Blog Post
1. Navigate to your post
2. Click "Delete"
3. Confirm deletion

---

## Deployment 🌐

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project" and import your repository
4. Add environment variables in Vercel settings
5. **Important:** Add your Vercel domain to TinyMCE approved domains list
   - Domain format: `your-project.vercel.app`

---

## Important Notes ⚠️

### TinyMCE API Key
- Get a free API key from [tiny.cloud](https://www.tiny.cloud/)
- Add your domain to approved domains in TinyMCE dashboard
- For local development: add `localhost:5173`
- For production: add your Vercel domain (`your-project.vercel.app`)

### Appwrite Database Schema
Your posts collection should have these fields:
```json
{
  "title": "string",
  "slug": "string (unique)",
  "content": "string",
  "featuredImage": "string (file ID)",
  "status": "string (active/inactive)",
  "userId": "string (user who created it)",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

## Common Issues & Solutions 🔧

### TinyMCE Editor is disabled
**Problem:** "The editor is disabled because the API key could not be validated"
**Solution:** 
- Add your domain to TinyMCE approved domains
- Make sure API key is correctly set in `.env`
- Clear browser cache

### Authentication not persisting
**Problem:** Users get logged out on refresh
**Solution:** 
- Make sure Redux store is properly configured
- Check that authSlice is wired to store reducer
- Verify Appwrite session is being saved

### Images not uploading
**Problem:** File upload fails
**Solution:**
- Check Appwrite bucket permissions
- Ensure bucket ID is correct in `.env`
- Verify file size is within limits

---

## Scripts 📜

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## Contributing 🤝

Feel free to fork, modify, and use this project!

---

## License 📄

This project is open source and available under the MIT License.

---

## Support 💬

If you encounter any issues, please:
1. Check the troubleshooting section above
2. Review Appwrite and TinyMCE documentation
3. Check console for error messages

Happy blogging! 🎉
