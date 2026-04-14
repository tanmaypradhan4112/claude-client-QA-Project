import { testData } from "../utils/testdata";

export class InventoryPage{
    constructor(inventorypage){
        this.inventorypage = inventorypage;
        this.burgerMenuButton = inventorypage.getByRole('button', { name: 'Open Menu' });
        this.logoutlink = inventorypage.locator('[data-test="logout-sidebar-link"]');
        this.inventorypageTitle = inventorypage.locator('[data-test="title"]');
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