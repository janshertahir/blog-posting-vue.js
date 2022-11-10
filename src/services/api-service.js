import axios from "axios";

export class ApiService{

    baseURL = "http://localhost:3001/";


    constructor(table){
        this.baseURL+=table;
    }


    async get(){
        try {
            const res = await axios.get(this.baseURL);
            return res.data;
        } 
        catch (e) {
            console.error(e);
        }
    }
    async getWithId(id){
        try {
            const res = await axios.get(this.baseURL+'/'+id);
            return res.data;
        } 
        catch (e) {
            console.error(e);
        }
    }
    deleteBlog(id){
        axios.delete(this.baseURL+'/'+id);
    }
    
    async addBlog(obj) {
        try {
            const res = await axios.post(this.baseURL, obj);
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    }

    async updateBlog(id,obj) {
        try {
          await axios.patch(`${this.baseURL}/${id}`, obj );
        } 
        catch (e) {
          console.error(e);
        }
    }
    
    async addUser(obj) {
        try {
          const res = await axios.post(this.baseURL, obj);
          console.log(res);
        } catch (e) {
          console.error(e);
        }
    }


}