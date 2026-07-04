import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query, Permission, Role } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {   // this is a constructor function , it is used to initialize the variables when the class is instantiated
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
            title,
            content,
            featuredImage,
            status,
            userId 
        }, [
            Permission.read(Role.any()),
            Permission.update(Role.user(userId)),
            Permission.delete(Role.user(userId)),
        ]);
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        const data = {
            title,
            content,
            status
        };

        if (featuredImage) {
            data.featuredImage = featuredImage;
        }

        return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, data);
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;
        }
        catch(err){
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        }
        catch(err){
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status" , "active")]){  
        // display whose status is active
        try{
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);
        }
        catch(err){
            return false;
        }
    }
    //file upload
    async uploadFile(file){
        return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file, [
            Permission.read(Role.any()),
        ]);
    }
    async deleteFile(fileId){
        try{
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
        }
        catch(err){
            return false;
        }
    }  
    getFilePreview(fileId){
        try{
            return this.bucket.getFileView(conf.appwriteBucketId, fileId);
        }
        catch(err){
            return false;
        }
    }
}

const service = new Service();  // we can use this service to call appwrite functions from anywhere in the app

export default service;
