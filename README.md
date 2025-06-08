# Portfolio Website Setup

## Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the root directory with your credentials:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
```

### Setting up Gmail for Nodemailer:

1. Enable 2-factor authentication in your Google account
2. Go to https://myaccount.google.com/security
3. Search for "App passwords"
4. Generate a new app password for "Mail"
5. Use this password in your `.env.local` file

### Setting up Hashnode:

1. Replace `YOUR_HASHNODE_USERNAME` in `components/Blog.tsx` with your actual Hashnode username
2. The API will automatically fetch your latest blog posts

## Folder Structure

```
portfolio-website/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts         # Contact form API with Nodemailer
│   │   └── hashnode/
│   │       └── route.ts         # Hashnode blog fetching API
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── SlidingCard.tsx      # Reusable sliding carousel
│   │   ├── SwipeableCard.tsx    # Reusable swipeable card
│   │   └── TypewriterText.tsx   # Typewriter animation
│   ├── About.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── ContactForm.tsx          # Form with React Hook Form + Zod
│   ├── Experience.tsx
│   ├── FloatingNavbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
│
├── lib/
│   ├── data.ts                  # Static data
│   ├── hashnode.ts              # Hashnode API helper
│   ├── utils.ts                 # Utility functions
│   └── validation.ts            # Zod schemas
│
├── public/
│   ├── images/
│   │   ├── projects/
│   │   └── experience/
│   ├── headshot.jpg
│   └── character.png
│
├── types/
│   └── index.ts                 # TypeScript types
│
├── .env.local
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Features Implemented

- ✅ React Hook Form with Zod validation
- ✅ Nodemailer configured for contact form
- ✅ Hashnode API integration
- ✅ Reusable SlidingCard component
- ✅ Reusable SwipeableCard component
- ✅ Modular component structure
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Framer Motion for animations
- ✅ Responsive design
- ✅ Dark theme
- ✅ SEO optimized

## Running the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.
