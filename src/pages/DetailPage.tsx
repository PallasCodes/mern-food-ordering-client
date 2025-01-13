import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useGetRestaurant } from '@/api/RestaurantApi'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import RestaurantInfo from '@/components/RestaurantInfo'
import MenuItem from '@/components/MenuItem'
import { Card, CardFooter } from '@/components/ui/card'
import OrderSummary from '@/components/OrderSummary'
import { MenuItem as MenuItemType } from '@/types'
import CheckoutButton from '@/components/CheckoutButton'
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm'

export type CartItem = {
  _id: string
  name: string
  price: number
  quantity: number
}

export default function DetailPage() {
  const { restaurantId } = useParams()
  const { restaurant, isLoading } = useGetRestaurant(restaurantId)

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedcartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
    return storedcartItems ? JSON.parse(storedcartItems) : []
  })

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prev) => {
      const existingCartItem = prev.find((item) => item._id === menuItem._id)

      let updatedCartItems

      if (existingCartItem) {
        updatedCartItems = prev.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
      } else {
        updatedCartItems = [
          ...prev,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ]
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      )

      return updatedCartItems
    })
  }

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prev) => {
      const updatedCartItems = prev.filter((item) => item._id !== cartItem._id)

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      )

      return updatedCartItems
    })
  }

  const onCheckout = (userFormData: UserFormData) => {
    console.log('Checkout', userFormData)
  }

  if (isLoading || !restaurant) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className="rouded-md object-cover h-full w-full"
          src={restaurant.imageUrl}
          alt="Restaurant image"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
