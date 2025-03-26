import request from 'supertest';
import { describe, expect, it } from '@jest/globals';

import app from '../../src/app';
import { User } from '@prisma/client';

describe("POST /register", () => {
  it("should return a user of type User", async () => {
    const userData = {
      name: "testuser",
      email: "test@example.com",
      password: "securepassword",
    };

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(userData)
      .expect(200);

    expect(response.body).toHaveProperty("user");
    const user: User = response.body.user;

    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: "testuser",
        email: "test@example.com",
        passwordHash: "",
        activated: false,
        disabled: false
      })
    );
  });
});