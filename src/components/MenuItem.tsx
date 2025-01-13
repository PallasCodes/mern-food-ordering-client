import { MenuItem as MenuItemType } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type Props = {
  menuItem: MenuItemType
}

export default function MenuItem({ menuItem }: Props) {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ${(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  )
}