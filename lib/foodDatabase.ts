import { FoodItem } from '@/types'

export const foodDatabase: FoodItem[] = [
  // Proteins
  { id: '1', name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g', category: 'Protein' },
  { id: '2', name: 'Salmon', calories: 208, protein: 22, carbs: 0, fat: 13, servingSize: '100g', category: 'Protein' },
  { id: '3', name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fat: 11, servingSize: '1 large', category: 'Protein' },
  { id: '4', name: 'Ground Beef', calories: 250, protein: 26, carbs: 0, fat: 15, servingSize: '100g', category: 'Protein' },
  { id: '5', name: 'Yogurt', calories: 60, protein: 10, carbs: 3.6, fat: 0.4, servingSize: '100g', category: 'Protein' },

  // Carbs
  { id: '6', name: 'White Rice', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, servingSize: '100g cooked', category: 'Carbs' },
  { id: '7', name: 'Oatmeal', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, servingSize: '100g dry', category: 'Carbs' },
  { id: '8', name: 'Whole Wheat Bread', calories: 247, protein: 8.4, carbs: 43.4, fat: 3.3, servingSize: '1 slice (28g)', category: 'Carbs' },
  { id: '9', name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, servingSize: '100g cooked', category: 'Carbs' },
  { id: '10', name: 'Pasta', calories: 131, protein: 5, carbs: 25, fat: 1.1, servingSize: '100g cooked', category: 'Carbs' },

  // Vegetables
  { id: '11', name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, servingSize: '100g raw', category: 'Vegetables' },
  { id: '12', name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, servingSize: '100g raw', category: 'Vegetables' },
  { id: '13', name: 'Carrot', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, servingSize: '100g raw', category: 'Vegetables' },
  { id: '14', name: 'Tomato', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, servingSize: '100g raw', category: 'Vegetables' },

  // Fruits
  { id: '15', name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, servingSize: '100g', category: 'Fruits' },
  { id: '16', name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, servingSize: '100g', category: 'Fruits' },
  { id: '17', name: 'Orange', calories: 47, protein: 0.9, carbs: 12, fat: 0.3, servingSize: '100g', category: 'Fruits' },
  { id: '18', name: 'Blueberries', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, servingSize: '100g', category: 'Fruits' },

  // Dairy
  { id: '19', name: 'Milk', calories: 61, protein: 3.2, carbs: 4.8, fat: 3.3, servingSize: '100ml', category: 'Dairy' },
  { id: '20', name: 'Cheese', calories: 402, protein: 25, carbs: 1.3, fat: 33, servingSize: '100g', category: 'Dairy' },

  // Healthy Fats
  { id: '21', name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fat: 100, servingSize: '1 tbsp (14ml)', category: 'Fats' },
  { id: '22', name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50, servingSize: '100g', category: 'Fats' },
  { id: '23', name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15, servingSize: '100g', category: 'Fats' },

  // Popular Fast Food / Processed
  { id: '24', name: 'Pizza Slice', calories: 285, protein: 12, carbs: 36, fat: 10, servingSize: '1 slice', category: 'Fast Food' },
  { id: '25', name: 'Burger', calories: 540, protein: 30, carbs: 40, fat: 28, servingSize: '1 burger', category: 'Fast Food' },
  { id: '26', name: 'Fries', calories: 365, protein: 3.4, carbs: 48, fat: 17, servingSize: '100g', category: 'Fast Food' },

  // Snacks
  { id: '27', name: 'Granola Bar', calories: 200, protein: 4, carbs: 27, fat: 9, servingSize: '1 bar', category: 'Snacks' },
  { id: '28', name: 'Peanut Butter', calories: 588, protein: 25, carbs: 20, fat: 50, servingSize: '100g', category: 'Snacks' },
]

export const getFoodByName = (name: string): FoodItem | undefined => {
  return foodDatabase.find(food =>
    food.name.toLowerCase().includes(name.toLowerCase())
  )
}

export const searchFoods = (query: string): FoodItem[] => {
  const lowerQuery = query.toLowerCase()
  return foodDatabase.filter(food =>
    food.name.toLowerCase().includes(lowerQuery) ||
    food.category.toLowerCase().includes(lowerQuery)
  )
}
