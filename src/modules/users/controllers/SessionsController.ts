import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import CreateSessionsService from "../services/CreateSessionnService";

class SessionsController {
    public async create(req: Request, res: Response): Promise<Response>{
        const { email, password } = req.body;
        
        const createSession = new CreateSessionsService();

        const user = await createSession.execute({email, password});

        return res.json(user);
        
    }
}

export default SessionsController;