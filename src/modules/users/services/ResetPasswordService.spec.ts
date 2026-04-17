import CreateUserService from "./CreateUserService";
import ResetPasswordService from "./ResetPasswordService";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import FakeUserRepositories from "../domain/repositories/fakes/FakeUserRepositories";
import FakeUserTokensRepositories from "../domain/repositories/fakes/FakeUserTokensRepositories";
import AppError from "@shared/errors/AppError";
import { userMock } from "../domain/factories/user.factory";
import { compare } from "bcryptjs";

jest.mock("@config/email", () => ({
  sendEmail: jest.fn(),
}));

let fakeUserRepository: FakeUserRepositories;
let fakeUserTokensRepository: FakeUserTokensRepositories;
let createUser: CreateUserService;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let resetPassword: ResetPasswordService;

describe("ResetPasswordService", () => {
  beforeEach(async () => {
    fakeUserRepository = new FakeUserRepositories();
    fakeUserTokensRepository = new FakeUserTokensRepositories();
    createUser = new CreateUserService(fakeUserRepository);
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeUserTokensRepository,
    );
    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
    );

    await createUser.execute(userMock);
  });

  it("should be able to reset the password", async () => {
    await sendForgotPasswordEmail.execute(userMock.email);

    const tokens = await fakeUserTokensRepository.findAll();
    const { token } = tokens[0];

    await resetPassword.execute({ token, password: "new-password" });

    const updatedUser = await fakeUserRepository.findByEmail(userMock.email);

    expect(updatedUser).toBeDefined();
    const passwordMatch = await compare("new-password", updatedUser!.password);
    expect(passwordMatch).toBe(true);
  });

  it("should not be able to reset password with a non-existing token", async () => {
    await expect(
      resetPassword.execute({
        token: "non-existing-token",
        password: "new-password",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to reset password with an expired token (over 2 hours)", async () => {
    await sendForgotPasswordEmail.execute(userMock.email);

    const tokens = await fakeUserTokensRepository.findAll();
    const { token } = tokens[0];

    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.now() + 1000 * 60 * 60 * 3)); // +3 hours

    await expect(
      resetPassword.execute({ token, password: "new-password" }),
    ).rejects.toBeInstanceOf(AppError);

    jest.useRealTimers();
  });
});
