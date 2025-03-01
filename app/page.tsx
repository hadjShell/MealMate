import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RecipeGoals from "@/components/recipe-goals"
import IngredientRecognition from "@/components/ingredient-recognition"
import ShoppingCart from "@/components/shopping-cart"
import { Toolbar } from "@/components/toolbar"
import { Utensils, ShoppingBag, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Toolbar />

      <main className="flex-1">
        <section className="container px-4 py-12">
          <Tabs defaultValue="recognize" className="w-full max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger
                value="recognize"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Identify Ingredients
              </TabsTrigger>
              <TabsTrigger
                value="suggest"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Utensils className="mr-2 h-4 w-4" />
                Recipe Suggestions
              </TabsTrigger>
              <TabsTrigger
                value="cart"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shopping Cart
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recognize">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Identify Ingredients</CardTitle>
                  <CardDescription>
                    Enter text, upload an image, or provide a URL to identify ingredients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <IngredientRecognition />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggest">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Recipe Suggestions</CardTitle>
                  <CardDescription>Get personalized recipe suggestions based on your goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecipeGoals />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cart" id="cart">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Shopping Cart</CardTitle>
                  <CardDescription>View and manage your ingredients shopping list</CardDescription>
                </CardHeader>
                <CardContent>
                  <ShoppingCart />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">© 2023 MealMate. All rights reserved.</p>
          <nav className="sm:ml-auto flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

