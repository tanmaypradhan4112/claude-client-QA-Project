// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { testData } from '../../utils/testdata';

test.beforeEach(async ({ page }) => {
    // Initialize the LoginPage object before each test
    await page.goto(testData.url.loginUrl);
});

// TC_AUTH_01 - Verify login with valid credentials
// TC_AUTH_02 - Verify end-to-end login and logout functionality
// TC_AUTH_03 - Verify login with delayed response user
// TC_AUTH_04 - Verify login with UI issue user
// TC_AUTH_05 - Verify login with error user
// TC_AUTH_06 - Verify login with visual defect user
// TC_AUTH_08 - Verify login with locked out user
test.describe('Authentication Pass Criteria', () => {
    test('TC_AUTH_01 - Valid Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(testData.username.standard_user, testData.credential.password);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl);
        // Expect title to be "Products"
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');

        // Screenshot after successful login
        await page.screenshot({ path: `test-results/TC_AUTH_01_${Date.now()}.png`, fullPage: true });
    });

    test('TC_AUTH_02 - End-to-End Login and Logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.login(testData.username.standard_user, testData.credential.password);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl);

        // Perform logout action
        await inventoryPage.logout();

        // Screenshot after successful login
        await page.screenshot({ path: `test-results/TC_AUTH_02_${Date.now()}.png`, fullPage: true });
        
        // Expect URL to be login page URL after logout
        await expect(page).toHaveURL(testData.url.loginUrl);

        // Expect the to have username input field visible after logout
        await expect(loginPage.usernameInput).toBeVisible();


    });

});



// TC_AUTH_09 - Verify error when password is not provided
// TC_AUTH_10 - Verify error when username is not provided
// TC_AUTH_11 - Verify error when both username and password are not provided

// test.describe('Authentication Fail Criteria', () => {

// });



// TC_AUTH_07 - Verify access restriction without login
test.fixme("TC_AUTH_07 - Access Restriction without Login", async ({ page }) => {
    // Write code to verify access restriction without login
});
