import CreateUserService from "./CreateUserService";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeUserRepositories from "../domain/repositories/fakes/FakeUserRepositories";
import FakeUserTokensRepositories from "../domain/repositories/fakes/FakeUserTokensRepositories";
import AppError from "@shared/errors/AppError";
import { userMock } from "../domain/factories/user.factory";

jest.mock("@config/email", () => ({
  sendEmail: jest.fn(),
}));

let fakeUserRepository: FakeUserRepositories;
let fakeUserTokensRepository: FakeUserTokensRepositories;
let createUser: CreateUserService;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe("SendForgotPasswordEmailService", () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepositories();
    fakeUserTokensRepository = new FakeUserTokensRepositories();
    createUser = new CreateUserService(fakeUserRepository);
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeUserTokensRepository,
    );

    await createUser.execute(userMock);
  });

  it("should be able to send a forgot password email", async () => {
    await expect(
      sendForgotPasswordEmail.execute(userMock.email),
    ).resolves.not.toThrow();
  });

  it("should not be able to send email to a non-existing user", async () => {
    await expect(
      sendForgotPasswordEmail.execute("nonexistent@example.com"),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should generate a user token when sending forgot password email", async () => {
    await sendForgotPasswordEmail.execute(userMock.email);

    const tokens = await fakeUserTokensRepository.findAll();

    expect(tokens.length).toBe(1);
    expect(tokens[0].userId).toBeDefined();
  });
});
