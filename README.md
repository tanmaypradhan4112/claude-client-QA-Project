# Client Brief: Swag Labs E2E Test Requirements
Hello! Thanks for taking this on. Let me walk you through what I need tested on Swag Labs (saucedemo.com). This is our demo retail storefront and I want full end-to-end coverage before we consider it stable.

## 🏢 About the Application
Swag Labs is a web-based e-commerce store. Users log in, browse products, add them to a cart, and complete a checkout. Simple on the surface — but there are multiple user personas that behave differently, and I want every critical path validated.

## ✅ Functional Areas I Want Tested
1. Authentication

Successful login with standard_user
Blocked login with locked_out_user (error message must appear)
Login with empty credentials (validation messages)
Logout from the burger menu

2. Product Inventory Page

All products are displayed after login
Products can be sorted (A→Z, Z→A, Price Low→High, Price High→Low)
Each product has a name, description, price, and image
"Add to Cart" button works and updates cart badge count

3. Product Detail Page

Clicking a product navigates to its detail page
Product info matches what was on the inventory page
"Add to Cart" / "Remove" toggle works from detail page
"Back to products" button works

4. Shopping Cart

Cart icon reflects correct item count
Cart page lists correct items with correct prices
Items can be removed from cart
"Continue Shopping" returns to inventory
"Checkout" proceeds to the checkout flow

5. Checkout Flow (most critical path)

Step 1 — Fill in First Name, Last Name, Zip Code
Validation errors on empty submission
Step 2 — Order summary shows correct items, subtotal, tax, and total
Step 3 — Order confirmation page displays success message
Completing order resets the cart

6. Navigation & Burger Menu

"All Items" navigates back to inventory
"About" navigates to the Sauce Labs website
"Logout" ends the session and redirects to login
"Reset App State" clears cart


## 🔴 Specific Scenarios I'm Worried About

Can a user bypass login and directly access /inventory.html?
Does the cart persist correctly across page navigations?
Does sorting actually reorder items correctly on the page?
Do all 6 products always appear for standard_user?

