import {Request,Response} from "express"
import { deleteServices, getServices, readServices, updateServices } from "../services/route.services";


export const getController = async (req: Request, res: Response):Promise<any> => {
  const getResponse = await getServices();
  res.json(getResponse.users)

};


export const readController = async (req: Request, res: Response) :Promise<any>=> {
  const id = Number(req.params.id);

  const readResponse = await readServices(id);
  res.json(readResponse.user)
  
};

export const updateController = async (req: Request, res: Response) :Promise<any>=> {
  const id = Number(req.params.id);
  const body = req.body;
  
  const updateResponse = await updateServices(body,id);
  res.status(updateResponse.code).json({message:updateResponse.message,user:updateResponse.user})
};

export const deleteController = async(req: Request, res: Response):Promise<any>=> {
  const id = Number(req.params.id);

  const deleteResponse=await deleteServices(id)
 res.status(deleteResponse.code).json({message:deleteResponse.message,user:deleteResponse.user}) 
};

// export const createController = (req: Request, res: Response) => {
//   const body = req.body;
//   users.push({ id: users.length + 1, ...body });

//   fs.writeFile(filePath, JSON.stringify(users), (err) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to add user data" });
//     }
//     return res.json({ status: "success", id: users.length });
//   });
// };