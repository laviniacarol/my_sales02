import CreateUserService from "./CreateUserService";
import FakeUserRepositories from "../domain/repositories/fakes/FakeUserRepositories";
import AppError from "@shared/errors/AppError";
import { userMock } from "../domain/factories/user.factory";

let fakeUserRepository: FakeUserRepositories;
let createUser: CreateUserService;

describe("CreateUserService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepositories();
    createUser = new CreateUserService(fakeUserRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.execute(userMock);

    expect(user).toHaveProperty("id");
    expect(user.name).toBe(userMock.name);
    expect(user.email).toBe(userMock.email);
  });

  it("should not be able to create a user with an already existing email", async () => {
    await createUser.execute(userMock);

    await expect(
      createUser.execute({ ...userMock, name: "Jane Doe" }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should hash the user password before saving", async () => {
    const user = await createUser.execute(userMock);

    expect(user.password).not.toBe(userMock.password);
  });
});
