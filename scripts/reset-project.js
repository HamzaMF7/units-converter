#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');

const directories = [
  'node_modules',
  '.expo',
  '.expo-shared',
  'dist',
  'android/build',
  'ios/build'
];

const files = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];

const removeTarget = relativePath => {
  const location = path.join(projectRoot, relativePath);
  if (!fs.existsSync(location)) return;

  try {
    fs.rmSync(location, { recursive: true, force: true });
    console.log(`Removed ${relativePath}`);
  } catch (error) {
    console.warn(`Failed to remove ${relativePath}:`, error);
  }
};

const reinstallDependencies = () => {
  try {
    execSync('npm install', { cwd: projectRoot, stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to reinstall dependencies. Run "npm install" manually.', error);
  }
};

const run = () => {
  console.log('Resetting project state...');

  directories.forEach(removeTarget);
  files.forEach(removeTarget);

  reinstallDependencies();

  console.log('Reset complete. You can now run "npm start".');
};

run();