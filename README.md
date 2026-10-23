<a id="top"></a>

<div align="center">

<img src="./client/src/assets/assets/quick-blog.svg" alt="Quick Blog — animated low-poly title banner" width="100%" />

<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=2600&pause=800&color=A78BFA&center=true&vCenter=true&repeat=true&width=760&height=50&lines=AI-POWERED+CONTENT+CREATION;WRITE+SMARTER.+PUBLISH+FASTER.;YOUR+IDEAS%2C+AMPLIFIED+BY+AI;CREATE.+PUBLISH.+INSPIRE." alt="Animated Quick Blog headline" />

<br/>

**An AI-powered blogging platform built for effortless content creation and modern blog management.**

<br/>

<a href="https://quick-blog-client-delta-two.vercel.app/">
<img src="https://img.shields.io/badge/EXPLORE_LIVE_DEMO-Visit_Website-F97316?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo"/>
</a>
<a href="https://gitdiagram.com/chanu2005-wq/ai_powered_blog">
<img src="https://img.shields.io/badge/SYSTEM_ARCHITECTURE-Explore-8B5CF6?style=for-the-badge&logo=diagramsdotnet&logoColor=white" alt="System Architecture"/>
</a>

<br/><br/>

<img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/Express-REST_API-FFFFFF?style=flat-square&logo=express&logoColor=black" alt="Express"/>
<img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/>
<img src="https://img.shields.io/badge/ImageKit-Image_Hosting-EC4899?style=flat-square" alt="ImageKit"/>

<br/><br/>

![GitHub Stars](https://img.shields.io/github/stars/chanu2005-wq/AI_powered_blog?style=flat-square&color=A78BFA)
![GitHub Forks](https://img.shields.io/github/forks/chanu2005-wq/AI_powered_blog?style=flat-square&color=22D3EE)
![GitHub Issues](https://img.shields.io/github/issues/chanu2005-wq/AI_powered_blog?style=flat-square&color=F59E0B)
![Last Commit](https://img.shields.io/github/last-commit/chanu2005-wq/AI_powered_blog?style=flat-square&color=34D399)

<br/>

`IDEA` &nbsp; ◆ &nbsp; `GENERATE` &nbsp; ◆ &nbsp; `PUBLISH` &nbsp; ◆ &nbsp; `INSPIRE`

<br/>

[About](#-about-the-project) · [Features](#-core-features) · [Architecture](#-system-architecture) · [Tech Stack](#-technology-stack) · [Setup](#-getting-started) · [Deployment](#-live-deployment) · [Roadmap](#-future-enhancements)

</div>

---

<a id="-about-the-project"></a>

## 🌌 About the Project

**AI-Powered Blog** is a full-stack blogging application designed to streamline content creation, publishing, and blog administration with AI-assisted writing capabilities.

The platform combines a reader-friendly experience with a dedicated admin workspace for managing articles, moderating comments, uploading images, and generating AI-assisted blog content.

<details open>
<summary><strong>💎 What makes Quick Blog special?</strong></summary>

<br/>

| Capability | Description |
|---|---|
| 🤖 AI-assisted writing | Generate blog content using an integrated AI service |
| 📝 Blog management | Create, edit, publish, and delete blog posts |
| 🔐 Admin workspace | Protected administrative operations |
| 🖼️ Image hosting | Upload and serve blog images through ImageKit |
| 💾 Persistent storage | Store blog and comment data in MongoDB |
| ☁️ Cloud deployment | Deploy the frontend and backend independently |

</details>

### ✍️ Publishing Workflow

```mermaid
flowchart LR
    A(["Admin Login"]) --> B["Dashboard"]
    B --> C["Create Blog"]
    C --> D["AI Content Generation"]
    C --> E["Upload Image"]
    D --> F["Review & Publish"]
    E --> F
    F --> G[("MongoDB")]
    G --> H(["Readers Browse Blogs"])
    H --> I["Comment Moderation"]

    classDef admin fill:#17112f,stroke:#a78bfa,color:#ffffff
    classDef data fill:#08291f,stroke:#34d399,color:#ffffff
    classDef reader fill:#071a30,stroke:#22d3ee,color:#ffffff

    class A,B,C,D,E,F,I admin
    class G data
    class H reader
```

<sub>Conceptual workflow based on the documented project functionality.</sub>

---

<a id="-system-architecture"></a>

## 🏗️ System Architecture

<div align="center">

**FRONTEND → BACKEND API → DATABASE & EXTERNAL SERVICES**

<a href="https://gitdiagram.com/chanu2005-wq/ai_powered_blog">
<img src="https://gitdiagram.com/chanu2005-wq/ai_powered_blog/diagram.png" width="100%" alt="AI-Powered Blog architecture diagram"/>
</a>

[**Explore the interactive architecture →**](https://gitdiagram.com/chanu2005-wq/ai_powered_blog)

</div>

### Architecture at a glance

<details>
<summary><strong>🔵 Frontend — Reader Experience</strong></summary>

- Browse published blogs.
- View individual articles.
- Submit comments.
- Navigate the blogging interface.

</details>

<details>
<summary><strong>🟣 Admin Workspace</strong></summary>

- Authenticate administrators.
- Access the dashboard.
- Create and manage blog posts.
- Moderate comments.

</details>

<details>
<summary><strong>🟢 Backend Services</strong></summary>

- Express.js API.
- Blog and admin controllers.
- AI content-generation integration.
- Authentication and token verification.

</details>

<details>
<summary><strong>🟠 Data & Integrations</strong></summary>

- MongoDB for application data.
- ImageKit for image hosting.
- An integrated AI provider for content generation.
- Vercel and Render for deployment.

</details>

---

<a id="-core-features"></a>

## ✨ Core Features

<details open>
<summary><strong>🤖 AI-Powered Content Generation</strong></summary>

Create blog content using the integrated AI service to support the writing workflow.

</details>

<details>
<summary><strong>📝 Blog Management System</strong></summary>

Manage blog posts through the administrative interface, including creation, editing, publishing, and deletion.

</details>

<details>
<summary><strong>🔐 Authentication & Authorization</strong></summary>

Use the application's authentication and token-verification flow to protect administrative operations.

</details>

<details>
<summary><strong>🖼️ ImageKit Integration</strong></summary>

Upload blog images and deliver them through an external image-hosting service.

</details>

<details>
<summary><strong>💬 Comment Management</strong></summary>

Review and moderate reader comments through the admin workspace.

</details>

<details>
<summary><strong>📚 Blog Discovery</strong></summary>

Browse published content and read individual blog posts through a dedicated reader interface.

</details>

---

<a id="-technology-stack"></a>

## ⚙️ Technology Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=react,vite,nodejs,express,mongodb,vercel,js&perline=7" alt="Quick Blog technology stack" />

</div>

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React, Vite | User interface and development tooling |
| Backend | Node.js, Express.js | API and server-side logic |
| Database | MongoDB Atlas | Persistent application data |
| Image Hosting | ImageKit | Image uploads and delivery |
| AI Integration | Configured AI provider | AI-assisted content generation |
| Frontend Hosting | Vercel | Frontend deployment |
| Backend Hosting | Render | Backend deployment |
| Language | JavaScript | Application development |

---

<a id="-project-structure"></a>

## 📂 Project Structure

```text
## 📂 Project Structure

```text
AI_powered_blog/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── BlogList.jsx
│   │   │   └── admin/
│   │   └── context/
│   │       └── app-context.jsx
│   └── package.json
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── diagram.png
└── README.md
```


```

<sub>This is an illustrative structure based on the supplied documentation. Verify directory and filename details against your repository.</sub>

---

<a id="-getting-started"></a>

## 🚀 Getting Started

Run the frontend and backend locally to develop and test the application.

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB Atlas](https://www.mongodb.com/atlas) or a compatible MongoDB instance
- [ImageKit](https://imagekit.io/) credentials
- Credentials for the AI provider configured by the application

### 01. Clone the repository

```bash
git clone https://github.com/chanu2005-wq/AI_powered_blog.git
cd AI_powered_blog
```

### 02. Configure and run the backend

```bash
cd server
npm install
```

Create your environment file if an example file is available:

```bash
cp .env.example .env
```

Configure the environment variables required by the backend, including the database connection, admin authentication, ImageKit, and AI integration.

Start the backend:

```bash
npm start
```

### 03. Configure and run the frontend

Open a second terminal:

```bash
cd client
npm install
```

If your project provides a frontend environment example:

```bash
cp .env.example .env
```

Configure the frontend API URL according to your application settings.

Start the frontend:

```bash
npm run dev
```

Open the local development URL shown in the terminal.

### 🔑 Environment Configuration

Configure the variable names expected by your actual source code for:

- MongoDB connection URI.
- Administrator authentication.
- ImageKit credentials and URL endpoint.
- AI provider API key.
- Frontend API base URL.
- Frontend origin and CORS settings.

> [!CAUTION]
> Never commit real credentials, production database URIs, passwords, or private API keys to GitHub. Keep sensitive values in environment variables.

---

<a id="-live-deployment"></a>

## 🌐 Live Deployment

<div align="center">

<a href="https://quick-blog-client-delta-two.vercel.app/">
<img src="https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel frontend"/>
</a>

<a href="https://ai-powered-blog-534w.onrender.com/">
<img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black" alt="Render backend"/>
</a>

<a href="https://www.mongodb.com/atlas">
<img src="https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas"/>
</a>

</div>

| Resource | Link |
|---|---|
| 🌐 Live Website | [Open Quick Blog](https://quick-blog-client-delta-two.vercel.app/) |
| ⚙️ Backend Host | [Render Service](https://ai-powered-blog-534w.onrender.com/) |
| 🏗️ Architecture | [GitDiagram](https://gitdiagram.com/chanu2005-wq/ai_powered_blog) |
| 💻 Source Code | [GitHub Repository](https://github.com/chanu2005-wq/AI_powered_blog) |

<sub>Deployment URLs are retained from the supplied README. Their current availability has not been independently verified.</sub>

---

<a id="-future-enhancements"></a>

## 🔮 Future Enhancements

The following are **suggestions for future development**, not claims about existing functionality.

- [ ] 🔎 Full-text blog search, tags, and categories.
- [ ] ✍️ Rich-text editing experience.
- [ ] 🧠 AI-generated titles and article summaries.
- [ ] 📊 Expanded blog analytics.
- [ ] 🔍 Search engine optimization tools.
- [ ] 🎯 Related-article recommendations.

---

## 🔒 Security Best Practices

- Store sensitive configuration in environment variables.
- Protect administrative endpoints with server-side authorization.
- Validate incoming requests.
- Restrict cross-origin requests to trusted frontend origins.
- Use secure production deployment settings.
- Never expose API keys in frontend code or public repositories.

---

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit your changes with a clear message.
5. Open a pull request describing your improvements.

---

## 👨‍💻 Author

<div align="center">

### Chanukya Chandra

Full-Stack Development · AI Integration

<a href="https://github.com/chanu2005-wq">
<img src="https://img.shields.io/badge/GitHub-Explore_My_Projects-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub profile"/>
</a>

<br/><br/>

**Built with the MERN ecosystem. Enhanced with AI. Designed for better blogging.**

If you find this project useful, consider giving it a ⭐ on GitHub.

<br/>

[⬆ Back to Top](#top)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0B1020,50:6D28D9,100:06B6D4&height=120&section=footer" width="100%" alt="Neon gradient footer"/>

</div>
