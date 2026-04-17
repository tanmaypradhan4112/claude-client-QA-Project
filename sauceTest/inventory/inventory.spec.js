// @ts-check

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { testData } from '../../utils/testdata';

test.describe('Inventory Positive Scenarios', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        // Initialize the LoginPage object before each test
        await page.goto(testData.url.loginUrl);
        //Fill Username and password
        await loginPage.login(testData.username.standard_user, testData.credential.password);
    });

    // TC-INV-01 Inventory Visibility
    test('TC_INV_01 Inventory Visibility', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl);

        // Assert Product Card Content
        const productsToValidate = Object.values(testData.productlist);
        for (const [index, product] of productsToValidate.entries()) {
            await inventoryPage.expectProductToMatch(index, product);
        }

        // Take Screenshot for Test Result / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-01");
    });

    // TC-INV-03	Filter: A to Z
    test('TC-INV-03 Filter: A to Z', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Click on filter dropdown and select index 0 (A to Z)
        await inventoryPage.filterDropdownOption(0);

        // Assert to validate the order Products are sorted alphabetically. First item is "Sauce Labs Backpack".        
        await inventoryPage.expectProductToMatch(0,testData.productlist.backpack);

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-03");
    });

    // TC-INV-04 Filter: Z to A
    test('TC-INV-04 Filter: Z to A', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Click on filter dropdown and select index 1 (Z to A)
        await inventoryPage.filterDropdownOption(1);

        // Assert to validate the order Products are sorted in reverse alphabetical order. 
        // First item is "Test.allTheThings() T-Shirt (Red).
        await inventoryPage.expectProductToMatch(0,testData.productlist.redTshirt);

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-04");
    });

    // TC-INV-05 Filter: Price Low to High
    test('TC-INV-05 Filter: Price Low to High', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Click on filter dropdown and select index 1 (Z to A)
        await inventoryPage.filterDropdownOption(2);

        // Product with the lowest price - Onesie - appears first.
        await inventoryPage.expectProductToMatch(0,testData.productlist.onesie);
    });

    // TC-INV-06 Filter: Price High to Low
    test('TC-INV-06 Filter: Price High to Low ', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl);

        // Click on filter dropdown and select index 1 (Z to A)
        await inventoryPage.filterDropdownOption(2);

        // Product with the highest price - Fleece Jacket -  appears first.
        await inventoryPage.expectProductToMatch(0,testData.productlist.fleecejacket);
    });

});

test.describe('Inventory Negative Scenarios', () => {
    test.skip('WIP', ({ page }) => {
        // 
    });

});

test.describe('Inventory Edge Scenarios', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        // Initialize the LoginPage object before each test
        await page.goto(testData.url.loginUrl);
        //Fill Username and password
        await loginPage.login(testData.username.performance_glitch_user, testData.credential.password);
    });

    // TC-INV-02	Performance Login
    test('TC_INV_02 Performance Login', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Expect URL to be inventory page URL
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(testData.url.inventoryUrl);

        // Assert Product Card Content
        const productsToValidate = Object.values(testData.productlist);
        for (const [index, product] of productsToValidate.entries()) {
            await inventoryPage.expectProductToMatch(index, product);
        }

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-02");
    });
});