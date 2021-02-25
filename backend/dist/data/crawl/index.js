"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteer = require("puppeteer");
const fs = require("fs");
const makeRequest = (page, urls) => __awaiter(void 0, void 0, void 0, function* () {
    let products = [];
    for (let url of urls) {
        try {
            yield page.goto(`${url}`, { waitUntil: "networkidle2" });
            const data = yield page.evaluate(() => {
                const images = document.querySelectorAll(".swiper-slide img") || "";
                const arrImage = Array.from(images).map((i) => i.src) || [];
                const description = document.querySelector(".st-pd-content p")
                    .innerText || "";
                const priceString = document.querySelector(".st-price-main")
                    .innerText || "chưa xác định";
                const price = priceString.replace("đ", "");
                const name = document.querySelector(".st-name").innerText
                    .split("(")[0]
                    .trim() || "chưa xác định";
                const brand = name.split(" ")[0];
                const screen = document.querySelector("li[data-info='Màn hình']")
                    .innerText || "chưa xác định";
                const mainCamera = document.querySelector("li[data-info='Camera sau']")
                    .innerText || "chưa xác định";
                const selfieCamera = document.querySelector("li[data-info='Camera Selfie']").innerText || "chưa xác định";
                const CPU = document.querySelector("li[data-info='CPU']")
                    .innerText || "chưa xác định";
                const hdd = document.querySelector("li[data-info='Bộ nhớ trong']").innerText || "chưa xác định";
                const battery = Array.from(document.querySelectorAll("tr span"))[7]
                    .innerText || "chưa xác định";
                const timeRelease = Array.from(document.querySelectorAll("tr span"))[11].innerText || "chưa xác định";
                const RAM = Array.from(document.querySelectorAll("tr span"))[3]
                    .innerText || "chưa xác định";
                return {
                    image: arrImage,
                    description,
                    price,
                    name,
                    brand,
                    screen,
                    mainCamera,
                    selfieCamera,
                    CPU,
                    hdd,
                    RAM,
                    battery,
                    timeRelease,
                    category: "Phone",
                    countInStock: 10,
                    rating: 5,
                    numReviews: 0,
                };
            });
            products = [...products, data];
        }
        catch (err) {
            continue;
        }
    }
    return products;
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer.launch({ headless: false });
    const page = yield browser.newPage();
    yield page.setDefaultNavigationTimeout(0);
    yield page.goto("https://fptshop.com.vn/dien-thoai?sort=gia-cao-den-thap&trang=13");
    const links = yield page.evaluate(() => {
        let ProductsLinks = Array.from(document.querySelectorAll(".cdt-product__img a")).map((i) => (i.href === "" ? null : i.href));
        return ProductsLinks;
    });
    console.log(links.length);
    fs.writeFile("links.json", JSON.stringify(links), () => {
        console.log("Links OK");
    });
    const products = yield makeRequest(page, links);
    fs.writeFile("data.json", JSON.stringify(products), () => {
        console.log("products OK");
    });
    yield browser.close();
}))();
