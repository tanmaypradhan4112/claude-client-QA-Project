// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { testData } from '../../utils/testdata';

test.beforeEach(async ({ page }) => {
    // Initialize the LoginPage object before each test
    await page.goto(testData.url.loginUrl);
});

test.describe('Authentication Postive Scenarios', () => {

    // PARAMETERIZED TEST: Handles TC_AUTH_01, 04, 05, 06 in one block
    const validUsers = [
        { id: '01', user: testData.username.standard_user},
        { id: '04', user: testData.username.problem_user},
        { id: '05', user: testData.username.error_user,},
        { id: '06', user: testData.username.visual_user},
    ];

    for (const user of validUsers) {
        test(`Valid Login of ${user.user}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            const inventoryPage = new InventoryPage(page);

            // Login with the username and Password
            await loginPage.login(user.user, testData.credential.password);

            // Expect URL to be inventory page URL
            await expect(page).toHaveURL(testData.url.inventoryUrl);

            // Expect title to be "Products"
            await expect(inventoryPage.inventorypageTitle).toHaveText('Products');

            // Screenshot after successful login
            await loginPage.Takescreenshot(testData.resultPath.auth, `TC_AUTH_${user.id}`);
        });
    }

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
        await loginPage.Takescreenshot(testData.resultPath.auth, "TC_AUTH_02");
    });

    // TC_AUTH_03 - Verify login with delayed response user
    test('TC_AUTH_03 - Delayed Response Login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        await loginPage.login(testData.username.performance_glitch_user, testData.credential.password);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl, { timeout: 15000 });

        // Expect title to be "Products"
        await expect(inventoryPage.inventorypageTitle).toHaveText('Products');

        // Screenshot after successful login
        await loginPage.Takescreenshot(testData.resultPath.auth, "TC_AUTH_03");
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
        await loginPage.Takescreenshot(testData.resultPath.auth, "TC_AUTH_08");
    });

    // TC_AUTH_09 - Verify error when password is not provided
    test("TC_AUTH_09 - Password is not provided", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(testData.username.standard_user, testData.credential.emptyPassword);

        await expect(loginPage.errorblock).toHaveText("Epic sadface: Password is required");

        // Screenshot after error pop up
        await loginPage.Takescreenshot(testData.resultPath.auth, "TC_AUTH_09");
    });

    // TC_AUTH_10 - Verify error when username is not provided
    test("TC_AUTH_10 - username is not provided", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(testData.username.emptyUsername, testData.credential.password);

        await expect(loginPage.errorblock).toHaveText("Epic sadface: Username is required");

        // Screenshot after error pop up
        await loginPage.Takescreenshot(testData.resultPath.auth, "TC_AUTH_10");
    });

    // TC_AUTH_11 - Verify error when both username and password are not provided
    test("TC_AUTH_11 - both username and password are not provided", async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(testData.username.emptyUsername, testData.credential.emptyPassword);

        await expect(loginPage.errorblock).toHaveText("Epic sadface: Username is required");

        // Screenshot after error pop up
        await loginPage.Takescreenshot(testData.resultPath.auth, "TC_AUTH_11");
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
        await loginPage.Takescreenshot(testData.resultPath.auth, "TC_AUTH_07");
    });

});

