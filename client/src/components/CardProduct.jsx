import React from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({ data }) => {
  if (!data) return null

  const url = `/product/${valideURLConvert(data.name)}-${data._id}`

  const firstImage = data?.image?.[0]
  const hasDiscount = Boolean(data?.discount)

  return (
    <Link
      to={url}
      className="border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white hover:shadow-md transition-shadow"
    >
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden bg-white flex items-center justify-center">
        {firstImage ? (
          <img
            src={firstImage}
            className="w-full h-full object-scale-down lg:scale-125"
            alt={data?.name || 'product'}
            loading="lazy"
          />
        ) : (
          <div className="text-xs text-neutral-400">No Image</div>
        )}
      </div>
      <div className="flex items-center gap-1">
        <div className="rounded text-xs w-fit p-[1px] px-2 text-pink-600 bg-pink-50">
          10 min
        </div>
        {hasDiscount && (
          <p className="text-pink-600 bg-pink-100 px-2 w-fit text-xs rounded-full">{data.discount}% discount</p>
        )}
      </div>
      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {data?.name}
      </div>
      <div className="w-fit gap-1 px-2 lg:px-0 text-xs lg:text-base text-neutral-500">
        {data?.unit}
      </div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="flex items-center gap-1">
          <div className="font-semibold">
            {DisplayPriceInRupees(pricewithDiscount(data?.price, data?.discount))}
          </div>
        </div>
        <div className="">
          {data?.stock == 0 ? (
            <p className="text-red-500 text-sm text-center">Out of stock</p>
          ) : (
            <AddToCartButton data={data} />
          )}
        </div>
      </div>
    </Link>
  )
}

export default CardProduct
