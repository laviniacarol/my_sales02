import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';


export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const userId = Number(req.user.id);
    const user = await showProfile.execute({ userId });
    return res.json(user);
}

 public async update(req: Request, res: Response): Promise<Response> {
  const userId = Number(req.user.id);
  const { name, email, password, oldPassword } = req.body;

  const updateProfile = new UpdateProfileService();
  const user = await updateProfile.execute({
    userId,
    name,
    email,
    password,
    oldPassword
  });
  return res.json(user);
 }
}
