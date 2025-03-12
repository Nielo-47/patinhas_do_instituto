import { createClient, SupabaseClient } from "@supabase/supabase-js";

// export interface DatabaseRecord {
//   id?: string;
//   created_at?: string;
//   [key: string]: any;
// }

export class SupabaseService<T> {
  private supabase: SupabaseClient;
  private tableName: string;

  constructor(tableName: string) {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseAnonKey = process.env.SUPABASE_URL_ANON_KEY!;
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
    this.tableName = tableName;
  }

  /**
   * Create a new record in the database
   *
   * @param data The data to insert
   * @returns The created record or null if an error occurred
   */
  async create(data: Omit<T, "id" | "created_at">): Promise<T | null> {
    const { data: createdData, error } = await this.supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();

    if (error) {
      console.error("Error creating record:", error);
      return null;
    }

    return createdData as T;
  }

  /**
   * Get a record by its ID
   * @param id The ID of the record to retrieve
   * @returns The record or null if not found or an error occurred
   */
  async getById(id: string): Promise<T | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error retrieving record:", error);
      return null;
    }

    return data as T;
  }

  /**
   * Get all records from the table
   * @param options Optional query parameters
   * @returns Array of records or empty array if an error occurred
   */
  // async getAll(options?: {
  //   limit?: number;
  //   offset?: number;
  //   orderBy?: { column: string; ascending?: boolean };
  //   filters?: { column: string; operator: string; value: any }[];
  // }): Promise<T[]> {
  //   let query = this.supabase.from(this.tableName).select("*");

  //   // Apply filters if provided
  //   if (options?.filters) {
  //     for (const filter of options.filters) {
  //       query = query.filter(filter.column, filter.operator, filter.value);
  //     }
  //   }

  //   // Apply sorting if provided
  //   if (options?.orderBy) {
  //     query = query.order(options.orderBy.column, {
  //       ascending: options.orderBy.ascending ?? true,
  //     });
  //   }

  //   // Apply pagination if provided
  //   if (options?.limit) {
  //     query = query.limit(options.limit);
  //   }

  //   if (options?.offset) {
  //     query = query.range(
  //       options.offset,
  //       options.offset + (options.limit || 10) - 1
  //     );
  //   }

  //   const { data, error } = await query;

  //   if (error) {
  //     console.error("Error retrieving records:", error);
  //     return [];
  //   }

  //   return data as T[];
  // }

  /**
   * Update a record by its ID
   * @param id The ID of the record to update
   * @param data The data to update
   * @returns The updated record or null if an error occurred
   */
  async update(
    id: string,
    data: Partial<Omit<T, "id" | "created_at">>
  ): Promise<T | null> {
    const { data: updatedData, error } = await this.supabase
      .from(this.tableName)
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating record:", error);
      return null;
    }

    return updatedData as T;
  }

  /**
   * Delete a record by its ID
   * @param id The ID of the record to delete
   * @returns True if deletion was successful, false otherwise
   */
  async delete(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting record:", error);
      return false;
    }

    return true;
  }

  /**
   * Perform a custom query using the Supabase client
   * @returns The Supabase client for chaining
   */
  query(): SupabaseClient {
    return this.supabase;
  }
}
