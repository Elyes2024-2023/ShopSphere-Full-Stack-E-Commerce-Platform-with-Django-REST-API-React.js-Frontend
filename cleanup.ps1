# Cleanup script for Django-React-JS-E-Commerce project

# 1. First, remove all .pyc files (they are auto-generated)
Get-ChildItem -Path . -Recurse -Filter "*.pyc" | Remove-Item -Force

# 2. Remove incorrect directories from backend
Remove-Item -Path "backend/assets" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "backend/screens" -Recurse -Force -ErrorAction SilentlyContinue

# 3. Move Python files to proper locations in backend
# Django main app files
if (Test-Path "manage.py") {
    Move-Item -Path "manage.py" -Destination "backend/" -Force -ErrorAction SilentlyContinue
}

# Migration files belong in the migration directories of their respective apps
if (Test-Path "0001_initial.py") {
    Move-Item -Path "0001_initial.py" -Destination "backend/products/migrations/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "0002_order_orderitem_review_shippingaddress.py") {
    Move-Item -Path "0002_order_orderitem_review_shippingaddress.py" -Destination "backend/orders/migrations/" -Force -ErrorAction SilentlyContinue
}

# Create migrations directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "backend/products/migrations" -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path "backend/orders/migrations" -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path "backend/users/migrations" -ErrorAction SilentlyContinue

# Move model files to their proper app directories
if (Test-Path "models.py") {
    Move-Item -Path "models.py" -Destination "backend/products/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "views.py") {
    Move-Item -Path "views.py" -Destination "backend/products/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "urls.py") {
    Move-Item -Path "urls.py" -Destination "backend/products/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "admin.py") {
    Move-Item -Path "admin.py" -Destination "backend/products/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "apps.py") {
    Move-Item -Path "apps.py" -Destination "backend/products/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "tests.py") {
    Move-Item -Path "tests.py" -Destination "backend/products/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "serializer.py") {
    Move-Item -Path "serializer.py" -Destination "backend/products/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "signals.py") {
    Move-Item -Path "signals.py" -Destination "backend/products/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "__init__.py") {
    Copy-Item -Path "__init__.py" -Destination "backend/products/" -Force -ErrorAction SilentlyContinue
    Copy-Item -Path "__init__.py" -Destination "backend/orders/" -Force -ErrorAction SilentlyContinue
    Copy-Item -Path "__init__.py" -Destination "backend/users/" -Force -ErrorAction SilentlyContinue
    Copy-Item -Path "__init__.py" -Destination "backend/products/migrations/" -Force -ErrorAction SilentlyContinue
    Copy-Item -Path "__init__.py" -Destination "backend/orders/migrations/" -Force -ErrorAction SilentlyContinue
    Copy-Item -Path "__init__.py" -Destination "backend/users/migrations/" -Force -ErrorAction SilentlyContinue
    Remove-Item -Path "__init__.py" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "db.sqlite3") {
    Move-Item -Path "db.sqlite3" -Destination "backend/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "products.py") {
    Move-Item -Path "products.py" -Destination "backend/products/" -Force -ErrorAction SilentlyContinue
}

# 4. Fix frontend structure
# Create necessary directories if they don't exist
New-Item -ItemType Directory -Force -Path "frontend/src/screens" -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path "frontend/src/components" -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path "frontend/src/components/layout" -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path "frontend/src/redux/actions" -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path "frontend/src/redux/constants" -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path "frontend/src/redux/reducers" -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path "frontend/src/assets" -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path "frontend/public" -ErrorAction SilentlyContinue

# Move core React files to src
if (Test-Path "App.js") {
    Move-Item -Path "App.js" -Destination "frontend/src/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "App.css") {
    Move-Item -Path "App.css" -Destination "frontend/src/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "App.test.js") {
    Move-Item -Path "App.test.js" -Destination "frontend/src/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "index.js") {
    Move-Item -Path "index.js" -Destination "frontend/src/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "index.css") {
    Move-Item -Path "index.css" -Destination "frontend/src/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "setupTests.js") {
    Move-Item -Path "setupTests.js" -Destination "frontend/src/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "reportWebVitals.js") {
    Move-Item -Path "reportWebVitals.js" -Destination "frontend/src/" -Force -ErrorAction SilentlyContinue
}

# Move Screen components
if (Test-Path "HomeScreen.js") {
    Move-Item -Path "HomeScreen.js" -Destination "frontend/src/screens/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "ProductScreen.js") {
    Move-Item -Path "ProductScreen.js" -Destination "frontend/src/screens/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "CartScreen.js") {
    Move-Item -Path "CartScreen.js" -Destination "frontend/src/screens/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "LoginScreen.js") {
    Move-Item -Path "LoginScreen.js" -Destination "frontend/src/screens/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "RegisterScreen.js") {
    Move-Item -Path "RegisterScreen.js" -Destination "frontend/src/screens/" -Force -ErrorAction SilentlyContinue
}

# Move UI components
if (Test-Path "Product.js") {
    Move-Item -Path "Product.js" -Destination "frontend/src/components/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "Message.js") {
    Move-Item -Path "Message.js" -Destination "frontend/src/components/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "Loader.js") {
    Move-Item -Path "Loader.js" -Destination "frontend/src/components/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "FormContainer.js") {
    Move-Item -Path "FormContainer.js" -Destination "frontend/src/components/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "Rating.js") {
    Move-Item -Path "Rating.js" -Destination "frontend/src/components/" -Force -ErrorAction SilentlyContinue
}

# Move layout components
if (Test-Path "Header.js") {
    Move-Item -Path "Header.js" -Destination "frontend/src/components/layout/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "Footer.js") {
    Move-Item -Path "Footer.js" -Destination "frontend/src/components/layout/" -Force -ErrorAction SilentlyContinue
}

# Move Redux files
if (Test-Path "store.js") {
    Move-Item -Path "store.js" -Destination "frontend/src/redux/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "userActions.js") {
    Move-Item -Path "userActions.js" -Destination "frontend/src/redux/actions/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "productAction.js") {
    Move-Item -Path "productAction.js" -Destination "frontend/src/redux/actions/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "cartActions.js") {
    Move-Item -Path "cartActions.js" -Destination "frontend/src/redux/actions/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "userConstants.js") {
    Move-Item -Path "userConstants.js" -Destination "frontend/src/redux/constants/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "productConstants.js") {
    Move-Item -Path "productConstants.js" -Destination "frontend/src/redux/constants/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "cartConstants.js") {
    Move-Item -Path "cartConstants.js" -Destination "frontend/src/redux/constants/" -Force -ErrorAction SilentlyContinue
}

# Move assets to public folder
if (Test-Path "*.jpg") {
    Move-Item -Path "*.jpg" -Destination "frontend/public/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "*.png") {
    Move-Item -Path "*.png" -Destination "frontend/public/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "favicon.ico") {
    Move-Item -Path "favicon.ico" -Destination "frontend/public/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "index.html") {
    Move-Item -Path "index.html" -Destination "frontend/public/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "robots.txt") {
    Move-Item -Path "robots.txt" -Destination "frontend/public/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "manifest.json") {
    Move-Item -Path "manifest.json" -Destination "frontend/public/" -Force -ErrorAction SilentlyContinue
}
if (Test-Path "bootstrap.min.css") {
    Move-Item -Path "bootstrap.min.css" -Destination "frontend/public/" -Force -ErrorAction SilentlyContinue
}

# Remove screens directory from components if it exists (screens should be at the src level)
Remove-Item -Path "frontend/src/components/screens" -Recurse -Force -ErrorAction SilentlyContinue

# 5. Final cleanup: Remove any remaining .pyc files that may have been generated during the process
Get-ChildItem -Path . -Recurse -Filter "*.pyc" | Remove-Item -Force

Write-Host "Cleanup completed successfully!" 