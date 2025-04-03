# Rhamsez Thevenin's Portfolio Website

A modern, responsive software development portfolio built with Next.js, React, and TailwindCSS, designed to showcase projects and skills with an elegant and interactive user experience.

## Features

- **Dynamic GitHub Integration**: Automatically fetches and displays repositories from GitHub with detailed project pages
- **Interactive UI**: Smooth animations and modern design elements including glassmorphism effects
- **Responsive Design**: Fully responsive layout that works beautifully on all devices
- **Contact Form**: Functional contact form with email delivery via Nodemailer
- **Code Highlighting**: Syntax highlighting for code snippets in project READMEs
- **Dark Theme**: Sleek dark-themed design with accent colors

## Screenshots

![Screenshot 2025-04-03 at 11-29-09 Rhamsez Thevenin Software Developer](https://github.com/user-attachments/assets/99cf9653-4af9-4623-830a-86fe3a7931fc)

![Screenshot 2025-04-03 at 11-29-23 Rhamsez Thevenin Software Developer](https://github.com/user-attachments/assets/c08822a0-a27b-48bd-9e28-6f04ec88dc98)

![Screenshot 2025-04-03 at 11-30-04 rhed Portfolio Rhamsez Thevenin](https://github.com/user-attachments/assets/5faf7bb5-3df8-416c-b1d5-cc19e1a7fef3)


## Tech Stack

- **Frontend**: React 19, Next.js 15
- **Styling**: TailwindCSS with custom animations
- **Email**: Nodemailer for contact form submissions
- **Code Parsing**: Highlight.js for syntax highlighting, JSDOM for HTML parsing
- **Icons**: React Icons

## Getting Started

### Prerequisites

- Node.js (version 18.17.0 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   GITHUB_ACCESS_TOKEN=your_github_token
   SMTP_USER=your_email_address
   SMTP_PASS=your_email_password
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/              # API routes (contact form)
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page
│   └── portfolio/        # Portfolio pages
├── components/           # Reusable UI components
├── lib/                  # Utility functions
│   ├── github.ts         # GitHub API integration
│   └── highlight.ts      # Code syntax highlighting
├── public/               # Static assets
```

## Customization

### Personal Information

Update the personal information in `app/page.tsx` to reflect your own details:

```tsx
const githubUsername = 'your-github-username';
```

### Contact Form

The contact form sends emails using Gmail SMTP. Configure your email settings in the `.env` file and adjust the recipient email in `app/api/contact/route.ts`.

### Styling

The website uses TailwindCSS for styling. You can customize the colors, fonts, and other design elements in `tailwind.config.ts` and `app/globals.css`.

## Deployment

This project can be easily deployed on [Vercel](https://vercel.com) (the creators of Next.js):

1. Push your project to GitHub
2. Import the repository to Vercel
3. Set up the environment variables
4. Deploy

Alternatively, you can build the project for production:

```bash
npm run build
npm run start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/) - The React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [Highlight.js](https://highlightjs.org/) - Syntax highlighting
- [Nodemailer](https://nodemailer.com/) - Email sending

## Contact

Rhamsez Thevenin - [rhamzthev@gmail.com](mailto:rhamzthev@gmail.com)

- GitHub: [https://github.com/rhamzthev](https://github.com/rhamzthev)
- LinkedIn: [https://linkedin.com/in/rhamzthev](https://linkedin.com/in/rhamzthev)

---

Built by Rhamsez Thevenin
