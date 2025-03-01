"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type CartItem = {
  id: string
  name: string
  quantity: number
  originalQuantity: string
}

type ShoppingCartContextType = {
  cart: CartItem[]
  addToCart: (item: { name: string; quantity: string }) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined)

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: { name: string; quantity: string }) => {
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.name.toLowerCase() === item.name.toLowerCase(),
      )

      if (existingItemIndex >= 0) {
        // Item exists, increment quantity
        const updatedCart = [...prevCart]
        updatedCart[existingItemIndex].quantity += 1
        return updatedCart
      } else {
        // Item doesn't exist, add new item
        return [
          ...prevCart,
          {
            id: Date.now().toString(),
            name: item.name,
            quantity: 1,
            originalQuantity: item.quantity,
          },
        ]
      }
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext)
  if (context === undefined) {
    throw new Error("useShoppingCart must be used within a ShoppingCartProvider")
  }
  return context
}

