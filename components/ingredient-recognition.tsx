"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, LinkIcon, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { recognizeIngredients } from "@/lib/ai-service"
import { useShoppingCart } from "@/lib/shopping-cart-context"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function IngredientRecognition() {
  const [inputText, setInputText] = useState("")
  const [inputUrl, setInputUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recognizedIngredients, setRecognizedIngredients] = useState<any[]>([])
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { toast } = useToast()
  const { addToCart } = useShoppingCart()

  const handleTextSubmit = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a description of your meal",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const ingredients = await recognizeIngredients(inputText)
      setRecognizedIngredients(ingredients)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to recognize ingredients. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUrlSubmit = async () => {
    if (!inputUrl.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a valid URL",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // In a real app, you would send this URL to your backend for processing
      // For this example, we'll use mock data
      setTimeout(() => {
        const mockIngredients = [
          { name: "Pasta", quantity: "200g" },
          { name: "Tomato sauce", quantity: "150g" },
          { name: "Cheese", quantity: "50g" },
          { name: "Basil", quantity: "5 leaves" },
        ]
        setRecognizedIngredients(mockIngredients)
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process the URL. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
        // In a real app, you would upload this to your AI service
        // For demo purposes, we'll simulate with mock data
        setIsLoading(true)
        setTimeout(() => {
          const mockIngredients = [
            { name: "Chicken breast", quantity: "500g" },
            { name: "Broccoli", quantity: "200g" },
            { name: "Brown rice", quantity: "1 cup" },
            { name: "Olive oil", quantity: "2 tbsp" },
            { name: "Garlic", quantity: "2 cloves" },
          ]
          setRecognizedIngredients(mockIngredients)
          setIsLoading(false)
        }, 2000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddAllToCart = () => {
    recognizedIngredients.forEach((ingredient) => {
      addToCart(ingredient)
    })
    toast({
      title: "Added to cart",
      description: `${recognizedIngredients.length} ingredients added to your shopping cart`,
    })
  }

  const handleAddToCart = (ingredient: any) => {
    addToCart(ingredient)
    toast({
      title: "Added to cart",
      description: `${ingredient.name} added to your shopping cart`,
    })
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="image">
            <Upload className="mr-2 h-4 w-4" /> Image
          </TabsTrigger>
          <TabsTrigger value="url">
            <LinkIcon className="mr-2 h-4 w-4" /> URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <div className="space-y-4">
            <Textarea
              placeholder="Describe your meal or paste a recipe here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={5}
              className="w-full resize-none focus-visible:ring-primary"
            />
            <Button onClick={handleTextSubmit} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </div>
              ) : (
                "Identify Ingredients"
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="image">
          <div className="space-y-6">
            <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 text-center transition-all hover:border-primary/50">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Food preview"
                    className="max-h-64 mx-auto rounded-md object-cover"
                  />
                  <div className="flex justify-center gap-2">
                    <Button variant="outline" onClick={() => setImagePreview(null)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Image
                    </Button>
                    <Button
                      onClick={() => {
                        setIsLoading(true)
                        setTimeout(() => {
                          const mockIngredients = [
                            { name: "Chicken breast", quantity: "500g" },
                            { name: "Broccoli", quantity: "200g" },
                            { name: "Brown rice", quantity: "1 cup" },
                            { name: "Olive oil", quantity: "2 tbsp" },
                            { name: "Garlic", quantity: "2 cloves" },
                          ]
                          setRecognizedIngredients(mockIngredients)
                          setIsLoading(false)
                        }, 2000)
                      }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Analyzing...
                        </div>
                      ) : (
                        "Identify Ingredients"
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Drag and drop an image, or click to browse</p>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="url">
          <div className="space-y-4">
            <Input
              type="url"
              placeholder="Enter a URL to a recipe or food image..."
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full focus-visible:ring-primary"
            />
            <Button onClick={handleUrlSubmit} disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Analyzing...
                </div>
              ) : (
                "Identify Ingredients"
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <AnimatePresence>
        {recognizedIngredients.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <CardContent className="p-0">
                <div className="p-6 bg-primary/5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Recognized Ingredients</h3>
                    <Button onClick={handleAddAllToCart} size="sm" className="text-xs">
                      Add All to Cart
                    </Button>
                  </div>
                  <ul className="space-y-2">
                    {recognizedIngredients.map((ingredient, index) => (
                      <motion.li
                        key={index}
                        className="flex justify-between items-center p-3 bg-card rounded-md shadow-sm hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <div>
                          <span className="font-medium">{ingredient.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{ingredient.quantity}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAddToCart(ingredient)}
                          className="h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground"
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Add {ingredient.name} to cart</span>
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

