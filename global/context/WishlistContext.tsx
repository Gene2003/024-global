import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type WishlistContextType = {
    wishlist: any[]
    loading: boolean
    toggleWishlist: (product: any) => void
    isInWishlist: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [wishlist, setWishlist] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const fetchWishlist = async () => {
        setLoading(true)
        try {
            // Wishlist loading can be implemented here.
        } finally {
            setLoading(false)
        }
    }

    const toggleWishlist = (product: any) => {
        setWishlist((prev) => {
            const exists = prev.some((item) => item._id === product._id)

            if (exists) {
                return prev.filter((item) => item._id !== product._id)
            }

            return [...prev, product]
        })
    }
  
    const isInWishlist = (productId: string) => {
        return wishlist.some((p)=> p._id === productId);
    }
    

    useEffect(() => {
        void fetchWishlist()
    }, [])

    return (
        <WishlistContext.Provider value={{ wishlist, loading, toggleWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider')
    }
    return context
}
