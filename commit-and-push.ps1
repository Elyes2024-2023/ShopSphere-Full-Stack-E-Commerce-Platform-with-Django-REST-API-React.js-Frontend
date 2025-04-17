# Commit and Push Script
Write-Host "Starting Commit and Push Process..."

# Set location to project directory
Set-Location "C:\Users\User\Downloads\New folder\Django-React-JS-E-Commerce"

# Remove existing remote if it exists
Write-Host "Removing existing remote if any..."
git remote remove origin

# Add new remote
Write-Host "Adding new remote repository..."
git remote add origin https://github.com/Elyes2024-2023/ShopSphere-Full-Stack-E-Commerce-Platform-with-Django-REST-API-React.js-Frontend.git

# Check git status
Write-Host "Checking git status..."
git status

# Add all files
Write-Host "Adding files to git..."
git add .

# Create commit
Write-Host "Creating commit..."
git commit -m "feat: Add full stack e-commerce platform with Django REST API and React.js frontend

- Add frontend components and screens
- Add Redux store and actions
- Add backend API endpoints
- Add product management features
- Add user authentication
- Add order processing system

Developed by ELYES
© 2024-2025 ELYES. All rights reserved."

# Push to remote
Write-Host "Pushing to remote repository..."
git push -u origin main

Write-Host "Commit and push completed!" 