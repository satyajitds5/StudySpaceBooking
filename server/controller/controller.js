import * as todosService from '../services/todos-service.js';

const setResponse = (obj,response)=>{
    response.status(200);
    response.json(obj);
}

const setError =(err, response) => {
    response.status(500);
    response.json(err);
}
export const post = async(req,res)=>{
    try{
        const data = req.body;
        const savedData =  await todosService.save(data);
        setResponse(savedData,res);
    }
    catch(error){
        setError(error,res);
    }
}
export const get = async(req,res)=>{   
    await todosService.find(req,res);
} 

export const put = async(req,res)=>{
     await todosService.update(req,res);

}
export const remove = async(req,res)=>{
    await todosService.remove(req,res);
}