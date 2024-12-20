export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          category_name: string
          category_slug: string
          created_at: string
          id: number
        }
        Insert: {
          category_name: string
          category_slug: string
          created_at?: string
          id?: number
        }
        Update: {
          category_name?: string
          category_slug?: string
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: number
          post_id: number
        }
        Insert: {
          author_id: string
          content?: string
          created_at?: string
          id?: number
          post_id: number
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: number
          post_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string
          category_id: number | null
          content: string
          created_at: string
          id: number
          post_img: string
          post_path: string
          published_at: string | null
          shareds: number
          status: Database["public"]["Enums"]["Post_Status"]
          time_read: number
          title: string
          updated_at: string
          views: number
        }
        Insert: {
          author_id: string
          category_id?: number | null
          content: string
          created_at?: string
          id?: number
          post_img: string
          post_path: string
          published_at?: string | null
          shareds?: number
          status?: Database["public"]["Enums"]["Post_Status"]
          time_read: number
          title: string
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string
          category_id?: number | null
          content?: string
          created_at?: string
          id?: number
          post_img?: string
          post_path?: string
          published_at?: string | null
          shareds?: number
          status?: Database["public"]["Enums"]["Post_Status"]
          time_read?: number
          title?: string
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_path: string | null
          avatar_url: string | null
          created_at: string
          description: string
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["Role"]
        }
        Insert: {
          avatar_path?: string | null
          avatar_url?: string | null
          created_at?: string
          description?: string
          email: string
          id: string
          name: string
          role?: Database["public"]["Enums"]["Role"]
        }
        Update: {
          avatar_path?: string | null
          avatar_url?: string | null
          created_at?: string
          description?: string
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["Role"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_categories_with_post_count: {
        Args: Record<PropertyKey, never>
        Returns: {
          category_name: string
          post_count: number
        }[]
      }
      get_posts_by_comments:
        | {
            Args: {
              user_id: string
              page_number: number
              items_per_page: number
            }
            Returns: {
              post_id: number
              title: string
              comment_count: number
              category_name: string
            }[]
          }
        | {
            Args: {
              user_id: string
              page_number: number
              items_per_page: number
              search: string
              filter: string
            }
            Returns: {
              post_id: string
              title: string
              comment_count: number
              category_name: string
              views: number
              shareds: number
              status: string
              total_count: number
            }[]
          }
      get_posts_by_user: {
        Args: {
          user_id: string
          page_number: number
          items_per_page: number
          search: string
          filter: string
        }
        Returns: {
          post_id: number
          title: string
          comment_count: number
          category_name: string
          views: number
          shareds: number
          status: Database["public"]["Enums"]["Post_Status"]
          published_at: string
          total_count: number
        }[]
      }
      get_posts_with_comment_count: {
        Args: {
          id_user: string
        }
        Returns: {
          post_id: number
          title: string
          status: Database["public"]["Enums"]["Post_Status"]
          category_name: string
          comment_count: number
          views: number
          shareds: number
          published_at: string
          total_count: number
        }[]
      }
      get_top_categories: {
        Args: Record<PropertyKey, never>
        Returns: {
          category_id: number
          category_name: string
          category_slug: string
          post_img: string
        }[]
      }
    }
    Enums: {
      Post_Status: "published" | "draft" | "canceled"
      Role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
