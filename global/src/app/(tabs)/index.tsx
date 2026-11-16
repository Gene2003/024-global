import { View, Text, ScrollView, Image, Dimensions, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { useRouter } from 'expo-router'
import Header from '../../../components/Header'
import CategoryItem from '../../../components/CategoryItem'
import ProductCard from '../../../components/ProductCard'
import { BANNERS, CATEGORIES } from '../../../constants'
import { Product } from '../../../types'

const { width } = Dimensions.get('window')

export default function Home() {
  const router = useRouter()
  const [activeBannerIndex, setActiveBannerIndex] = React.useState(0)
  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)

  const categories = [{ id: 'all', name: 'All', icon: 'grid-outline' }, ...CATEGORIES]

  const fetchProducts = async () => {
    setProducts([
      {id: '1', name: 'Fresh Apples', images: ['https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800'], price: 3.99 },
      {id: '2', name: 'Organic Carrots', images: ['https://images.unsplash.com/photo-1582515073490-399813c1f3b9?w=800'], price: 2.49 },
      {id: '3', name: 'Golden Wheat', images: ['https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=800'], price: 1.99 },
      {id: '4', name: 'Fresh Bananas', images: ['https://images.unsplash.com/photo-1574226516831-e1dff420e43e?w=800'], price: 1.29 },
    ]) // TODO: load from your API
    setLoading(false)
  }

  React.useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <Header showMenu showCart showLogo />

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Banners */}
        <View className="my-4">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => {
              const slide = Math.round(
                e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
              )
              if (slide !== activeBannerIndex) setActiveBannerIndex(slide)
            }}
          >
            {BANNERS.map((banner) => (
              <View
                key={banner.id}
                className="h-48 rounded-xl overflow-hidden"
                style={{ width: width - 32 }}
              >
                <Image source={{ uri: banner.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                {/* overlay first, then the text on top */}
                <View style={StyleSheet.absoluteFill} className="bg-black/40" />
                <View className="absolute bottom-4 left-4 right-4">
                  <Text className="text-white text-2xl font-bold">{banner.title}</Text>
                  <Text className="text-white text-sm font-medium">{banner.subtitle}</Text>
                  <TouchableOpacity
                    onPress={() => router.push('/shop')}
                    className="mt-2 bg-white px-4 py-2 rounded-full self-start"
                  >
                    <Text className="text-black text-xs font-bold">Get Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Dots */}
          <View className="flex-row justify-center mt-3 gap-2">
            {BANNERS.map((banner, index) => (
              <View
                key={banner.id}
                className={`h-2 rounded-full ${index === activeBannerIndex ? 'w-6 bg-primary' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-primary mb-4">Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <CategoryItem
                key={cat.id}
                item={cat}
                isSelected={false}
                onPress={() =>
                  router.push({
                    pathname: '/shop',
                    params: { category: cat.id === 'all' ? '' : cat.name },
                  })
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* Products */}
        <View className="mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-primary">Products</Text>
            <TouchableOpacity onPress={() => router.push('/shop')}>
              <Text className="text-accent text-sm font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#1F78B4" />
          ) : products.length === 0 ? (
            <View className="items-center py-10">
              <Text className="text-gray-500">No products yet</Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap justify-between">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </View>
          )}
        </View>
        {/*newsletter CTA*/}
        <View className='mb-8 p-4 bg-gray-100 rounded-xl items-center'>
          <Text className='text-lg font-bold text-center'>Subscribe to our newsletter for the latest updates!</Text>
          <Text className='text-center'>Sign up now and receive exclusive offers and discounts.</Text>
          <TouchableOpacity className='mt-8 bg-primary px-9 py-5 rounded-full'>
            <Text className='text-white font-bold'>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}