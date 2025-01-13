import { MenuItem as MenuItemType } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { MouseEventHandler } from 'react'

type Props = {
  menuItem: MenuItemType
  addToCart: MouseEventHandler
}

export default function MenuItem({ menuItem, addToCart }: Props) {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ${(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  )
}
