import { expect } from '@playwright/test';

export class InventoryPage {
    constructor(inventorypage) {
        this.inventorypage = inventorypage;
        this.burgerMenuButton = inventorypage.getByRole('button', { name: 'Open Menu' });
        this.logoutlink = inventorypage.locator('[data-test="logout-sidebar-link"]');
        this.inventorypageTitle = inventorypage.locator('[data-test="title"]');

        // Shop Cart icon / badge
        this.cartbadge = inventorypage.locator('[data-test="shopping-cart-badge"]');

        // Product
        this.product_card = inventorypage.locator('[data-test="inventory-item"]');
        this.product_title = inventorypage.locator('[data-test="inventory-item-name"]');
        this.product_desc = inventorypage.locator('[data-test="inventory-item-desc"]');
        this.product_price = inventorypage.locator('[data-test="inventory-item-price"]');
        this.product_img = inventorypage.locator('img.inventory_item_img');

        // Filter component
        this.filter_comp = inventorypage.locator('[data-test="product-sort-container"]')
    }

    // Method to Logut via Burger Menu
    async logout() {
        await this.burgerMenuButton.click();
        await this.logoutlink.click();
    }

    getAddToCartBtnInCard(index) {
        return this.product_card.nth(index).locator('[data-test^="add-to-cart"]');
    }

    getRemoveBtnInCard(index) {
        return this.product_card.nth(index).locator('[data-test^="remove"]');
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