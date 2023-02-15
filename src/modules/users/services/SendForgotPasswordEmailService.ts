import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm"
import UsersRepository from "../typeorm/repositories/UsersRepository"
import UserTokenRepository from "../typeorm/repositories/UsersTokenRepository";
import EtherelMail from "@config/mail/EtherealMail";
import path from "path";

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
        
        const forgotPasswordTemplatePath = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')
        
        await EtherelMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: 'Recuperacao de senha',
            templateData: {
                filePath: forgotPasswordTemplatePath,
                variables: {
                    name: user.name,
                    link: `http://localhost:3333/password/reset?token=${token.token}`
                }
            }
        })
    }
}

export default SendForgotPasswordEmailService;