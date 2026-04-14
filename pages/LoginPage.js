// This file contains Page Object Model for Login Page of Sauce Demo Application

import { testData } from '../utils/testdata';

export class LoginPage {

    // Initializing the locators for username, password and login button
    constructor(loginpage) {
        this.loginpage = loginpage;
        this.usernameInput = loginpage.locator('[data-test="username"]');
        this.passwordInput = loginpage.locator('[data-test="password"]');
        this.loginButton = loginpage.locator('[data-test="login-button"]');
        this.errorblock = loginpage.locator('[data-test="error"]');
    }

    // Method to navigate to login page
    async navigateToLoginPage() {
        await this.loginpage.goto(testData.url.loginUrl);
    }

    // Method to perform login action
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}