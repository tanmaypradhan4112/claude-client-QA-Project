# Client Brief: Swag Labs E2E Test Requirements

Hello! Thanks for taking this on. Let me walk you through what I need tested on Swag Labs (saucedemo.com). This is our demo retail storefront and I want full end-to-end coverage before we consider it stable.

**Link:** https://www.saucedemo.com/

---

## 🏢 About the Application

Swag Labs is a web-based e-commerce store. Users log in, browse products, add them to a cart, and complete a checkout. Simple on the surface — but there are multiple user personas that behave differently, and I want every critical path validated.

#### 1. Authentication

- Successful login with standard_user
- Blocked login with locked_out_user (error message must appear)
- Login with empty credentials (validation messages)
- Logout from the burger menu

#### 2. Product Inventory Page

- All products are displayed after login
- Products can be sorted (A→Z, Z→A, Price Low→High, Price High→Low)
- Each product has a name, description, price, and image
- "Add to Cart" button works and updates cart badge count

#### 3. Product Detail Page
- Clicking a product navigates to its detail page
- Product info matches what was on the inventory page
- "Add to Cart" / "Remove" toggle works from detail page
- "Back to products" button works

#### 4. Shopping Cart
- Cart icon reflects correct item count
- Cart page lists correct items with correct prices
- Items can be removed from cart
- "Continue Shopping" returns to inventory
- "Checkout" proceeds to the checkout flow

#### 5. Checkout Flow (Most Critical Path)
- **Step 1** — Fill in First Name, Last Name, Zip Code
  - Validation errors on empty submission
- **Step 2** — Order summary shows correct items, subtotal, tax, and total
- **Step 3** — Order confirmation page displays success message
  - Completing order resets the cart

#### 6. Navigation & Burger Menu
- "All Items" navigates back to inventory
- "About" navigates to the Sauce Labs website
- "Logout" ends the session and redirects to login
- "Reset App State" clears cart

---

## 🔴 Specific Scenarios I'm Worried About

- Can a user bypass login and directly access `/inventory.html`?
- Does the cart persist correctly across page navigations?
- Does sorting actually reorder items correctly on the page?
- Do all 6 products always appear for `standard_user`?

---

## Test Strategy & Documentation

### Requirement Analysis

Based on the client requirements, the test coverage includes the following areas:

- Authentication
- Product Inventory Page
- Product Details Page
- Shopping Cart
- Checkout Flow
- Navigation & Burger Menu

**Note:** Edge cases and complex scenarios are also mentioned by the client.

### User Authentication Personas

| Username | Password | Expected Behavior |
|----------|----------|-------------------|
| `standard_user` | `secret_sauce` | Normal, fully functional user |
| `locked_out_user` | `secret_sauce` | Should be blocked from logging in |
| `problem_user` | `secret_sauce` | Has known UI/functional bugs |
| `performance_glitch_user` | `secret_sauce` | Experiences slow load times |
| `error_user` | `secret_sauce` | Encounters functional errors |
| `visual_user` | `secret_sauce` | Has visual/layout defects |

---

### Test Planning

#### Authentication

**Objective:** Test the authentication for the username & password to login successfully in https://www.saucedemo.com/inventory.html and further proceed with other flows such as Checkout, About, Logout, and Product Page.

**In-Scope:**
- Include all users for authentication and navigate to inventory page
- Partial / empty credentials login (edge case)
- Logging out using burger menu (Login and Logout flow)

**Out-of-Scope:**
- Performance/load testing
- Visual regression testing
- API-level authentication testing

**Testing Approach:**
- Testing using **Playwright** to automate and capture end-to-end workflows
- We will include functional Testing throughout the testing phase.

***Entry Criteria***:
- The application must be accessible at https://www.saucedemo.com
- All 6 test user credentials must be valid and functional
- Playwright environment must be configured and dependencies installed

***Pass/Fail Criteria***
- Pass Criteria → "A test case PASSES when actual result = expected result"
- Fail Criteria → "A test case FAILS when actual result ≠ expected result, or an unhandled exception occurs, or an assertion timeout is reached"

**Test Case Scenarios**
- Test Case will be divied in three categories
    - Happy Path (Positive Scenarios)
    - Negative Scenarios
    - Edge Cases

**Positive Scenarios**
1. Succesfully Login
- Login using username = "standard_user" and password = "secret_sauce".
- Expected: User is directed to inventory page

2. End to End Login and Logout
- Login using username = "standard_user" and password = "secret_sauce".
- Navigate to burger menu and click on Logout
- Expected: User is able to login and logout succesfully.

3. Login with username = "performance_glitch_user" and password = "secret_sauce"
- Result : User is redirected to inventory page (login response may be delayed)

4. Login with username = "problem_user" and password = "secret_sauce"
- Result : Redirects to inventory, UI anomalies may appear

5. Login with username = "error_user" and password = "secret_sauce"
- Result : Redirects to inventory, functional errors downstream

6. Login with username = "visual_user" and password = "secret_sauce"
- Result : Redirects to inventory, visual defects may appear


**Edge Case Scenarios**
7. Try to bypass authentication
- Without any authentication, try to Navigate user with the following url "https://www.saucedemo.com/inventory.html"
- Expected: Error is shown in login page "Epic sadface: You can only access '/inventory.html' when you are logged in."

*Negative Scenarios*
8. User is locked from login
- Login using username = "locked_out_user" and password = "secret_sauce"
- Expected: An error is shown "Epic sadface: Sorry, this user has been locked out."

9. Partial credentials .1:
- Login using username but no password
- Expected: Error is shown "Epic sadface: Password is required"

10. Partial credentials .2:
- Login using no username but with password
- Expected: Error is shown "Epic sadface: Username is required"

11. Empty credentials:
- Login using with no username and password
- Expected: Error is shown "Epic sadface: Username is required"

***Roles & Responsibilites***:
- QA : Tanmay Pradhan

**Exit Criteria***:
- All test cases have been executed at least once
- All critical/high priority test cases pass with zero failures
- Test results and evidence are documented and reviewed

#### Authetication Test Case Tracker