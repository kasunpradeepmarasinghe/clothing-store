'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { CartItem, Product } from '@/types'

type CartState = {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; size: string }
  | { type: 'REMOVE_ITEM'; productId: string; size: string }
  | { type: 'UPDATE_QTY'; productId: string; size: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i.product.id === action.product.id && i.size === action.size
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id && i.size === action.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, size: action.size, quantity: 1 }],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.product.id === action.productId && i.size === action.size)
        ),
      }
    case 'UPDATE_QTY':
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            i => !(i.product.id === action.productId && i.size === action.size)
          ),
        }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.productId && i.size === action.size
            ? { ...i, quantity: action.quantity }
            : i
        ),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'OPEN_CART':
      return { ...state, isOpen: true }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

type CartContextType = {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, size: string) => void
  removeItem: (productId: string, size: string) => void
  updateQty: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) {
      const parsed = JSON.parse(saved)
      parsed.forEach((item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', product: item.product, size: item.size })
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      addItem: (product, size) => dispatch({ type: 'ADD_ITEM', product, size }),
      removeItem: (productId, size) => dispatch({ type: 'REMOVE_ITEM', productId, size }),
      updateQty: (productId, size, quantity) => dispatch({ type: 'UPDATE_QTY', productId, size, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
      openCart: () => dispatch({ type: 'OPEN_CART' }),
      closeCart: () => dispatch({ type: 'CLOSE_CART' }),
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
