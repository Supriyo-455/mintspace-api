import { RowDataPacket } from "mysql2";

export interface Blog extends RowDataPacket {
    id?: number,
    authorEmail: string,
    premium: boolean,
    title: string,
    content: string
};

export interface BlogCreateRequest {
    authorEmail: string,
    premium: boolean,
    title: string,
    content: string
};