import {Request,Response} from "express"
import { validationResult } from "express-validator";
import { loginServices, signupServices } from "../services/auth.services";


export const signUpController = async (req: Request, res: Response) :Promise<any>=> {
  const errors = validationResult(req);

  const { username, password, role } = req.body;

 const signupResponse= await signupServices(errors,username,password,role,)
  res.status(signupResponse.code).json({message:signupResponse.message,user:signupResponse.user})
};

 export const loginController = async (req: Request, res: Response) :Promise<any>=> {
  const { username, password } = req.body;

  const loginResponse = await loginServices(username,password)
  res.status(loginResponse.code).json({message:loginResponse.message,token:loginResponse.token})
  
};
