export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateAddress = (address) => {
  return address.trim().length >= 5;
};

export const validateCity = (city) => {
  return city.trim().length >= 2;
};

export const validatePostalCode = (postalCode) => {
  const postalCodeRegex = /^[A-Za-z0-9\s-]{3,10}$/;
  return postalCodeRegex.test(postalCode);
};

export const validateCountry = (country) => {
  return country.trim().length >= 2;
};

export const validateProductName = (name) => {
  return name.trim().length >= 3;
};

export const validateProductPrice = (price) => {
  return !isNaN(price) && price > 0;
};

export const validateProductCountInStock = (count) => {
  return !isNaN(count) && count >= 0;
};

export const validateProductDescription = (description) => {
  return description.trim().length >= 10;
};

export const getValidationErrors = (values) => {
  const errors = {};

  if (values.email && !validateEmail(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (values.password && !validatePassword(values.password)) {
    errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  }

  if (values.name && !validateName(values.name)) {
    errors.name = 'Name must be at least 2 characters long';
  }

  if (values.phone && !validatePhone(values.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (values.address && !validateAddress(values.address)) {
    errors.address = 'Address must be at least 5 characters long';
  }

  if (values.city && !validateCity(values.city)) {
    errors.city = 'City must be at least 2 characters long';
  }

  if (values.postalCode && !validatePostalCode(values.postalCode)) {
    errors.postalCode = 'Please enter a valid postal code';
  }

  if (values.country && !validateCountry(values.country)) {
    errors.country = 'Country must be at least 2 characters long';
  }

  if (values.productName && !validateProductName(values.productName)) {
    errors.productName = 'Product name must be at least 3 characters long';
  }

  if (values.price && !validateProductPrice(values.price)) {
    errors.price = 'Price must be a positive number';
  }

  if (values.countInStock && !validateProductCountInStock(values.countInStock)) {
    errors.countInStock = 'Count in stock must be a non-negative number';
  }

  if (values.description && !validateProductDescription(values.description)) {
    errors.description = 'Description must be at least 10 characters long';
  }

  return errors;
}; 