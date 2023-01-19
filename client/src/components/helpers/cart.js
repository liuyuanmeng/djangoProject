import React, { useState } from 'react'
const [cartItems, setCartItems] = useState([])

function getItemQuantity(id) {
  // const [cartItems, setCartItems] = useState([])
 return cartItems.find(item => item.id === id)?.quantity || 0
}
function increaseCartQuantity(id) {
  // const [cartItems, setCartItems] = useState([])
  setCartItems(currItems => {
    if (currItems.find(item => item.id === id) === null) {
      return [...currItems, { id, quantity: 1 }]
    } else {
      return currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }
        } else {
          return item
        }
      })
    }
  })
}
function decreaseCartQuantity(id) {
  // const [cartItems, setCartItems] = useState([])
  setCartItems(currItems => {
    if (currItems.find(item => item.id === id)?.quantity === 1) {
      return currItems.filter(item => item.id !== id)
    } else {
      return currItems.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 }
        } else {
          return item
        }
      })
    }
  })
}
function removeFromCart(id) {
  // const [cartItems, setCartItems] = useState([])
 setCartItems(currItems => {
    return currItems.filter(item => item.id !== id)
  })
}
