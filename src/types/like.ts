import { RowDataPacket } from "mysql2";

export interface Like extends RowDataPacket {
    id: number,
    blogId: number,
    userEmail: string,
    ipAddress: string,
    createdAt: string
};