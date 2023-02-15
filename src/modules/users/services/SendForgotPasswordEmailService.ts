import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import UsersRepository from "../typeorm/repositories/UsersRepository"
import UserTokenRepository from "../typeorm/repositories/UsersTokenRepository";
import EtherelMail from "@config/mail/EtherealMail";

interface IRequest{
    email: string
}

class SendForgotPasswordEmailService {
    public async execute({email}: IRequest){
        const usersRepository = getCustomRepository(UsersRepository);
        const usersTokenRepository = getCustomRepository(UserTokenRepository);

        const user = await usersRepository.findByEmail(email);
        if (!user){
            throw new AppError("User does not exists")
        }

        const token = await usersTokenRepository.generate(user.id);

        await EtherelMail.sendMail({
            to: email,
            subject: 'Recuperacao de senha',
            body: `Solicitação de redefinição de senha recebida: ${token!.token}`
        })
    }
}

export default SendForgotPasswordEmailService;