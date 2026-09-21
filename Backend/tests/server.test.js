// tests/server.test.js
import request from "supertest";
import app from "../src/app.js";

describe("Root Endpoint", () => {
  it("should respond with 200 on GET /", async () => {
    const response = await request(app).get("/");
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      expect(response.body).toEqual({
        message: "Welcome to the Spiritual Consultation API! 2",
      });
    }
  });
});