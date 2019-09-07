import { FacebookProfile } from "@plumier/social-login"
import { Server } from "http"
import Plumier, { WebApiFacility } from "plumier"
import puppeteer, { Browser } from "puppeteer"

import { fb, google } from "./config"

describe("Social Login Using Robot", () => {
    let server: Server;
    let browser: Browser

    beforeAll(async () => {
        const callback = await new Plumier()
            .set({ mode: "production" })
            .set(new WebApiFacility())
            .initialize()
        server = callback.listen(8000)
        browser = await puppeteer.launch({ headless: true })
    })

    afterAll(async () => {
        server.close()
        await browser.close()
    })

    it("Should able to login with facebook", async () => {
        const page = (await browser.pages())[0]
        await page.goto("http://localhost:8000/facebook/login")
        await page.type("input[name=email]", fb.email)
        await page.type("input[name=pass]", fb.password)
        await page.click("button[name=login]")
        const json: FacebookProfile = await page.evaluate(() => JSON.parse(document.querySelector("body")!.innerText))
        expect(json.id).toBe("108088337240625")
        expect(json.name).toBe("Plumier Sudarsa")
    }, 20000)

    it("Should able to login with google", async () => {
        const page = (await browser.pages())[0]
        await page.goto("http://localhost:8000/google/login", { waitUntil: "networkidle0" })
        await page.type("input[name=identifier]", google.email)
        await page.click("#identifierNext")
        await page.waitFor(1000)
        await page.type("input[name=password]", google.password)
        await page.click("#passwordNext")
        await page.waitForNavigation({waitUntil: "networkidle0"})
        const json: FacebookProfile = await page.evaluate(() => JSON.parse(document.querySelector("body")!.innerText))
        expect(json.id).toBe("115265112982540663763")
        expect(json.name).toBe("Plumier Tester")
    }, 20000)
})