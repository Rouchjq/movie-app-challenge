# Quickbet Movies

A modern movie discovery platform built with Next.js, featuring a responsive design, dark/light theme support, and integration with TMDB API.

## Features

- 🎬 Browse popular, upcoming, and top-rated movies
- 🌓 Dark/Light theme support
- 🔍 Search functionality
- 💫 Responsive design
- 🎯 Movie details with ratings and trailers
- ❤️ Favorite movies functionality
- 🔐 Authentication system

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Radix UI Components
- Embla Carousel
- Next Themes
- Axios
- Day.js

## Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun package manager
- TMDB API key

## Environment Variables

Create a `.env` file in the root directory with:

```env
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
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

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # App router pages and layouts
├── components/          # Reusable components
│   ├── atoms/          # Basic UI components
│   └── molecules/      # Composite components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API clients
├── providers/          # App providers
└── types/              # TypeScript type definitions
```

## Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
