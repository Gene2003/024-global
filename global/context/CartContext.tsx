import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { Product } from '../types'


type WishlistContextType = {
    wishlist: any[]
    loading: boolean
    toggleWishlist: (product: any) => void
    isInWishlist: (productId: string) => boolean
}

export type CartItem = {
    id: string
    product_id: string
    product: Product;
    price: number
    quantity: number
}
type CartContextType = {
    cartItems: CartItem[],
    addToCart: (product: Product, quantity: number) => void
    removeFromCart: (product: Product, quantity: number) => void
    updateQuantity: (product: Product, quantity: number) => void
    clearCart: () => void
    cartTotal: number
    itemCount: number
    isLoading: boolean
}
const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {

    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [cartTotal, setCartTotal] = useState(0)

    const fetchCartItems = async () => {
        setIsLoading(true)
        const serverCart: CartItem[] = []
        const mappedItems: CartItem[] = serverCart.map((item) => ({
            id: item.product._id,
            product_id: item.product_id,
            product: item.product,
            price: item.price,
            quantity: item.quantity
        }))
        setCartItems(mappedItems)
        setCartTotal(mappedItems.reduce((total, item) => total + item.price * item.quantity, 0))
        setIsLoading(false)
    }

    const addToCart = (product: Product, quantity: number) => {
    }

    const removeFromCart = (product: Product, quantity: number) => {
    }

    const updateQuantity = (product: Product, quantity: number) => {
    }

    const clearCart = () => {
    }

    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0)

    useEffect(() => {
        fetchCartItems()
    }, [])

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount, isLoading }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
