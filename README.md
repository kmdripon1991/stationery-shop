# Project Setup Guide

This guide provides the steps to set up a Node.js project with TypeScript, MongoDB, ESLint, Prettier, and VSCode configurations for efficient development.

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- [VSCode](https://code.visualstudio.com/) (with recommended extensions)

## Step 1: Initialize the Project

Start by initializing a new Node.js project:

```bash
npm init -y
npm install express
npm install typescript --save-dev
tsc --init
npm i cors
npm i dotenv
```

## Step 2: Configure TypeScript

In the tsconfig.json file, set the following:

```
{
  "rootDir": "./src",
  "outDir": "./dist"
}
```

## Step 3: Create app.ts File

In src/app.ts, add the following code:

```
const express = require('express');

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

## Step 4: Add Build Script to package.json

In the scripts section of package.json, add:

```
"build": "tsc"
```

## Step 5: Create server.ts File

In src/server.ts, add the following code:

```
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

Install Mongoose and add the database connection:

```
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
```

## Step 6: Create .env File

Create a .env file in the root directory and add:

```
PORT = 5000
DATABASE_URL = mongodb+srv://<db_username>:<db_password>@cluster0.tuu4iju.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Go to MongoDB database access, create a db_username and db_password, then use them in the .env file. Set the correct database name as well, e.g., /first-project?.

Use it in the server.ts file.

## Step 7: Create config/index.ts File

Create a config folder and add the index.ts file:

```
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
```

Import and use it in server.ts.

## Step 8: Update app.ts File

Update src/app.ts to use TypeScript with express:

```
import express, { Application, Request, Response } from "express";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
```

## Step 9: Update server.ts File

In server.ts, use Mongoose and connect the database:

```
import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.database_url}`);
    });
  } catch (error) {
    console.log(error);
  }
}
```

## Step 10: Use Middleware in app.ts

In app.ts, add the middleware to parse JSON and handle CORS:

```
app.use(express.json());
app.use(cors());
```

## Step 11: Update tsconfig.json

Add the following to tsconfig.json:

```
{
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## Step 12: Install ESLint and TypeScript Support

```
npm i -D eslint@9.14.0 @eslint/js @types/eslint__js typescript typescript-eslint
npx eslint --init
```

If you encounter the issue with eslint: "^9.14.0" being updated to eslint: "^9.15.0", remove and reinstall ESLint:

```
npm remove eslint
npm i -D eslint@9.14.0
```

## Step 13: Add ESLint Configuration

Create and configure .eslintrc.mjs with the following:

```
{
  ignores: ["node_modules", "dist"],
  rules: {
    "no-unused-vars": "error",
    "no-unused-expressions": "error",
    "prefer-const": "error",
    "no-console": "warn",
    "no-undef": "error"
  }
}
```

## Step 14: Add ESLint Scripts

Add these scripts to your package.json:

```
"scripts": {
  "lint": "eslint src/**/*.ts",
  "lint:fix": "eslint src/**/*.ts --fix"
}
```

## Step 15: Install Prettier

Install Prettier as a development dependency:

```
npm i -D --exact prettier
```

Create a .prettierrc file in the root and add:

```
{
  "semi": true,
  "singleQuote": true
}
```

Also, create a .prettierignore file:

```
dist
coverage
```

Add Prettier scripts in package.json:

```
"prettier": "prettier . --write",
"prettier:fix": "npx prettier --write src"
```

## Step 16: Configure VSCode Settings

Open your command palette (Command + Shift + P) and search for Preferences: Open User Settings (JSON). Add the following settings for auto-format on save:

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## Step 17: Install ESLint and Prettier Extensions

Install the ESLint and Prettier VSCode extensions, then reload VSCode.

To avoid conflicts, install the following dependencies:

```
npm install --save-dev eslint-plugin-prettier eslint-config-prettier prettier
```

Modify .eslintrc.mjs to include Prettier at the end of your extends list:

```
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node },
    ignores: ['node_modules', 'dist'],
    rules: {
      'no-unused-vars': 'error',
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-undef': 'error',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig, // Add Prettier's recommended rules
];
```
