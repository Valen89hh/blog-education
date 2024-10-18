import { Database } from "./types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type Post = Database["public"]["Tables"]["posts"]["Row"]
export type Category = Database["public"]["Tables"]["categories"]["Row"]
export type Comment = Database["public"]["Tables"]["comments"]["Row"]

export type Role = Database["public"]["Enums"]["Role"]
export type PostStatus = Database["public"]["Enums"]["Post_Status"]

export type PostRpc = Database["public"]["Functions"]["get_posts_by_user"]["Returns"][0]

export interface PostForTable extends Post{
    comment_count:number,
    category_name: string
}
export interface PostForEdit extends Post{
    category: Category
}

export interface PostForShow extends Post{
    authorName: string,
    authorImage: string | null,
    categoryName: string
}

export interface CommentForPost extends Comment{
    authorImg: string,
    authorName: string
}

export interface PostRelated extends Post{
    categoryName: string
}