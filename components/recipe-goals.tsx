"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Utensils, Clock, Dumbbell, Leaf, Flame, ShoppingBag, ChevronRight } from "lucide-react"
import { useShoppingCart } from "@/lib/shopping-cart-context"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

type Goal = "bulking" | "weight-loss" | "quick-meal" | "vegetarian" | "high-protein"
type Recipe = {
  id: string
  title: string
  description: string
  cookTime: string
  calories: string
  ingredients: Array<{ name: string; quantity: string }>
  image: string
}

const MOCK_RECIPES: Record<Goal, Recipe[]> = {
  bulking: [
    {
      id: "bulk-1",
      title: "High-Calorie Protein Pasta",
      description: "A calorie-dense pasta dish perfect for muscle building",
      cookTime: "25 mins",
      calories: "850 kcal",
      ingredients: [
        { name: "Whole wheat pasta", quantity: "150g" },
        { name: "Ground beef (lean)", quantity: "200g" },
        { name: "Olive oil", quantity: "3 tbsp" },
        { name: "Parmesan cheese", quantity: "50g" },
        { name: "Tomato sauce", quantity: "200g" },
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "bulk-2",
      title: "Peanut Butter Protein Shake",
      description: "Quick and easy shake for post-workout recovery",
      cookTime: "5 mins",
      calories: "650 kcal",
      ingredients: [
        { name: "Whole milk", quantity: "300ml" },
        { name: "Peanut butter", quantity: "2 tbsp" },
        { name: "Banana", quantity: "1 medium" },
        { name: "Protein powder", quantity: "30g" },
        { name: "Honey", quantity: "1 tbsp" },
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  "weight-loss": [
    {
      id: "wl-1",
      title: "Grilled Chicken Salad",
      description: "Low-calorie, high-protein salad for weight management",
      cookTime: "20 mins",
      calories: "350 kcal",
      ingredients: [
        { name: "Chicken breast", quantity: "120g" },
        { name: "Mixed greens", quantity: "100g" },
        { name: "Cherry tomatoes", quantity: "50g" },
        { name: "Cucumber", quantity: "1/2" },
        { name: "Balsamic vinegar", quantity: "1 tbsp" },
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "wl-2",
      title: "Cauliflower Rice Bowl",
      description: "Low-carb alternative to traditional rice dishes",
      cookTime: "15 mins",
      calories: "280 kcal",
      ingredients: [
        { name: "Cauliflower", quantity: "1 head" },
        { name: "Bell peppers", quantity: "1" },
        { name: "Onion", quantity: "1/2" },
        { name: "Olive oil", quantity: "1 tsp" },
        { name: "Soy sauce", quantity: "1 tbsp" },
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  "quick-meal": [
    {
      id: "qm-1",
      title: "5-Minute Microwave Egg Mug",
      description: "Super quick protein-packed breakfast",
      cookTime: "5 mins",
      calories: "220 kcal",
      ingredients: [
        { name: "Eggs", quantity: "2" },
        { name: "Milk", quantity: "2 tbsp" },
        { name: "Cheese", quantity: "1 slice" },
        { name: "Bell pepper", quantity: "2 tbsp, diced" },
        { name: "Salt and pepper", quantity: "to taste" },
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "qm-2",
      title: "Tuna Wrap",
      description: "No-cook wrap ready in minutes",
      cookTime: "3 mins",
      calories: "320 kcal",
      ingredients: [
        { name: "Canned tuna", quantity: "1 can" },
        { name: "Whole wheat wrap", quantity: "1" },
        { name: "Greek yogurt", quantity: "2 tbsp" },
        { name: "Lettuce", quantity: "1 leaf" },
        { name: "Lemon juice", quantity: "1 tsp" },
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  vegetarian: [
    {
      id: "veg-1",
      title: "Chickpea Curry",
      description: "Protein-rich vegetarian curry",
      cookTime: "30 mins",
      calories: "450 kcal",
      ingredients: [
        { name: "Chickpeas", quantity: "1 can" },
        { name: "Coconut milk", quantity: "200ml" },
        { name: "Tomatoes", quantity: "2" },
        { name: "Curry powder", quantity: "2 tsp" },
        { name: "Rice", quantity: "100g" },
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "veg-2",
      title: "Stuffed Bell Peppers",
      description: "Colorful and nutritious meal",
      cookTime: "35 mins",
      calories: "380 kcal",
      ingredients: [
        { name: "Bell peppers", quantity: "2" },
        { name: "Quinoa", quantity: "100g" },
        { name: "Black beans", quantity: "1/2 can" },
        { name: "Corn", quantity: "1/2 cup" },
        { name: "Feta cheese", quantity: "50g" },
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  "high-protein": [
    {
      id: "hp-1",
      title: "Greek Yogurt Protein Bowl",
      description: "High-protein breakfast or snack",
      cookTime: "5 mins",
      calories: "380 kcal",
      ingredients: [
        { name: "Greek yogurt", quantity: "200g" },
        { name: "Protein powder", quantity: "1 scoop" },
        { name: "Berries", quantity: "100g" },
        { name: "Almonds", quantity: "20g" },
        { name: "Honey", quantity: "1 tsp" },
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "hp-2",
      title: "Salmon and Quinoa",
      description: "Complete protein meal with omega-3 fatty acids",
      cookTime: "25 mins",
      calories: "520 kcal",
      ingredients: [
        { name: "Salmon fillet", quantity: "150g" },
        { name: "Quinoa", quantity: "100g" },
        { name: "Asparagus", quantity: "100g" },
        { name: "Lemon", quantity: "1/2" },
        { name: "Olive oil", quantity: "1 tbsp" },
      ],
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
}

export default function RecipeGoals() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const { addToCart } = useShoppingCart()
  const { toast } = useToast()

  const handleGoalSelect = (goal: Goal) => {
    setSelectedGoal(goal)
    setRecipes(MOCK_RECIPES[goal])
  }

  const handleAddIngredientsToCart = (recipe: Recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      addToCart(ingredient)
    })
    toast({
      title: "Added to cart",
      description: `Ingredients for ${recipe.title} added to your shopping cart`,
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-6">What's your goal today?</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-md transition-all ${selectedGoal === "bulking" ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleGoalSelect("bulking")}
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white text-center">
              <Dumbbell className="mx-auto h-8 w-8 mb-2" />
              <span className="font-medium">Bulking</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-md transition-all ${selectedGoal === "weight-loss" ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleGoalSelect("weight-loss")}
          >
            <div className="bg-gradient-to-br from-red-500 to-red-700 p-6 text-white text-center">
              <Flame className="mx-auto h-8 w-8 mb-2" />
              <span className="font-medium">Weight Loss</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-md transition-all ${selectedGoal === "quick-meal" ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleGoalSelect("quick-meal")}
          >
            <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-6 text-white text-center">
              <Clock className="mx-auto h-8 w-8 mb-2" />
              <span className="font-medium">Quick Meal</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-md transition-all ${selectedGoal === "vegetarian" ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleGoalSelect("vegetarian")}
          >
            <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 text-white text-center">
              <Leaf className="mx-auto h-8 w-8 mb-2" />
              <span className="font-medium">Vegetarian</span>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-md transition-all ${selectedGoal === "high-protein" ? "ring-2 ring-primary" : ""}`}
            onClick={() => handleGoalSelect("high-protein")}
          >
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 text-white text-center">
              <Utensils className="mx-auto h-8 w-8 mb-2" />
              <span className="font-medium">High Protein</span>
            </div>
          </motion.div>
        </div>
      </div>

      {recipes.length > 0 && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-medium">Suggested Recipes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full border-none shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-black/70 text-white px-3 py-1 m-2 rounded-full text-xs">
                      {recipe.calories}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-xl">{recipe.title}</h4>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Clock className="mr-1 h-4 w-4" /> {recipe.cookTime}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">{recipe.description}</p>

                    <div className="mt-4">
                      <h5 className="text-sm font-medium mb-3 flex items-center">
                        <ShoppingBag className="mr-2 h-4 w-4 text-primary" />
                        Ingredients:
                      </h5>
                      <ul className="text-sm space-y-2">
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li
                            key={idx}
                            className="flex justify-between items-center py-1 border-b border-dashed border-muted last:border-0"
                          >
                            <span>{ingredient.name}</span>
                            <span className="text-muted-foreground">{ingredient.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 bg-muted/30">
                    <Button className="w-full" onClick={() => handleAddIngredientsToCart(recipe)}>
                      Add Ingredients to Cart
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

