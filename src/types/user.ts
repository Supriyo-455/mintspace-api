import { RowDataPacket } from "mysql2"

export interface User extends RowDataPacket {
    email: string,
    name: string,
    password: string,
    admin: boolean,
    dateOfBirth: string,
    dateCreated: string
};

export interface UserSignInRequest {
    email: string,
    name: string,
    password: string,
    admin: boolean,
    dateOfBirth: string,
    dateOfCreation: string
};

export interface UserLoginRequest {
    email: string,
    password: string
};

export interface UserAndBlog extends RowDataPacket {
    email: string,
    name: string,
    dateOfBirth: string,
    blogId: number,
    premium: boolean,
    title: string,
};