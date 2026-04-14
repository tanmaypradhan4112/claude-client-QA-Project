// This file contains test data for funtional tests
// Test date includes username, password, login url, inventory url

export const testData = {
    url:{
        loginUrl: 'https://www.saucedemo.com/',
        inventoryUrl: 'https://www.saucedemo.com/inventory.html'
    },
    credential: {
        password: 'secret_sauce',
        emptyPassword:""
    },
    username: {
        emptyUsername: "",
        standard_user: 'standard_user',
        locked_out_user: 'locked_out_user',
        problem_user: 'problem_user',
        performance_glitch_user: 'performance_glitch_user',
        error_user: 'error_user',
        visual_user: 'visual_user'
    },
    resultPath:{
        auth : "test-results/auth/",
        inventory : "test-results/inventory"
    }
};