import { GroceryItem } from "../config/types";
import { Database } from "../boot/database";

export class GroceryService {
  private static singleton: GroceryService;
  private constructor() {}

  public static getInstance(): GroceryService {
    if(!GroceryService.singleton) {
      GroceryService.singleton = new GroceryService();
    }

    return GroceryService.singleton;
  }

  public async fetchGrocery(params: { name?: string }): Promise<any> {
    try {
      const supabaseClient = await Database.getInstance().getSupabaseClient();

      const query = supabaseClient.from("grocery_item").select("name, description, category, price, quantity");
      if(params.name) query.eq('name', params.name);

      const { data, error } = await query;
      if(error) {
        return Promise.reject({
          success: false,
          data: error
        });
      }

      return Promise.resolve({
        success: true,
        data: data
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async addGrocery(params: GroceryItem[]): Promise<any> {
    try {
      const supabaseClient = await Database.getInstance().getSupabaseClient();
    
      const { data, error } = await supabaseClient.from("grocery_item").insert(params);
      if(error) {
        return Promise.reject({
          success: false,
          data: error
        });
      }

      return Promise.resolve({
        success: true,
        data: data
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}