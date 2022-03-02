import client from "../database";
import { ProductStore } from "../models/products";
import { setupTestDatabase, tearDownTestDatabase } from "./utils";

xdescribe("Product Model", () => {
    beforeAll(async () => await setupTestDatabase());

    it("should have an index method", () => {
        expect(ProductStore.index).toBeDefined();
    });

    it("index method should return product list", async () => {
        const products = await ProductStore.index();
        expect(products).toEqual([
            {
                id: 0,
                name: "test",
                price: 100,
            },
        ]);
    });

    it("should have a show method", () => {
        expect(ProductStore.show).toBeDefined();
    });

    it("show method should get a product", async () => {
        const product = await ProductStore.show(0);
        expect(product).toEqual({
            id: 0,
            name: "test",
            price: 100,
        });
    });

    it("should have a create method", () => {
        expect(ProductStore.create).toBeDefined();
    });

    it("create method should create a product", async () => {
        const productToCreate = {
            name: "test2",
            price: 200,
        };
        const product = await ProductStore.create(productToCreate);
        expect(product).toEqual({
            id: 1,
            ...productToCreate,
        });
        const conn = await client.connect();
        const sql = "DELETE FROM products WHERE id = 1;";
        await conn.query(sql);
        conn.release();
    });

    afterAll(async () => await tearDownTestDatabase());
});
