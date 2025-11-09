import { RowDataPacket } from "mysql2";

export interface LikeReq {
    blogId: number,
    userEmail: string,
    ipAddress: string,
};

export interface LikeRes extends RowDataPacket {
    id: number,
    blogId: number,
    userEmail: string,
    ipAddress: string,
    createdAt: string
};