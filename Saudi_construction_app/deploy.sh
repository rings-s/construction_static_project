#!/bin/bash
# deploy.sh

echo "🚀 Deploying Saudi Construction App..."

# Stop and remove existing container
docker stop saudi-construction 2>/dev/null || true
docker rm saudi-construction 2>/dev/null || true

# Remove old image to save space
docker rmi saudi-construction-app 2>/dev/null || true

# Build new image
echo "📦 Building Docker image..."
docker build -t saudi-construction-app .

# Run new container
echo "🔥 Starting container on port 7500..."
docker run -d \
  --name saudi-construction \
  -p 7500:7500 \
  --restart unless-stopped \
  saudi-construction-app

echo "✅ Deployment complete!"
echo "🌐 Your site is running at: http://construction.pinealdevelopers.com:7500"

# Show container status
docker ps | grep saudi-construction