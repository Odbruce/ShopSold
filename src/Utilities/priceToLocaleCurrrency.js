import React from 'react'

export const priceToLocaleCurrrency = (price) => {
  const newPrice = Intl.NumberFormat("en-NG",{
    style:"currency",
    currency:"NGN"
  }).format(price);

    return newPrice;

}
