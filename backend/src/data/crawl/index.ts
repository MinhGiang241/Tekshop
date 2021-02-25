const puppeteer = require("puppeteer");
const fs = require("fs");

const makeRequest = async (page: any, urls: string[]) => {
  let products: any[] = [];

  for (let url of urls) {
    try {
      await page.goto(`${url}`, { waitUntil: "networkidle2" });

      const data = await page.evaluate(() => {
        const images = document.querySelectorAll(".swiper-slide img") || "";
        const arrImage = Array.from(images).map((i: any) => i.src) || [];
        const description =
          (document.querySelector(".st-pd-content p") as HTMLElement)!
            .innerText || "";
        const priceString =
          (document.querySelector(".st-price-main") as HTMLElement)!
            .innerText || "chưa xác định";

        const price = priceString.replace("đ", "");
        const name =
          (document.querySelector(".st-name") as HTMLElement).innerText
            .split("(")[0]
            .trim() || "chưa xác định";
        const brand = name.split(" ")[0];
        const screen =
          (document.querySelector("li[data-info='Màn hình']") as HTMLElement)!
            .innerText || "chưa xác định";
        const mainCamera =
          (document.querySelector("li[data-info='Camera sau']") as HTMLElement)!
            .innerText || "chưa xác định";
        const selfieCamera =
          (document.querySelector(
            "li[data-info='Camera Selfie']"
          ) as HTMLElement)!.innerText || "chưa xác định";
        const CPU =
          (document.querySelector("li[data-info='CPU']") as HTMLElement)!
            .innerText || "chưa xác định";
        const hdd =
          (document.querySelector(
            "li[data-info='Bộ nhớ trong']"
          ) as HTMLElement)!.innerText || "chưa xác định";

        const battery =
          (Array.from(document.querySelectorAll("tr span")) as HTMLElement[])[7]
            .innerText || "chưa xác định";

        const timeRelease =
          (Array.from(
            document.querySelectorAll("tr span")
          ) as HTMLElement[])[11].innerText || "chưa xác định";

        const RAM =
          (Array.from(document.querySelectorAll("tr span")) as HTMLElement[])[3]
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
    } catch (err) {
      continue;
    }
  }

  return products;
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(
    "https://fptshop.com.vn/dien-thoai?sort=gia-cao-den-thap&trang=13"
  );
  const links = await page.evaluate(() => {
    let ProductsLinks = Array.from(
      document.querySelectorAll(".cdt-product__img a")
    ).map((i: any) => (i.href === "" ? null : i.href));
    return ProductsLinks;
  });
  console.log(links.length);
  fs.writeFile("links.json", JSON.stringify(links), () => {
    console.log("Links OK");
  });

  const products = await makeRequest(page, links);

  fs.writeFile("data.json", JSON.stringify(products), () => {
    console.log("products OK");
  });

  await browser.close();
})();
