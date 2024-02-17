const puppeteer = require('puppeteer');

class Page { 
    static async build() {
        const browser = await puppeteer.launch({
            headless: false
        })

        const page = await browser.newPage();
        const customPage = new Page(page)
    
        return new Proxy(customPage, {
            get: function(target, property) {
                return customPage[property] || browser[property] || page(property)
            }
        })
    }

    constructor(page) {
        this.page = page;
    }

    async login() {
        
    }
}

module.exports = Page