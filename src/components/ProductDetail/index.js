import React from "react";
import Ratings from "../Ratings";
export default function ProductDetail({ product }) {
  return (
    <div className="font-[sans-serif] bg-white">
      <div className="p-6 mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="flex justify-center px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
              <img
                src={product.image}
                alt="Product"
                className="w-1/3 rounded object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-[#333]">
              {product.title}
            </h2>
            <h2 className="text-lg font-normal text-[#333] mt-2">
              {product.description}
            </h2>
            <div className="flex flex-wrap gap-4 mt-6">
              <p className="text-[#333] text-4xl font-bold">${product.price}</p>
            </div>
            <Ratings product={product} />
            <div className="flex flex-wrap gap-4 mt-10">
              <button
                type="button"
                className="min-w-[200px] px-4 py-3 bg-[#333] hover:bg-[#111] text-white text-sm font-bold rounded"
              >
                Buy now
              </button>
              <button
                type="button"
                className="min-w-[200px] px-4 py-2.5 border border-[#333] bg-transparent hover:bg-gray-50 text-[#333] text-sm font-bold rounded"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
