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
    productlist: [
        {
            title: "Sauce Labs Backpack",
            price: "$29.99",
            description: "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
            img: "/static/media/sauce-backpack-1200x1500.0a0b85a385945026062b.jpg"
        },
        {
            title: "Sauce Labs Bike Light",
            price: "$9.99",
            description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
            img: "/static/media/bike-light-1200x1500.37c843b09a7d77409d63.jpg"
        },
        {
            title: "Sauce Labs Bolt T-Shirt",
            price: "$15.99",
            description: "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
            img: "/static/media/bolt-shirt-1200x1500.c2599ac5f0a35ed5931e.jpg"
        },
        {
            title: "Sauce Labs Fleece Jacket",
            price: "$49.99",
            description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
            img: "/static/media/sauce-pullover-1200x1500.51d7ffaf301e698772c8.jpg"
        },
        {
            title: "Sauce Labs Onesie",
            price: "$7.99",
            description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
            img: "/static/media/red-onesie-1200x1500.2ec615b271ef4c3bc430.jpg"
        },
        {
            title: "Test.allTheThings() T-Shirt (Red)",
            price: "$15.99",
            description: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
            img: "/static/media/red-tatt-1200x1500.30dadef477804e54fc7b.jpg"
        },
    ],
    resultPath:{
        auth : "utils/test-results/auth/",
        inventory : "utils/test-results/inventory"
    }
};