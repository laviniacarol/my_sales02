import CreateUserService from "./CreateUserService";
import SessionUserService from "./SessionUserService";
import FakeUserRepositories from "../domain/repositories/fakes/FakeUserRepositories";
import AppError from "@shared/errors/AppError";
import { userMock } from "../domain/factories/user.factory";

process.env.APP_SECRET = "test-secret";

let fakeUserRepository: FakeUserRepositories;
let createUser: CreateUserService;
let sessionUser: SessionUserService;

describe("SessionUserService", () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepositories();
    createUser = new CreateUserService(fakeUserRepository);
    sessionUser = new SessionUserService(fakeUserRepository);

    await createUser.execute(userMock);
  });

  it("should be able to authenticate a user", async () => {
    const response = await sessionUser.execute({
      email: userMock.email,
      password: userMock.password,
    });

    expect(response).toHaveProperty("token");
    expect(response.user.email).toBe(userMock.email);
  });

  it("should not be able to authenticate with a non-existing email", async () => {
    await expect(
      sessionUser.execute({
        email: "nonexistent@example.com",
        password: userMock.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await expect(
      sessionUser.execute({
        email: userMock.email,
        password: "wrong-password",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
