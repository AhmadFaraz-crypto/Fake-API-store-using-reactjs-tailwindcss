import { useEffect, useState } from "react";

export default function Ratings({ product }) {
  const [ratings] = useState([]);
  useEffect(() => {
    if (product?.rating && !ratings.length) {
      for (let index = 0; index < 5; index++) {
        if (index > product.rating.rate) {
          ratings.push("#CED5D8");
        } else {
          ratings.push("#FFAA1D");
        }
      }
    }
  }, [product, ratings]);
  return (
    <div className="flex space-x-2 mt-4">
      {ratings.map((rating, index) => (
        <svg
          key={index}
          className={`w-5 fill-[${rating}]`}
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
        </svg>
      ))}
      <h4 className="text-[#333] text-base">{product?.rating?.count} Reviews</h4>
    </div>
  );
}
