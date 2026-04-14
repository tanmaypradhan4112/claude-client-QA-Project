// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage} from '../../pages/InventoryPage';
import { testData } from '../../utils/testdata';

test.beforeEach(async ({ page }) => {
    // Initialize the LoginPage object before each test
    await page.goto(testData.url.loginUrl);
});



test.describe('Authentication Postive Scenarios', () => {

    // TC_AUTH_01 - Verify login with valid credentials
    test('TC_AUTH_01 - Valid Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.login(testData.username.standard_user, testData.credential.password);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl);
        // Expect title to be "Products"
        await expect(inventoryPage.inventorypageTitle).toHaveText('Products');

        // Screenshot after successful login
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_01_${Date.now()}.png`, fullPage: true });
    });

    // TC_AUTH_02 - Verify end-to-end login and logout functionality
    test('TC_AUTH_02 - End-to-End Login and Logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.login(testData.username.standard_user, testData.credential.password);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl);

        // Perform logout action
        await inventoryPage.logout();

        // Expect URL to be login page URL after logout
        await expect(page).toHaveURL(testData.url.loginUrl);

        // Expect the to have username input field visible after logout
        await expect(loginPage.usernameInput).toBeVisible();

        // Screenshot after successful login & logout
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_02_${Date.now()}.png`, fullPage: true });
    });

    // TC_AUTH_03 - Verify login with delayed response user
    test('TC_AUTH_03 - Delayed Response Login', async ({ page }) => {
        test.setTimeout(30000); // 30 seconds
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        await loginPage.login(testData.username.performance_glitch_user, testData.credential.password);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl, { timeout: 15000 });
        // Expect title to be "Products"
        await expect(inventoryPage.inventorypageTitle).toHaveText('Products');

        // Screenshot after successful login
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_03_${Date.now()}.png`, fullPage: true });
    });

    // TC_AUTH_04 - Verify login with UI issue user
    test('TC_AUTH_04 - UI Issue User Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        await loginPage.login(testData.username.problem_user, testData.credential.password);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl);
        // Expect title to be "Products"
        await expect(inventoryPage.inventorypageTitle).toHaveText('Products');

        // Screenshot after successful login
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_04_${Date.now()}.png`, fullPage: true });
    });

    // TC_AUTH_05 - Verify login with error user
    test('TC_AUTH_05 - Error User Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        await loginPage.login(testData.username.error_user, testData.credential.password);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl);
        // Expect title to be "Products"
        await expect(inventoryPage.inventorypageTitle).toHaveText('Products');

        // Screenshot after successful login
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_05_${Date.now()}.png`, fullPage: true });
    });

    // TC_AUTH_06 - Verify login with visual defect user
    test('TC_AUTH_06 - Visual Defect User Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        await loginPage.login(testData.username.visual_user, testData.credential.password);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl);
        // Expect title to be "Products"
        await expect(inventoryPage.inventorypageTitle).toHaveText('Products');

        // Screenshot after successful login
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_06_${Date.now()}.png`, fullPage: true });
    });

});


test.describe('Authentication Negative Scenarios', () => {
    // TC_AUTH_08 - Verify login with locked out user
    test('TC_AUTH_08 - Locked Out User Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(testData.username.locked_out_user, testData.credential.password);

        // Expect URL to be login page URL & error message
        await expect(page).toHaveURL(testData.url.loginUrl);
        await expect(loginPage.errorblock).toHaveText("Epic sadface: Sorry, this user has been locked out.");

        // Screenshot after error pop up
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_08_${Date.now()}.png`, fullPage: true });
    });

    // TC_AUTH_09 - Verify error when password is not provided
    test("TC_AUTH_09 - Password is not provided", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(testData.username.standard_user,testData.credential.emptyPassword);

        await expect(loginPage.errorblock).toHaveText("Epic sadface: Password is required");

        // Screenshot after error pop up
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_09_${Date.now()}.png`, fullPage: true });
    });

    // TC_AUTH_10 - Verify error when username is not provided
    test("TC_AUTH_10 - username is not provided", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(testData.username.emptyUsername, testData.credential.password);

        await expect(loginPage.errorblock).toHaveText("Epic sadface: Username is required");

        // Screenshot after error pop up
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_10_${Date.now()}.png`, fullPage: true });
    });

    // TC_AUTH_11 - Verify error when both username and password are not provided
    test("TC_AUTH_11 - both username and password are not provided", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(testData.username.emptyUsername, testData.credential.emptyPassword);

        await expect(loginPage.errorblock).toHaveText("Epic sadface: Username is required");

        // Screenshot after error pop up
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_11_${Date.now()}.png`, fullPage: true });
    });
});


test.describe('Authentication Edge Case', () => {
    // TC_AUTH_07 - Verify access restriction without login
    test("TC_AUTH_07 - Access Restriction without Login", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto(testData.url.inventoryUrl);
        // Expect URL to be login page URL & error message
        await expect(page).toHaveURL(testData.url.loginUrl);
        await expect(loginPage.errorblock).toHaveText("Epic sadface: You can only access '/inventory.html' when you are logged in.");

        // Screenshot after error pop up
        await page.screenshot({ path: `${testData.resultPath.auth}TC_AUTH_07_${Date.now()}.png`, fullPage: true });
    });

});

