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

### Test Planning - Authentication

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

**Negative Scenarios**
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

| Test Case ID | Test Case Name                | Test Case Scenario                               | Test Steps                                                                                  | Test Data                                                                                 | Expected Result                                                               |
| ------------ | ----------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| TC_AUTH_01   | Valid Login                   | Verify login with valid credentials              | 1. Navigate to login page <br> 2. Enter username <br> 3. Enter password <br> 4. Click Login | Username: standard_user <br> Password: secret_sauce                                       | User is redirected to https://www.saucedemo.com/inventory.html and "Products" Heading is visible.                                          |
| TC_AUTH_02   | Login and Logout Flow         | Verify end-to-end login and logout functionality | 1. Login with valid credentials <br> 2. Click burger menu <br> 3. Click Logout              | Username: standard_user <br> Password: secret_sauce                                       | User logs in and logs out successfully and is redirected to login page(https://www.saucedemo.com/) with username field visible     |
| TC_AUTH_03   | Performance Glitch User Login | Verify login with delayed response user          | 1. Navigate to Login page(url : "https://www.saucedemo.com/") <br> 2. Enter username <br> 3. Enter password <br> 4. Click Login                                | Username: performance_glitch_user <br> Password: secret_sauce                             | User is redirected to inventory page(https://www.saucedemo.com/inventory.html) with "Products" heading visible                    |
| TC_AUTH_04   | Problem User Login            | Verify login with UI issue user                  | 1. Navigate to Login page(url : "https://www.saucedemo.com/") <br> 2. Enter username <br> 3. Enter password <br> 4. Click Login                                | Username: problem_user <br> Password: secret_sauce                                        | User is redirected to inventory page(https://www.saucedemo.com/inventory.html) with "Products" heading visible                 |
| TC_AUTH_05   | Error User Login              | Verify login with error-prone user               | 1. Navigate to Login page(url : "https://www.saucedemo.com/") <br> 2. Enter username <br> 3. Enter password <br> 4. Click Login                                | Username: error_user <br> Password: secret_sauce                                          | User is redirected to inventory page(https://www.saucedemo.com/inventory.html) with "Products" heading visible             |
| TC_AUTH_06   | Visual User Login             | Verify login with visual defect user             | 1. Navigate to Login page(url : "https://www.saucedemo.com/") <br> 2. Enter username <br> 3. Enter password <br> 4. Click Login                                | Username: visual_user <br> Password: secret_sauce                                         | User is redirected to inventory page(https://www.saucedemo.com/inventory.html) with "Products" heading visible.           |
| TC_AUTH_07   | Unauthorized Inventory Access | Verify access restriction without login          | 1. Open browser <br> 2. Navigate to inventory URL directly without login                    | URL: [https://www.saucedemo.com/inventory.html](https://www.saucedemo.com/inventory.html) | User is redirected to login page and error message reads: "Epic sadface: You can only access '/inventory.html' when you are logged in." |
| TC_AUTH_08   | Locked Out User Login         | Verify login restriction for locked user         | 1. Navigate to Login page(url : "https://www.saucedemo.com/") 2. Enter username <br> 3. Enter password <br> 4. Click Login                                | Username: locked_out_user <br> Password: secret_sauce                                     | Error message reads: "Epic sadface: Sorry, this user has been locked out."                                   |
| TC_AUTH_09   | Missing Password              | Verify error when password is not provided       | 1. Navigate to Login page(url : "https://www.saucedemo.com/") <br> 2. Enter username <br> 3. Leave password blank <br> 4. Click Login                          | Username: standard_user <br> Password: (blank)                                            | Error message reads: "Epic sadface: Password is required"                                 |
| TC_AUTH_10   | Missing Username              | Verify error when username is not provided       | 1. Navigate to Login page(url : "https://www.saucedemo.com/") <br> 2. Leave username blank <br> 3. Enter password <br> 4. Click Login                          | Username: (blank) <br> Password: secret_sauce                                             | Error message reads: "Epic sadface: Username is required"                                 |
| TC_AUTH_11   | Empty Credentials             | Verify error when both fields are empty          | 1. Navigate to Login page(url : "https://www.saucedemo.com/") 2. Leave username blank <br> 3. Leave password blank <br> 4. Click Login                    | Username: (blank) <br> Password: (blank)                                                  | Error message reads: "Epic sadface: Username is required"                                 |


  ### Test Planning - Inventory Page

  **Objective:** Test the Inventory product page (https://www.saucedemo.com/inventory.html) which includes product content (Name, Description, Price, Image), filter, Add to Cart functionality.

  - All products are displayed after login
  - Products can be sorted (A→Z, Z→A, Price Low→High, Price High→Low)
  - Each product has a name, description, price, and image
  - "Add to Cart" button works and updates cart badge count

  **In-Scope:**
  - Include all users for authentication and navigate to inventory page
  - Testing the product content
  - Testing the state change of Shopping Cart badge and Filter

  **Out-of-Scope:**
  - Performance/load testing
  - Visual regression testing
  - API-level authentication testing

  ***Entry Criteria***:
  - The application must be accessible at https://www.saucedemo.com and https://www.saucedemo.com/inventory.html
  - All 6 test user credentials must be valid and functional
  - Playwright environment must be configured and dependencies installed

  ***Pass/Fail Criteria***
  - Pass Criteria → "A test case PASSES when actual result = expected result"
  - Fail Criteria → "A test case FAILS when actual result ≠ expected result, or an unhandled exception occurs, or an assertion timeout is reached"

  ***Pass Criteria***
  UserName = "standard_user" and Password = "secret_sauce"
  UserName = "performance_glitch_user" and Password = "secret_sauce" (Note: performance_glitch_user logs in and uses the inventory page functionally — but with delays.)

  1. Validate all the products are visible in the Inventory page
  Expectation: All the Product must be present in the inventory with correct image, price, title and description

  2. Validate the Filter functionality
  Expectation: Upon click different option, the product should change the order
  - A→Z: First product name alphabetically appears first, last appears last
  - Z→A: Last product name alphabetically appears first
  - Price Low→High: Lowest priced product appears first
  - Price High→Low: Highest priced product appears first

  3. Validate Add to Cart and Remove button state change and cart badge
   Expectation:
   - Clicking "Add to cart" changes button to "Remove" and badge increments by 1
   - Clicking "Remove" changes button back to "Add to cart" and badge decrements by 1
   - Adding all 6 products results in badge showing 6
   - Removing all 6 products results in badge disappearing


  ***Negative Scenarios***
  1. Validate product images with problem_user
   - Username: problem_user | Password: secret_sauce
   - Expectation: Product images do NOT match their respective product 
   titles — all images render as the same incorrect image.
  
  2. Validate Add to Cart with error_user
   - Username: error_user | Password: secret_sauce
   - Expectation: "Add to Cart" button interaction produces a functional 
   error and does not update the cart badge correctly.

  3. Validate inventory layout with visual_user
   - Username: visual_user | Password: secret_sauce
   - Expectation: Page loads and products are visible but visual/layout 
   defects are present.


  ***Roles & Responsibilites***:
  - QA : Tanmay Pradhan


  **Exit Criteria***:
  - All test cases have been executed at least once
  - All critical/high priority test cases pass with zero failures
  - Test results and evidence are documented and reviewed


  ### Test Planning - Product Details Page

  **Objective:** Test the Inventory product details page (https://www.saucedemo.com/inventory-item.html?id) which includes product content (Name, Description, Price, Image) and Add to Cart / Remove button functionality.

  - Clicking a product navigates to its detail page
  - Product info matches what was on the inventory page
  - "Add to Cart" / "Remove" toggle works from detail page
  - "Back to products" button works

   **In-Scope:**
  - Users under test: standard_user, performance_glitch_user, problem_user, error_user, visual_user for validation of product details page
  - Testing the product details page content
  - Testing the state change of Shopping Cart badge and Back to products button
  - Validate navigation from inventory page to product detail page via product click

  **Out-of-Scope:**
  - Performance/load testing
  - Visual regression testing
  - API-level authentication testing

  ***Entry Criteria***:
  - The application must be accessible at https://www.saucedemo.com and https://www.saucedemo.com/inventory.html and https://www.saucedemo.com/inventory-item.html?id
  - All 6 test user credentials must be valid and functional
  - Playwright environment must be configured and dependencies installed

  Pass Criteria → "A test case PASSES when actual result = expected result"
  Fail Criteria → "A test case FAILS when actual result ≠ expected result, 
  or an unhandled exception occurs, or an assertion timeout is reached"

  ***Pass Criteria***
  UserName = "standard_user" and Password = "secret_sauce"
  UserName = "performance_glitch_user" and Password = "secret_sauce" (Note: performance_glitch_user logs in and uses the inventory page functionally — but with delays.)

  1. Validate navigation to product detail page
  Expectation: Clicking a product navigates to https://www.saucedemo.com/inventory-item.html?id=[n] and product name heading is visible.

  2. Validate product detail page content matches inventory page
  Expectation: After navigating to the detail page of a product, the displayed name, description, price, and image src match the values stored in testData.productlist for that product. All four fields must be verified for at least one product.

  3. Validate state change of `Add to Cart` and `Remove` button in product details page
  Expectation: Clicking "Add to cart" changes button to "Remove" and cart badge increments to 1. Clicking "Remove" reverts button to "Add to cart" and badge disappears.

  4. Validate `Back to products` button works
  Expectation: Clicking "Back to products" redirects to https://www.saucedemo.com/inventory.html and "Products" heading is visible. 
  Additonal Expectation: Add a product and the Cart badge count goes to 1. Cart badge count persists after returning to inventory page.

  ***Negative Scenarios***
  1. Validate products details page and content using "problem_user"
  - Username: problem_user | Password: secret_sauce
  - Expectation: Expectation: Product name, description, and price match inventory values but product image does NOT match — same incorrect/placeholder image defect from inventory page is present on detail page.

  2. Validate state change of `Add to Cart` and `Remove` button in product details page using "error_user"
  - Username: error_user | Password: secret_sauce
  - Expectation: "Add to Cart" button click does not update the cart badge for one or more products — badge remains hidden after interaction.

  3. Validate product details page and content using "visual_user"
  - Username: visual_user | Password: secret_sauce
   - Expectation: Page loads and products are visible but visual/layout 
   defects are present.

   ***Edge Case Scenarios***
   1. Direct URL (URL: https://www.saucedemo.com/inventory-item.html?id=1) access to product detail page without login
   Expectation : Error is shown "Epic sadface: You can only access '/inventory-item.html' when you are logged in."
   
  ***Roles & Responsibilites***:
  - QA : Tanmay Pradhan

  **Exit Criteria***:
  - All test cases have been executed at least once
  - All critical/high priority test cases pass with zero failures
  - Test results and evidence are documented and reviewed
