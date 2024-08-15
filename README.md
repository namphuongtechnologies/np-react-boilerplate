# NP React Boilerplate

A brief description of what this project does and who it's for

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
  yarn install
  pnpm install
```

Start the server

```bash
  npm run dev
  yarn dev
  pnpm run dev
```

## Build and Start Locally

To deploy this project run

```bash
  npm run build
  yarn build
  pnpm build
```

Start the server

```bash
  npm run start
  yarn start
  pnpm start
```

## Technologies Used

- [ReactJS](https://react.dev/): The library for web and native user interfaces
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview): is often described as the missing data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your web applications a breeze.

## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

## Folder Structure

├── .husky
│ └── pre-commit // config pre-commit
├── .vscode
│ ├── extensions.json // recommended extensions for vscode
│ └── settings.json // recommended settings for vscode
├── node_modules
├── public // static folder
│ └── vite.svg
├── src
│ ├── assets
│ │ └── react.svg
│ ├── components // folder contains reuseable components for all project
│ │ ├── errors
│ │ ├── fallbacks
│ │ ├── layouts
│ │ └── ui
│ ├── config
│ │ ├── axios.ts // default config axios
│ │ ├── permission.ts // default config permission
│ │ └── query-client.ts // default config tanstack query
│ ├── features
│ │ ├── about
│ │ │ ├── pages
│ │ │ │ └── about.tsx
│ │ │ └── index.tsx
│ │ ├── auth
│ │ │ ├── components
│ │ │ │ ├── index.ts
│ │ │ │ ├── permission-provider.tsx
│ │ │ │ └── protected-route.tsx
│ │ │ ├── pages
│ │ │ │ ├── sign-in.tsx
│ │ │ │ └── sign-up.tsx
│ │ │ └── index.ts
│ │ ├── products
│ │ │ ├── components // folder contains reuseable components for products feature
│ │ │ │ ├── index.ts
│ │ │ │ └── table-products.tsx
│ │ │ ├── hooks // folder contains reuseable hooks for products feature
│ │ │ │ ├── index.ts
│ │ │ │ └── use-products.ts
│ │ │ ├── pages // folder contains page component for products feature
│ │ │ │ ├── product-create.tsx
│ │ │ │ ├── product-detail.tsx
│ │ │ │ ├── product-edit.tsx
│ │ │ │ └── products.tsx
│ │ │ └── index.ts // product routes
│ │ ├── test
│ │ │ ├── pages
│ │ │ └── index.ts
│ │ └── dashboard.tsx
│ ├── hooks // folder contains reuseable hooks
│ │ ├── useClickOutside.ts
│ │ └── useDebounce.ts
│ ├── store
│ │ └── auth.ts // global state managements with zustand
│ ├── styles
│ │ └── index.css // global css
│ ├── App.tsx
│ ├── AppProviders.tsx // component contains providers
│ ├── AppRoutes.tsx // component contains routes
│ ├── main.tsx
│ └── vite-env.d.ts
├── .editorconfig // default config vscode
├── .env // env for development
├── .env.example
├── .env.prod // env for production
├── .eslintrc.cjs // file config rules for syntax code
├── .gitignore // file list ignore for git
├── .prettierignore
├── .prettierrc // file config rules for Pretty syntax code
├── index.html
├── package.json // list dependencies and devdependencies
├── postcss.config.js // default config compile css code
├── README.md
├── tailwind.config.js // config tailwincss library
├── tsconfig.json // config for typescript
├── tsconfig.node.json
└── vite.config.ts // config vite
