import puppeteer from "puppeteer";
import { getCategoriesApi } from "./api.js";
import { sleep } from "./helpers.js";

describe("Croco", () => {
  let browser = null;
  let page = null;
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
    page.goto("http://localhost:8000");
  });

  test("Categories", async () => {
    const categories = await getCategoriesApi();
    const bestSellerTotal = categories.find(
      (item) => item.category === "web:popular"
    ).totalGames;

    await sleep(3000);

    const bestSellerNodeTotal = await page.evaluate(() => {
      const appMainNode = document.body.querySelector("app-main");
      const appListNode = appMainNode.shadowRoot.querySelector("app-list");
      return appListNode.shadowRoot.childElementCount;
    });

    expect(bestSellerNodeTotal).toBe(bestSellerTotal);
  });

  afterAll(async () => {
    await browser.close();
  });
}, 200000);
