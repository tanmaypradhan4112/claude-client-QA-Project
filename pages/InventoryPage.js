import { testData } from "../utils/testdata";

export class InventoryPage{
    constructor(inventorypage){
        this.inventorypage = inventorypage;
        this.burgerMenuButton = inventorypage.getByRole('button', { name: 'Open Menu' });
    }

    // Method to navigate to inventory page    
    async navigateToInventoryPage() {
        await this.inventorypage.goto(testData.url.inventoryUrl);
    }

    // Method to Logut via Burger Menu
    async logout() {
        await this.burgerMenuButton.click();
        await this.inventorypage.locator('[data-test="logout-sidebar-link"]').click();
    }
}