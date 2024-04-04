import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CategoriesList({
  categories,
  selectedCategory,
  getCategoryProductsList,
  resetCategory,
}) {
  return (
    <div className="flex items-center flex-wrap">
      <p className="font-bold mr-2 mb-3">Categories - </p>
      {categories.map((category, index) => (
        <div className="relative" key={index}>
          <div
            onClick={() => getCategoryProductsList(category)}
            className={`inline-flex items-center pl-3 ${
              selectedCategory === category ? "pr-7" : "pr-3"
            } py-2 mr-3 cursor-pointer text-sm mb-3 font-medium text-center text-white bg-orange-400 rounded-xl hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 ${
              selectedCategory === category
                ? "dark:bg-orange-600"
                : "dark:bg-orange-400"
            } dark:hover:bg-orange-700 dark:focus:ring-orange-800`}
          >
            {category}
          </div>
          {selectedCategory === category && (
            <XMarkIcon
              onClick={resetCategory}
              className="absolute cursor-pointer text-white h-4 w-4 ml-1 top-3 right-5"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </div>
  );
}
