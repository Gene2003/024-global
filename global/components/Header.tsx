import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

type HeaderProps = {
  title?: string
  showBackButton?: boolean
  showSearch?: boolean
  showCart?: boolean
  showMenu?: boolean
  showLogo?: boolean
}

export default function Header({
  title,
  showBackButton,
  showSearch,
  showCart,
  showMenu,
  showLogo,
}: HeaderProps) {
  const router = useRouter()
  const { itemCount } = { itemCount: 3 } // Replace with your actual cart item count logic

  return (
    <View className='flex-row items-center justify-between px-4 py-3 bg-white'>
      {/* Left Section */}
      <View className='flex-row items-center flex-1'>
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()} className='mr-3'>
            <Ionicons name='arrow-back' size={24} color='black' />
          </TouchableOpacity>
        )}

        {showMenu && (
          <TouchableOpacity className='mr-3'>
            <Ionicons name='menu' size={28} color='black' />
          </TouchableOpacity>
        )}

        {showLogo ? (
          <View className='flex-1'>
            <Image
              source={require('../assets/images2/logo.png')}
              style={{ width: '100%', height: 24 }}
              resizeMode='contain'
            />
          </View>
        ) : title && (
          <Text className='text-xl font-bold text-primary text-center flex-1 mr-8'>{title ?? ''}</Text>
        )}

        {(!title && !showSearch) && <View className='flex-1' />}
      </View>

      {/* Right Section */}
      <View className='flex-row items-center gap-4'>
        {showSearch && (
           <TouchableOpacity>
            <Ionicons name='search-outline' size={24} color='black' />
          </TouchableOpacity>
        )}
        {showCart && (
          <TouchableOpacity onPress={()=> router.push('/(tabs)/cart')}>
            <View className='relative'>
              <Ionicons name='bag-outline' size={24} color='black' />
              <View className='absolute -top-1 -right-1 bg-accent rounded-full items-center justify-center w-4 h-4'>
                <Text className='text-[10px] text-white font-bold'>{itemCount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View />
    </View>
  )
}