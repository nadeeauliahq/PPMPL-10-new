// index.test.js
const {
  fetchProductsData,
  setProductsCards,
  convertToRupiah,
  countDiscount,
} = require("../src/index.js");
const cartData = require("../src/data/cart.js");
const productData = require("../src/data/product.js");

describe("Product API Testing", () => {
  // Test Case 1: should return product data with id 1
  test("fetchProductsData with id 1", async () => {
    const productData = await fetchProductsData(1);
    expect(productData.id).toBe(1);
  });

  // Test Case 2: should check products.length with limit
  test("fetchProductsData with limit", async () => {
    const products = await fetchProductsData();
    const limit = 10; // Set your desired limit
    expect(products.length).toBeLessThanOrEqual(limit);
  });

  // Test Case 3: should return product data with specific condition
  test("fetchProductsData with specific condition", async () => {
    const productData = await fetchProductsData(2); // Assume product with id 2 meets the condition
    expect(productData.id).toBe(2);
    // Add your specific condition checks here
  });

  // Test Case 4: should handle error gracefully
  test("fetchProductsData handles error gracefully", async () => {
    const productData = await fetchProductsData(-1); // Assume product with id -1 does not exist
    expect(productData).toEqual({});
  });
});

describe("Cart API Testing", () => {
  // Mocking fetchCartsData function
  jest.mock("../src/dataService", () => {
    return {
      fetchCartsData: jest.fn(() => cartData),
    };
  });

  // Test Case: membandingkan panjang data carts dengan total
  test("compare carts data length with total", async () => {
    const total = 20; // Set your desired total
    const cartsData = await fetchCartsData();
    expect(cartsData.length).toBe(total);
  });

  // Test Case: ensure fetchCartsData returns null if error
  test("fetchCartsData returns null if error", async () => {
    // Mocking an error scenario
    jest.spyOn(console, 'log').mockImplementation(() => {});
    const cartsData = await fetchCartsData(-1); // Assume an error scenario
    expect(cartsData).toBeNull();
  });
});

describe("Product Utility Testing", () => {
  // Setup to use productData for testing
  let productsData;

  beforeAll(async () => {
    // Use product.js data for testing
    productsData = productData;
  });

  // Test Case 1 for convertToRupiah
  test("convertToRupiah converts price correctly", () => {
    const price = 100; // Set your desired price
    const convertedPrice = convertToRupiah(price);
    expect(convertedPrice).toMatch(/^\Rp\d+,\d+$/);
  });

  // Test Case 2 for convertToRupiah (contoh, sesuaikan dengan kebutuhan)
  test("convertToRupiah converts another price correctly", () => {
    const price = 150; // Set another desired price
    const convertedPrice = convertToRupiah(price);
    expect(convertedPrice).toMatch(/^\Rp\d+,\d+$/);
  });

  // Test Case 3 for countDiscount
  test("countDiscount calculates discount correctly", () => {
    const price = 100; // Set your desired price
    const discount = 10; // Set your desired discount
    const afterDiscount = countDiscount(price, discount);
    expect(afterDiscount).toBe(90);
  });

  // Test Case 4 for countDiscount (contoh, sesuaikan dengan kebutuhan)
  test("countDiscount calculates another discount correctly", () => {
    const price = 200; // Set another desired price
    const discount = 20; // Set another desired discount
    const afterDiscount = countDiscount(price, discount);
    expect(afterDiscount).toBe(160);
  });

  // Test Case 5 for setProductsCards
  test("setProductsCards returns correct keys", () => {
    const productsCards = setProductsCards(productsData);
    const sampleProductCard = productsCards[0];
    expect(sampleProductCard).toHaveProperty("id");
    expect(sampleProductCard).toHaveProperty("title");
    expect(sampleProductCard).toHaveProperty("price");
    expect(sampleProductCard).toHaveProperty("after_discount");
    expect(sampleProductCard).toHaveProperty("image");
  });

  // Test Case 6 for setProductsCards (additional test case)
  test("setProductsCards returns correct keys for another product", () => {
    const anotherProductCard = setProductsCards([{
      id: 3,
      title: 'Product 3',
      price: 75,
      discountPercentage: 15,
      thumbnail: 'path/to/image3.jpg',
    }]);
    const sampleProductCard = anotherProductCard[0];
    expect(sampleProductCard).toHaveProperty("id");
    expect(sampleProductCard).toHaveProperty("title");
    expect(sampleProductCard).toHaveProperty("price");
    expect(sampleProductCard).toHaveProperty("after_discount");
    expect(sampleProductCard).toHaveProperty("image");
  });
});
