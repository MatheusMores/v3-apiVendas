import { getCustomRepository } from "typeorm";
import {isAfter, addHours} from 'date-fns';
import {hash} from 'bcryptjs';
import AppError from "@shared/errors/AppError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokenRepository from "../typeorm/repositories/UsersTokenRepository";

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({token, password}: IRequest){
        const usersRepository = getCustomRepository(UsersRepository);
        const usersTokenRepository = getCustomRepository(UsersTokenRepository);

        const userToken = await usersTokenRepository.findByToken(token);

        if (!userToken){
            throw new AppError('User Token does not exist')
        }

        const user = await usersRepository.findById(userToken.user_id);
        if (!user){
            throw new AppError('User does not exist')
        }

        const compareDate = addHours(userToken.created_at, 2);

        if (isAfter(Date.now(), compareDate)){
            throw new AppError("Token expired")
        }

        user.password = await hash(password, 8);
    }
}

export default ResetPasswordService;