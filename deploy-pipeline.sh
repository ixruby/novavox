#!/bin/bash
# Novavox Auto-Deploy Pipeline
# Watches for build readiness, deploys, and notifies

PROJECT_DIR="$HOME/Projects/novavox"
cd "$PROJECT_DIR"

echo "🔄 Building Novavox..."
npm run build 2>&1

if [ $? -eq 0 ]; then
  echo "✅ Build successful. Deploying to Vercel..."
  npx vercel --yes --prod 2>&1
  echo "✅ Deployed."
else
  echo "❌ Build failed. Check errors above."
  exit 1
fi
