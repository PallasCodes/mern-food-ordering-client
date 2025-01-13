import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu'

export type Props = {
  onChange: (value: string) => void
  sortOption: string
}

const SORT_OPTIONS = [
  {
    label: 'Best Match',
    value: 'bestMatch',
  },
  {
    label: 'Delivery price',
    value: 'deliveryPrice',
  },
  {
    label: 'Estimated delivery time',
    value: 'estimatedDeliveryTime',
  },
]

export default function SortOptionDropdown({ onChange, sortOption }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant="outline" className="w-full">
          Sort by: {SORT_OPTIONS.find((option) => option.value === sortOption)?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
