
import type { Product } from '@/types/product';
import { get, writable } from 'svelte/store';

export interface cartItem {
  quantity: number;
  item: Product
}

function createCartStore() {
  const cartItems = writable<cartItem[]>([])
  const { subscribe } = cartItems
  const currentBasket = () => get(cartItems)
  const itemInBasket = (item: Product) => currentBasket().find(i => i.item.id === item.id)

  function addToCart(item: Product, quantity: number) {

    if (itemInBasket(item)) {
      const index = currentBasket().findIndex(i => i.item.id === item.id)
      cartItems.update(i => {
        i[index].quantity += quantity
        return i
      })
      return
    }

    cartItems.update(i => {
      i.push({
        quantity: quantity,
        item: item
      })
      return i
    })
    console.log(currentBasket())
  }

  function removeFromCart(item: Product) {
    if (!itemInBasket(item)) {
      return
    }

    const index = currentBasket().findIndex(i => i.item.id === item.id)
    cartItems.update(items => {
      items.splice(index, 1)
      return items
    })
  }

  return {
    subscribe,
    addToCart,
    removeFromCart
  }
}

export const cartStore = createCartStore()
