import { RowDataPacket } from "mysql2";

export interface Blog extends RowDataPacket {
    id?: number,
    authorEmail: string,
    premium: boolean,
    title: string,
    content: string,
    createdDate: string,
};

export interface BlogTag extends RowDataPacket {
    blogId: number,
    tag: string
};

export interface LikesAndCommentsCount extends RowDataPacket {
    totalLikes: number,
    totalComments: number
};

export interface BlogWithStatsAndTags extends Blog {
    stats: LikesAndCommentsCount,
    tags: Array<string>
}

export interface BlogCreateRequest {
    authorEmail: string,
    premium: boolean,
    title: string,
    content: string
};