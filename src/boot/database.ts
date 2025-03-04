import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class Database {
  private static instance: Database;
  private supabaseClient: SupabaseClient | undefined;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async initSupabase(): Promise<SupabaseClient> {
    try {
      if (this.supabaseClient) {
        return this.supabaseClient;
      }


      const supabaseKey = process.env.SUPABASE_KEY;
      if (!supabaseKey) {
        throw new Error("SUPABASE_KEY is not set in environment variables.");
      }

      const supabaseUrl = "https://dnvdugtzbehuycizvjny.supabase.co";
      
      this.supabaseClient = createClient(supabaseUrl, supabaseKey);

      const { error } = await this.supabaseClient
        .from("users")
        .select("*")
        .limit(1);

      if (error) {
        throw new Error(`Supabase connection failed: ${error.message}`);
      }

      return this.supabaseClient;
    } catch (error: any) {
      console.error("Error initializing Supabase:", error.message);
      throw error;
    }
  }

  public async getSupabaseClient(): Promise<SupabaseClient> {
    if (!this.supabaseClient) {
      await this.initSupabase();
    }
    return this.supabaseClient!;
  }
}
