import express from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";


export default class UpdateAvatarController {
  async update(request: express.Request, response: express.Response): Promise<express.Response> {
  console.log('Upload request received');
  console.log('User ID:', request.user.id);
  console.log('File:', request.file);

  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    userId: Number(request.user.id),
    avatarFilename: request.file?.filename as string
  });

  return response.json(user);
}
}
