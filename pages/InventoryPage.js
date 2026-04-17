import { testData } from "../utils/testdata";
import { expect } from '@playwright/test';

export class InventoryPage {
    constructor(inventorypage) {
        this.inventorypage = inventorypage;
        this.burgerMenuButton = inventorypage.getByRole('button', { name: 'Open Menu' });
        this.logoutlink = inventorypage.locator('[data-test="logout-sidebar-link"]');
        this.inventorypageTitle = inventorypage.locator('[data-test="title"]');

        // Filter
        this.filter = inventorypage.locator('[data-test="product-sort-container"]');
        this.opt1 = "Name (A to Z)";
        this.opt2 = "Name (Z to A)";
        this.opt3 = "Price (low to high)";
        this.opt4 = "Price (high to low)";

        // Shop Cart icon / badge
        this.cartbadge = inventorypage.locator('[data-test="shopping-cart-badge"]');

        // Add-to-cart & Remove Button
        this.backpack_atcButton = inventorypage.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.bikelight_atcButton = inventorypage.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.bolttshirt_atcButton = inventorypage.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        this.jacket_atcButton = inventorypage.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        this.onesie_atcButton = inventorypage.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
        this.redtshirt_atcButton = inventorypage.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');

        this.backpack_removeButton = inventorypage.locator('[data-test="remove-sauce-labs-backpack"]');
        this.bikelight_removeButton = inventorypage.locator('[data-test="remove-sauce-labs-bike-light"]');
        this.bolttshirt_removeButton = inventorypage.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
        this.jacket_removeButton = inventorypage.locator('[data-test="remove-sauce-labs-fleece-jacket"]');
        this.onesie_removeButton = inventorypage.locator('[data-test="remove-sauce-labs-onesie"]');
        this.redtshirt_removeButton = inventorypage.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]');

        // Product
        this.product_card = inventorypage.locator('[data-test="inventory-item"]');
        this.product_title = inventorypage.locator('[data-test="inventory-item-name"]');
        this.product_desc = inventorypage.locator('[data-test="inventory-item-desc"]');
        this.product_price = inventorypage.locator('[data-test="inventory-item-price"]');
        this.product_img = inventorypage.locator('img.inventory_item_img');

        // Filter component
        this.filter_comp = inventorypage.locator('[data-test="product-sort-container"]')
    }

    // Method to navigate to inventory page    
    async navigateToInventoryPage() {
        await this.inventorypage.goto(testData.url.inventoryUrl);
    }

    // Method to Logut via Burger Menu
    async logout() {
        await this.burgerMenuButton.click();
        await this.logoutlink.click();
    }

    // Method to access all 6 "Add to cart" button via index
    async addToCartButton(i) {
        await this.inventorypage.locator('[data-test^="remove"]').nth(i).click();
    }

    // Method to access all the 6 "Remove" button via index
    async removeButton(i) {
        await this.inventorypage.locator('[data-test^="add-to-cart"]').nth(i).click();
    }

    // Method to select dropdown options
    async filterDropdownOption(value) {
        await this.filter_comp.selectOption({ index: value });
    }

    // Validate Product content
    async expectProductToMatch(index, expected) {
        await expect.soft(this.product_title.nth(index)).toHaveText(expected.title);
        await expect.soft(this.product_desc.nth(index)).toHaveText(expected.description);
        await expect.soft(this.product_price.nth(index)).toHaveText(expected.price);

        const img = await this.product_img.nth(index).getAttribute('src');
        expect.soft(img).toBe(expected.img);
    }

    // Method to take screenshot for Inventory Page Test cases
    async Takescreenshot(path, name) {
        await this.inventorypage.screenshot({ path: `${path}${name}.png`, fullPage: true });
    }
}