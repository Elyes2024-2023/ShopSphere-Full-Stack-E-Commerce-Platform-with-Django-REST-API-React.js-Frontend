# Git Setup Script
Write-Host "Starting Git Setup..."

# Set location to project directory
Set-Location "C:\Users\User\Downloads\New folder\Django-React-JS-E-Commerce"

# Remove existing git configuration if any
if (Test-Path .git) {
    Write-Host "Removing existing git configuration..."
    Remove-Item -Recurse -Force .git
}

# Initialize new git repository
Write-Host "Initializing new git repository..."
git init

# Configure git
Write-Host "Configuring git..."
git config --global user.name "Elyes2024-2023"
git config --global user.email "elyes@example.com"

# Add all files
Write-Host "Adding files to git..."
git add .

# Initial commit
Write-Host "Creating initial commit..."
git commit -m "Initial commit: Full Stack E-Commerce Platform with Django REST API and React.js Frontend"

# Add remote repository
Write-Host "Adding remote repository..."
git remote add origin https://github.com/Elyes2024-2023/ShopSphere-Full-Stack-E-Commerce-Platform-with-Django-REST-API-React.js-Frontend.git

# Create and switch to main branch
Write-Host "Setting up main branch..."
git branch -M main

# Push to remote
Write-Host "Pushing to remote repository..."
git push -u origin main

Write-Host "Git setup completed!" 