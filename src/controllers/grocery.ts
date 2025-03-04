import { Request, Response } from "express";
import { GroceryService } from '../services/grocery';
import { safePromise } from "../utils/index";
import { GroceryItem } from "../config/types";

async function fetch(req: Request, res: Response): Promise<any> {
  try {
    const groceryService = GroceryService.getInstance();

    const { name, groupByCategory } = req.body;

    const fetchGrocery: { name?: string } = {};
    if(name) fetchGrocery.name = name.toLowerCase();

    const [err, groceryData] = await safePromise(groceryService.fetchGrocery(fetchGrocery));
    if(err) {
      console.log('Error in fetching grocery data', err);
      return res.status(500).json({
        success: false,
        data: {}
      })
    }

    let response: { grocery: GroceryItem[] | { [key: string]: GroceryItem[] } } = { grocery: [] };

    if (groupByCategory) {
      const groupedByCategory: { [key: string]: GroceryItem[] } = {};
    
      groceryData.data.forEach((item: GroceryItem) => {
        if (!groupedByCategory[item.category]) {
          groupedByCategory[item.category] = [];
        }
    
        groupedByCategory[item.category].push(item);
      });
    
      response.grocery = groupedByCategory;
    } else {
      response.grocery = groceryData.data;
    }

    return res.status(200).json({
      success: true,
      msg: 'SUCCESS',
      data: response
    })
  } catch (error) {
    console.log('catch error', error);
    return res.status(500).json({
      success: false,
      msg: 'Something went wrong',
      data: error
    })
  }
}

async function add(req: Request, res: Response): Promise<any> {
  try {
    const groceryService = GroceryService.getInstance();
    const { groceries } = req.body;

    const createGroceries = groceries.map((item: GroceryItem) => {
      return {
        name: item.name,
        description: item.description,
        category: item.category,
        price: item.price,
        quantity: item.quantity
      }
    });

    const [err, _groceryData] = await safePromise(groceryService.addGrocery(createGroceries));
    if(err) {
      console.log('Error in adding groceris', err);
      return res.status(500).json({
        success: false,
        data: {}
      })
    }

    return res.status(200).json({
      status: true,
      msg: "SUCCESS",
      data: {}
    })
  } catch (error) {
    console.log('catch error', error);
    return res.status(500).json({
      success: false,
      msg: 'Something went wrong',
      data: error
    })
  }
}

export = {
  fetch,
  add
}