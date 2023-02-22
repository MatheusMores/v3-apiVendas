import { Request, Response } from "express";
import UpdateAvatarService from "../services/UpdateAvatarService";
import {instanceToInstance} from 'class-transformer'


class UserAvatarController{
    async update(req: Request, res: Response): Promise<Response>{
        const updateAvatar = new UpdateAvatarService();

        const user = updateAvatar.execute({
            user_id: req.user.id,
            avatarFileName: req.file!.filename
        });

        return res.json(instanceToInstance(user));
    }
}

export default UserAvatarController;