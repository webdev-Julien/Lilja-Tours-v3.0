# Development Setup & Common Issues

## Quick Start
Always make sure you're in the project directory before running commands:
```bash
cd Lilja-Tours-v3.0
npm run dev
```

## Common Issues & Solutions

### Issue: npm run dev doesn't work
**Root Cause:** You're likely in the wrong directory or the port is already in use.

**Solutions:**
1. **Wrong Directory:** Make sure you're in the project directory:
   ```bash
   cd Lilja-Tours-v3.0
   ```

2. **Port Already in Use:** If port 4321 is in use, Astro will automatically use the next available port (4322, 4323, etc.). This is normal behavior.

3. **Node Modules Issues:** If you get module-related errors:
   ```bash
   npm install
   ```

### Project Structure
```
Lilja-Tours-v3.0/
├── src/
├── public/
├── package.json
├── astro.config.mjs
└── node_modules/
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Development Server
- Default URL: http://localhost:4321
- If port is busy: http://localhost:4322 (or next available)
- Watch mode: Automatically reloads on file changes