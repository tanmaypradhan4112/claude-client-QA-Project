import { testData } from "../utils/testdata";

export class InventoryPage{
    constructor(inventorypage){
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

        remove-sauce-labs-backpack
        this.backpack_removeButton = inventorypage.locator('[data-test="remove-sauce-labs-backpack"]');
        this.bikelight_removeButton = inventorypage.locator('[data-test="remove-sauce-labs-bike-light"]');
        this.bolttshirt_removeButton = inventorypage.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]');
        this.jacket_removeButton = inventorypage.locator('[data-test="remove-sauce-labs-fleece-jacket"]');
        this.onesie_removeButton = inventorypage.locator('[data-test="remove-sauce-labs-onesie"]');
        this.redtshirt_removeButton = inventorypage.locator('[data-test="remove-test.allthethings()-t-shirt-(red)"]');
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
}