# Diablo Game Platform

A Vue.js platform for managing Diablo game-related content including game guides, MODs, tools, development resources, and MOD notes.

## Features

### Content Management

The platform provides CRUD (Create, Read, Update, Delete) operations for various content types:

- **游戏攻略 (Game Guides)**: Manage guides with title, content, and tags
- **游戏MOD (Game MODs)**: Manage MODs with name, description, and tags
- **游戏工具 (Game Tools)**: Manage tools with name, description, and tags
- **游戏开发 (Game Development)**: Manage development resources with title, content, and tags
- **MOD随笔 (MOD Notes)**: Manage notes with title, content, tags, and color coding

### Implementation Details

Each content section includes:
- Modal dialog interfaces for adding and editing content
- Form validation to ensure required fields are completed
- Tag management with comma-separated input
- Confirmation dialogs for deletion operations
- Color selection for MOD notes

## Future Integrations

This front-end implementation is designed to be connected to a backend API for persistent data storage.

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

The main component is located at `src/views/Diablo.vue`.
