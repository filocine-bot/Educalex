export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      course_enrollments: {
        Row: {
          course_path: string
          created_at: string
          user_id: string
        }
        Insert: {
          course_path: string
          created_at?: string
          user_id: string
        }
        Update: {
          course_path?: string
          created_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_orders: {
        Row: { reference: string; user_id: string; product: string; amount_in_cents: number; currency: string; status: string; transaction_id: string | null; created_at: string; updated_at: string }
        Insert: { reference: string; user_id: string; product: string; amount_in_cents: number; currency?: string; status?: string; transaction_id?: string | null; created_at?: string; updated_at?: string }
        Update: { reference?: string; user_id?: string; product?: string; amount_in_cents?: number; currency?: string; status?: string; transaction_id?: string | null; created_at?: string; updated_at?: string }
        Relationships: []
      }
      premium_access: {
        Row: { user_id: string; product: string; reference: string; granted_at: string }
        Insert: { user_id: string; product: string; reference: string; granted_at?: string }
        Update: { user_id?: string; product?: string; reference?: string; granted_at?: string }
        Relationships: []
      }
      exam_attempts: {
        Row: {
          answers: Json
          competencies: Json
          correct: number
          created_at: string
          elapsed_seconds: number
          exam_version: string
          id: string
          percentage: number
          profile: string
          timed_out: boolean
          user_id: string
        }
        Insert: {
          answers: Json
          competencies: Json
          correct: number
          created_at?: string
          elapsed_seconds: number
          exam_version?: string
          id: string
          percentage: number
          profile: string
          timed_out?: boolean
          user_id: string
        }
        Update: {
          answers?: Json
          competencies?: Json
          correct?: number
          created_at?: string
          elapsed_seconds?: number
          exam_version?: string
          id?: string
          percentage?: number
          profile?: string
          timed_out?: boolean
          user_id?: string
        }
        Relationships: []
      }
      practice_access_ledger: {
        Row: {
          actor_id: string | null
          attempt_id: string | null
          created_at: string
          delta: number
          details: Json
          event_type: string
          id: string
          offer_code: string | null
          profile: string | null
          reason: string
          right_id: string | null
          user_id: string | null
        }
        Insert: {
          actor_id?: string | null
          attempt_id?: string | null
          created_at?: string
          delta?: number
          details?: Json
          event_type: string
          id?: string
          offer_code?: string | null
          profile?: string | null
          reason: string
          right_id?: string | null
          user_id?: string | null
        }
        Update: {
          actor_id?: string | null
          attempt_id?: string | null
          created_at?: string
          delta?: number
          details?: Json
          event_type?: string
          id?: string
          offer_code?: string | null
          profile?: string | null
          reason?: string
          right_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "practice_access_ledger_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: true
            referencedRelation: "exam_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_access_ledger_offer_code_fkey"
            columns: ["offer_code"]
            isOneToOne: false
            referencedRelation: "practice_offer_drafts"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "practice_access_ledger_right_id_fkey"
            columns: ["right_id"]
            isOneToOne: false
            referencedRelation: "practice_access_rights"
            referencedColumns: ["id"]
          },
        ]
      }
      practice_access_rights: {
        Row: {
          created_at: string
          id: string
          integral_access: boolean
          offer_code: string
          offer_revision: number
          profile: string
          quantity: number | null
          reason: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          integral_access?: boolean
          offer_code: string
          offer_revision: number
          profile: string
          quantity?: number | null
          reason: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          integral_access?: boolean
          offer_code?: string
          offer_revision?: number
          profile?: string
          quantity?: number | null
          reason?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_access_rights_offer_code_fkey"
            columns: ["offer_code"]
            isOneToOne: false
            referencedRelation: "practice_offer_drafts"
            referencedColumns: ["code"]
          },
        ]
      }
      practice_level_drafts: {
        Row: {
          level_code: string
          profile: string
          reason: string
          updated_at: string
          user_id: string
        }
        Insert: {
          level_code: string
          profile: string
          reason: string
          updated_at?: string
          user_id: string
        }
        Update: {
          level_code?: string
          profile?: string
          reason?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "practice_level_drafts_level_code_fkey"
            columns: ["level_code"]
            isOneToOne: false
            referencedRelation: "practice_offer_drafts"
            referencedColumns: ["code"]
          },
        ]
      }
      practice_offer_drafts: {
        Row: {
          code: string
          content_rules: Json
          extra_attempts: number | null
          integral_access: boolean
          label: string
          level_rules: Json
          revision: number
          simulation_rules: Json
          updated_at: string
        }
        Insert: {
          code: string
          content_rules?: Json
          extra_attempts?: number | null
          integral_access?: boolean
          label: string
          level_rules?: Json
          revision?: number
          simulation_rules?: Json
          updated_at?: string
        }
        Update: {
          code?: string
          content_rules?: Json
          extra_attempts?: number | null
          integral_access?: boolean
          label?: string
          level_rules?: Json
          revision?: number
          simulation_rules?: Json
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          id: string
          preparation_path: string
          teacher_type: string
        }
        Insert: {
          created_at?: string
          display_name?: string
          id: string
          preparation_path?: string
          teacher_type?: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          preparation_path?: string
          teacher_type?: string
        }
        Relationships: []
      }
      unit_progress: {
        Row: {
          completed_at: string
          course_path: string
          unit_number: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          course_path: string
          unit_number: number
          user_id: string
        }
        Update: {
          completed_at?: string
          course_path?: string
          unit_number?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "unit_progress_user_id_course_path_fkey"
            columns: ["user_id", "course_path"]
            isOneToOne: false
            referencedRelation: "course_enrollments"
            referencedColumns: ["user_id", "course_path"]
          },
        ]
      }
      user_roles: {
        Row: {
          role: string
          user_id: string
        }
        Insert: {
          role: string
          user_id: string
        }
        Update: {
          role?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: { Args: { _role: string; _user_id: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
