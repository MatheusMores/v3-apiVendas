import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({name, email}: IRequest): Promise<Customer>{
        const customersRepository = getCustomRepository(CustomersRepository);
        
        const emailExists = await customersRepository.findByEmail(email);
        if (emailExists){
            throw new AppError("Email already exists");
        }

        const customer = await customersRepository.create({
            name: name,
            email: email
        })

        await customersRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;