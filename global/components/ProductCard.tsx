import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Link, type Href } from 'expo-router'
import { Product } from '../types'
import { useWishlist } from '../context/WishlistContext'

const { width } = Dimensions.get('window')
const CARD_WIDTH = (width - 32 - 12) / 2 // screen padding 16+16, gap 12

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUri = product.images?.[0]
  const {toggleWishlist, isInWishlist} = useWishlist()


  return (
    <Link href={`/product/${product._id}` as Href} asChild>
      <TouchableOpacity activeOpacity={0.8} style={{ width: CARD_WIDTH }} className="mb-4">
        <View className="bg-gray-100 rounded-xl overflow-hidden" style={{ height: CARD_WIDTH * 1.2 }}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Ionicons name="image-outline" size={36} color="#9CA3AF" />
            </View>
          )}
        </View>

        <Text className="mt-2 text-sm font-medium text-gray-900" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-base font-bold text-primary">
          KES {product.price.toLocaleString()}
          {product.unit ? <Text className="text-xs font-normal text-gray-500"> / {product.unit}</Text> : null}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}