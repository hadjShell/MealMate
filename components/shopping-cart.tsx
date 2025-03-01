"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useShoppingCart } from "@/lib/shopping-cart-context"
import { Trash2, Plus, Minus, ShoppingBag, Store, MapPin, Truck, Clock, CreditCard } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const MOCK_STORES = [
  { id: "1", name: "Whole Foods Market", distance: "0.8 miles", address: "123 Main St", rating: 4.7 },
  { id: "2", name: "Trader Joe's", distance: "1.2 miles", address: "456 Oak Ave", rating: 4.5 },
  { id: "3", name: "Safeway", distance: "1.5 miles", address: "789 Pine Blvd", rating: 4.2 },
]

const MOCK_ONLINE_STORES = [
  { id: "1", name: "Amazon Fresh", deliveryTime: "2 hours", deliveryFee: "$4.99", rating: 4.6 },
  { id: "2", name: "Instacart", deliveryTime: "1 hour", deliveryFee: "$5.99", rating: 4.4 },
  { id: "3", name: "Walmart Grocery", deliveryTime: "Same day", deliveryFee: "$7.99", rating: 4.3 },
]

export default function ShoppingCart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useShoppingCart()
  const [zipCode, setZipCode] = useState("")
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  const [showStores, setShowStores] = useState(false)

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

  const handleUpdateQuantity = (id: string, delta: number) => {
    const item = cart.find((item) => item.id === id)
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta)
      updateQuantity(id, newQuantity)
    }
  }

  const handleFindStores = () => {
    if (zipCode.length >= 5) {
      setShowStores(true)
    }
  }

  return (
    <div className="space-y-8">
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-muted/30 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mt-6 text-xl font-medium">Your cart is empty</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Add ingredients from recipes or by identifying meals to start building your shopping list
            </p>
          </motion.div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
                Shopping Cart
                <Badge variant="outline" className="ml-2 font-normal">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </Badge>
              </h3>
              <Button variant="outline" size="sm" onClick={clearCart}>
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
            </div>

            <Card className="border-none shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="divide-y">
                  {cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.originalQuantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive rounded-full ml-2"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-medium flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Where to Buy
            </h3>

            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="zip-code" className="mb-2 block">
                    Enter Zip Code
                  </Label>
                  <Input
                    id="zip-code"
                    placeholder="e.g. 94103"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="focus-visible:ring-primary"
                  />
                </div>
                <Button onClick={handleFindStores} disabled={zipCode.length < 5} className="w-full sm:w-auto">
                  Find Stores
                </Button>
              </div>

              <AnimatePresence>
                {showStores && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Tabs defaultValue="physical" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger
                          value="physical"
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          <Store className="mr-2 h-4 w-4" />
                          Physical Stores
                        </TabsTrigger>
                        <TabsTrigger
                          value="online"
                          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          <Truck className="mr-2 h-4 w-4" />
                          Online Delivery
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="physical">
                        <div className="space-y-4">
                          {MOCK_STORES.map((store, index) => (
                            <motion.div
                              key={store.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <Card
                                className={`cursor-pointer transition-all hover:shadow-md ${selectedStore === store.id ? "border-primary shadow-md" : "border-transparent"}`}
                                onClick={() => setSelectedStore(store.id)}
                              >
                                <CardContent className="p-4 flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium flex items-center">
                                      {store.name}
                                      <Badge variant="outline" className="ml-2">
                                        {store.rating} ★
                                      </Badge>
                                    </h4>
                                    <p className="text-sm text-muted-foreground">{store.address}</p>
                                    <div className="flex items-center mt-1 text-sm">
                                      <MapPin className="h-3 w-3 mr-1 text-primary" />
                                      <span>{store.distance} away</span>
                                    </div>
                                  </div>
                                  <Store className="h-6 w-6 text-primary" />
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}

                          <Button className="w-full mt-4" disabled={!selectedStore}>
                            <MapPin className="mr-2 h-4 w-4" />
                            Get Directions
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="online">
                        <div className="space-y-4">
                          {MOCK_ONLINE_STORES.map((store, index) => (
                            <motion.div
                              key={store.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <Card
                                className={`cursor-pointer transition-all hover:shadow-md ${selectedStore === store.id ? "border-primary shadow-md" : "border-transparent"}`}
                                onClick={() => setSelectedStore(store.id)}
                              >
                                <CardContent className="p-4 flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium flex items-center">
                                      {store.name}
                                      <Badge variant="outline" className="ml-2">
                                        {store.rating} ★
                                      </Badge>
                                    </h4>
                                    <div className="flex items-center mt-1 text-sm">
                                      <Clock className="h-3 w-3 mr-1 text-primary" />
                                      <span>Delivery in {store.deliveryTime}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Fee: {store.deliveryFee}</p>
                                  </div>
                                  <Truck className="h-6 w-6 text-primary" />
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}

                          <Button className="w-full mt-4" disabled={!selectedStore}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Proceed to Checkout
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

