import fs from "fs";
import path from "path";

const products = fs.readFileSync(path.join(__dirname, "./crawl/data.json"), {
  encoding: "utf-8",
});

export default JSON.parse(products);
