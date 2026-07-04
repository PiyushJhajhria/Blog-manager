import conf from '../config.js';
import { Client, Account , ID} from 'appwrite';

export class AuthService{
    client  = new Client();
    account;
 
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                //call another func , i.e , login , agar account ban gya to login kar do
                return this.login({email ,password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async signup({email, password, name}){
        return this.createAccount({email, password, name});
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            throw error;
        }
    }

    async logout(){
        try{
            return await this.account.deleteSession('current');
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            return null;
        }
    }
}
const authService = new AuthService();
export default authService;
