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
        // NOTE: productlist must remain in A→Z order to match default inventory sort
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
        await inventoryPage.expectProductToMatch(0, testData.productlist.backpack);

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
        await inventoryPage.expectProductToMatch(0, testData.productlist.redTshirt);

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-04");
    });

    // TC-INV-05 Filter: Price Low to High
    test('TC-INV-05 Filter: Price Low to High', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Click on filter dropdown and select index 1 (Z to A)
        await inventoryPage.filterDropdownOption(2);

        // Product with the lowest price - Onesie - appears first.
        await inventoryPage.expectProductToMatch(0, testData.productlist.onesie);

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-05");
    });

    // TC-INV-06 Filter: Price High to Low
    test('TC-INV-06 Filter: Price High to Low ', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Click on filter dropdown and select index 1 (Z to A)
        await inventoryPage.filterDropdownOption(3);

        // Product with the highest price - Fleece Jacket -  appears first.
        await inventoryPage.expectProductToMatch(0, testData.productlist.fleecejacket);

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-06");
    });

    // TC-INV-07 Cart Mechanics (Add/Remove)
    test('TC-INV-07 Cart Mechanics (Add/Remove)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        // Clicking add to cart for two products
        await inventoryPage.getAddToCartBtnInCard(0).click();

        // Assert Cart Badge Number
        await expect(inventoryPage.cartbadge).toHaveText('1');

        // verify button changes to "Remove"
        await expect(inventoryPage.getRemoveBtnInCard(0)).toBeVisible();

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-07_1");

        // Removing a product
        await inventoryPage.getRemoveBtnInCard(0).click();

        // Assert Cart Badge Number
        await expect(inventoryPage.cartbadge).toBeHidden();

        // verify button reverts
        await expect(inventoryPage.getAddToCartBtnInCard(0)).toBeVisible();

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-07_2");
    });

    // TC-INV-08 Full Cart Capacity
    test('TC-INV-08 Full Cart Capacity', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const productcount = await inventoryPage.product_card.count();

        // Add all the product to the cart
        for (let addtocartIndex = 0; addtocartIndex < productcount; addtocartIndex++) {
            await inventoryPage.getAddToCartBtnInCard(addtocartIndex).click();
        }

        // Assert Cart Badge Number
        await expect(inventoryPage.cartbadge).toHaveText('6');

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-08_1");

        // Remove all the product from the cart
        for (let removebtnIndex = 0; removebtnIndex < productcount; removebtnIndex++) {
            await inventoryPage.getRemoveBtnInCard(removebtnIndex).click();
        }

        // Assert Cart Badge Number
        await expect.soft(inventoryPage.cartbadge).toBeHidden();

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-08_2");
    });
});

test.describe('Inventory Negative Scenarios', () => {
    test.beforeEach(async ({ page }) => {
        // Initialize the LoginPage object before each test
        await page.goto(testData.url.loginUrl);

    });

    // TC-INV-09 Negative: Image Integrity
    test('TC-INV-09	Negative: Image Integrity', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        //Fill Username and password
        await loginPage.login(testData.username.problem_user, testData.credential.password);

        const productsToValidate = Object.values(testData.productlist);

        // Assertion : Defect Expected: All products display the same incorrect/placeholder image.
        for (const [index, product] of productsToValidate.entries()) {
            const img = await inventoryPage.product_img.nth(index).getAttribute('src');
            expect.soft(img).not.toBe(product.img);
        }

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-09");
    });

    // TC-INV-10	Negative: Functional Error
    test('TC-INV-10	Negative: Functional Error', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        //Fill Username and password
        await loginPage.login(testData.username.error_user, testData.credential.password);

        // Assertions: Defect Expected: Button interaction fails or produces a functional error; badge does not update.
        const productcount = await inventoryPage.product_card.count();

        for (let i = 0; i < productcount; i++) {
            // Locate the current card

            const currenAddToCartbtn = inventoryPage.getAddToCartBtnInCard(i);
            const currentRemovebtn = inventoryPage.getRemoveBtnInCard(i);

            await currenAddToCartbtn.click();

            // Check if the Current Remove Button is Visible
            const isWorking = await currentRemovebtn.isVisible({ timeout: 1000 });

            if (isWorking) {
                await currentRemovebtn.click();
            }
            else {
                // DEFECT PATH: The button is broken (Expected for error_user).
                await expect.soft(currentRemovebtn).toBeHidden();
                await expect.soft(inventoryPage.cartbadge).toBeHidden();
            }

            // take Screenshot for test results / evidence
            await inventoryPage.Takescreenshot(testData.resultPath.inventory, `TC-INV-10-${i}`);
        }
    });

    // TC-INV-11 Negative: Visual Layout
    test("TC-INV-11 Negative: Visual Layout", async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        //Fill Username and password
        await loginPage.login(testData.username.visual_user, testData.credential.password);

        await expect.soft(page).toHaveScreenshot(testData.__screenshot__.idealPageImagePath);

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-11");
    });
});

test.describe('Inventory Positive Scenarios - Performance Glitch User', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        // Initialize the LoginPage object before each test
        await page.goto(testData.url.loginUrl);
        //Fill Username and password
        await loginPage.login(testData.username.performance_glitch_user, testData.credential.password);
    });

    // TC-INV-02	Performance Login
    test('TC_INV_02 Performance Login', async ({ page }) => {
        test.setTimeout(30000);
        const inventoryPage = new InventoryPage(page);

        // Expect URL to be inventory page URL
        await expect(page).toHaveURL(testData.url.inventoryUrl, { timeout: 15000 });
        await page.waitForLoadState('domcontentloaded');

        // Assert Product Card Content
        const productsToValidate = Object.values(testData.productlist);
        for (const [index, product] of productsToValidate.entries()) {
            await inventoryPage.expectProductToMatch(index, product);
        }

        // take Screenshot for test results / evidence
        await inventoryPage.Takescreenshot(testData.resultPath.inventory, "TC-INV-02");
    });
});