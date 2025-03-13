#!/bin/bash
set -e

# Print Node and npm versions
echo "Node version: $(node -v)"
echo "NPM version: $(npm -v)"

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the application
echo "Building the application..."
npm run build

# Verify the build
echo "Contents of the dist directory:"
ls -la dist/

# Check for entry point file
if [ -f "dist/server.js" ]; then
  echo "✅ Build successful: dist/server.js exists"
else
  echo "❌ Build failed: dist/server.js not found"
  exit 1
fi

echo "Build completed successfully"
