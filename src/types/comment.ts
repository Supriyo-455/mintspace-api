import { RowDataPacket } from "mysql2";

export interface Comment extends RowDataPacket {
    id: number,
    blogId: number,
    authorName: string,
    comment: string,
    createdAt: string
};
