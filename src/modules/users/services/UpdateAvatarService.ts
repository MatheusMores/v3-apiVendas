import AppError from "@shared/errors/AppError";
import path from "path";
import fs from 'fs';
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UserRepository";
import uploadConfig from '@config/upload';

interface IRequest {
    user_id: string
    avatarFileName: string
}

class UpdateAvatarService {
    async execute({ user_id, avatarFileName}: IRequest){
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if(!user){
            throw new AppError('User not found.')
        }

        if (user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);
            
            if(userAvatarFileExist){
                fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        
        await usersRepository.save(user);
        return user;
    }
}

export default UpdateAvatarService;