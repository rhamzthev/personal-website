# Personal Website - Rhamsez Thevenin

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)](https://www.typescriptlang.org/)

## Description

A modern, responsive personal portfolio website showcasing my work as a full-stack developer. This project features a clean, minimalist design with dynamic content pulled from GitHub, syntax-highlighted project READMEs, and a contact form with email integration.

The site is built with Next.js, React 19, TypeScript, and Tailwind CSS, implementing best practices for performance, accessibility, and responsive design across all device sizes.

![Screenshot 2025-04-03 at 11-29-09 Rhamsez Thevenin Software Developer](https://github.com/user-attachments/assets/2bb982ed-c455-4dd8-a5c7-fb1e22146a51)


## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies](#technologies)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

```
Node.js (v18.18.0 or higher)
npm or yarn
GitHub account (for portfolio integration)
```

### Dependencies

```
Next.js 15.2.4
React 19.0.0
TypeScript 5.7.2
Tailwind CSS 3.4.1
Nodemailer 6.10.0
```

### Installation Steps

```bash
# Step 1: Clone the repository
git clone https://github.com/rhamzthev/personal-website.git

# Step 2: Navigate to the project directory
cd personal-website

# Step 3: Install dependencies
npm install
# or
yarn install

# Step 4: Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials
```

## Usage

### Development Server

```bash
# Run the development server
npm run dev
# or
yarn dev

# The site will be available at http://localhost:3000
```

### Build for Production

```bash
# Build the project
npm run build
# or
yarn build

# Start the production server
npm start
# or
yarn start
```

## Features

### Core Functionality
- Dynamic portfolio section that fetches projects directly from GitHub
- Syntax-highlighted README files for project details
- Responsive design that works on mobile, tablet, and desktop
- Contact form with email notifications using Nodemailer
- SEO optimized with Next.js metadata

### Key Highlights
- Modern UI with clean animations and transitions
- GitHub integration showing live stats for projects
- Dark theme with accent colors and custom design elements
- Fast page loads with Next.js App Router and server components

## Technologies

### Tech Stack
- **Next.js**: Framework for server-rendered React applications
- **React**: Frontend library for building user interfaces
- **TypeScript**: Type-safe JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Nodemailer**: Module for sending emails from Node.js
- **Highlight.js**: Code syntax highlighting
- **GitHub API**: Dynamic project fetching

### Project Structure
```
project/
├── app/                # Next.js app router pages and API routes
│   ├── api/            # API endpoints (contact form)
│   ├── portfolio/      # Portfolio pages
│   ├── globals.css     # Global CSS styles
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/         # Reusable React components
├── lib/                # Utility functions and API clients
├── public/             # Static assets
└── ...
```

## Configuration

### Environment Variables
```
GITHUB_ACCESS_TOKEN=your_github_token    # For GitHub API access
SMTP_USER=your_email@example.com         # Email for contact form
SMTP_PASS=your_email_password            # Password for email
```

### GitHub Integration

The portfolio section fetches your repositories automatically from GitHub. To customize which repos are displayed:

1. Make sure your repositories have good descriptions and topics
2. The most recently updated repos will appear first
3. Add a README.md to each project for the detailed view

## Contributing

This is a personal website, but if you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made by Rhamsez Thevenin 🌹
