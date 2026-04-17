import CreateUserService from "./CreateUserService";
import FakeUserRepositories from "../domain/repositories/fakes/FakeUserRepositories";
import AppError from "@shared/errors/AppError";

let fakeUserRepository: FakeUserRepositories;
let createUser: CreateUserService;

describe("CreateUserService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepositories();
    createUser = new CreateUserService(fakeUserRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("John Doe");
    expect(user.email).toBe("johndoe@example.com");
  });

  it("should not be able to create a user with an already existing email", async () => {
    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    await expect(
      createUser.execute({
        name: "Jane Doe",
        email: "johndoe@example.com",
        password: "654321",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should hash the user password before saving", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.password).not.toBe("123456");
  });
});
