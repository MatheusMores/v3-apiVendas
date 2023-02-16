import { Request, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import ListCustomerService from "../services/ListCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

class CustomersController {
    public async create(req: Request, res: Response): Promise<Response>{
        const createCustomer = new CreateCustomerService();
        
        const { name, email } = req.body;
        
        const customer = await createCustomer.execute({name, email});

        return res.json(customer);
    }

    public async index(req: Request, res: Response): Promise<Response>{
        const listCustomers = new ListCustomerService();

        const customers = await listCustomers.execute();
        return res.json(customers);
    }

    public async show(req: Request, res: Response): Promise<Response>{
        const showCustomer = new ShowCustomerService();

        const {id} = req.params;

        const customer = await showCustomer.execute({id});

        return res.json(customer);
    }

    public async update(req: Request, res: Response): Promise<Response>{
        const updateCustomer = new UpdateCustomerService();

        const { id } = req.params;
        const {name, email} = req.body;

        const customer = await updateCustomer.execute({id, name, email});
        return res.json(customer);
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const deleteCustomer = new DeleteCustomerService();

        const { id } = req.params;

        await deleteCustomer.execute({id});
        return res.json([])
    }
}

export default CustomersController;