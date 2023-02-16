import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

class ListCustomerService{
    public async execute(){
        const customersRepository = getCustomRepository(CustomersRepository);

        const customers = await customersRepository.find();
        return customers;
    }
}

export default ListCustomerService;