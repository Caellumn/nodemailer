// build.js - Custom build script for Render
const { execSync } = require('child_process');

console.log('🚀 Starting build process...');

try {
  // Run TypeScript compiler
  console.log('📦 Compiling TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });
  
  // Verify the dist directory exists
  console.log('✅ TypeScript compilation complete');
  console.log('📂 Checking dist directory...');
  execSync('ls -la dist', { stdio: 'inherit' });
  
  console.log('🎉 Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
