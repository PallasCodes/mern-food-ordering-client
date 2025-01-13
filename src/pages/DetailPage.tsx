import { useParams } from 'react-router-dom'

import { useGetRestaurant } from '@/api/RestaurantApi'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import RestaurantInfo from '@/components/RestaurantInfo'
import MenuItem from '@/components/MenuItem'

export default function DetailPage() {
  const { restaurantId } = useParams()
  const { restaurant, isLoading } = useGetRestaurant(restaurantId)

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
      <div className="grid md:grid-cols-[4fr_2fr gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem menuItem={menuItem} />
          ))}
        </div>
      </div>
    </div>
  )
}