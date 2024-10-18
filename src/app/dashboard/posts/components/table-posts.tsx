import Card from "@/components/cards/card";
import { Post, PostForTable, PostRpc } from "@/lib/supabase/table-type";
import { Eye, MessageSquareText, Share2 } from "lucide-react";
import Link from "next/link";
import React from "react";

interface TablePostsProps {
  posts: PostRpc[];
}

const TablePosts: React.FC<TablePostsProps> = ({ posts }) => {
  return (
    <Card className="p-0 overflow-x-auto">
      <div className="overflow-auto min-w-[40rem] whitespace-nowrap">
        <table className="w-full table-auto text-left"> 
          <tbody>
            {posts.map((post, i) => (
              <tr key={post.post_id} className={`${i > 0 && "border-t"}`}>
                <td className="py-4 pl-6">
                  <p className="font-bold">{post.title}</p>
                  {(post.published_at && post.status === "published") && (
                    <div className="text-sm text-ash-gray">
                      <p><span className="font-medium">Publicado:</span> {new Date(post.published_at).toLocaleDateString()}</p>
                      <p><span className="font-medium">Categoría:</span> {post.category_name}</p>
                    </div>
                  )}
                </td>
                <td className="whitespace-nowrap"> 
                  {post.status === "published" ? (
                    <div className="flex space-x-4 mt-2 text-ash-gray">
                      <span className="flex items-center space-x-1">
                        <Eye size={16} />
                        <p>{post.views}</p>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageSquareText size={16} />
                        <p>{post.comment_count}</p>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Share2 size={16} />
                        <p>{post.shareds}</p>
                      </span>
                    </div>
                  ) : (
                    <span className="bg-yellow-500 text-white py-1 px-3 rounded text-xs">Draft</span>
                  )}
                </td>
                <td className="text-right pr-6 whitespace-nowrap">
                  <button className="text-red-500 hover:underline mr-4">Eliminar</button>
                  <Link href={"/edit-post/"+post.post_id} className="text-gray-700 hover:underline">Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TablePosts;
