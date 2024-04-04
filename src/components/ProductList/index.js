import React from "react";
import { EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ConfirmationModal from "../ConfirmationModal";

export default function ProductsList({
  setSelectedProduct,
  setIsOpenModal,
  products,
  setIsOpen, 
  isOpen, 
  deleteItem, 
  selectedProduct,
  loader,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {products.map((product, index) => (
        <div key={index} className="mb-3 h-fit relative">
          {product[index].map((d, i) => (
            <div key={i} className="group mb-3 relative">
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow border-gray-700">
                <img
                  className="p-8 rounded-t-lg h-auto w-full"
                  src={d.image}
                  alt="product"
                />
                <div className="p-5 bg-gray-800">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-white ">
                    {d.title}
                  </h5>
                  <p className="mb-3 font-bold text-white">
                    Category - {d.category}
                  </p>
                  <p className="mb-3 font-normal text-gray-400">
                    {d.description.slice(0, 100)}
                  </p>
                  <div>
                    <Link
                      to={`/product/${d.id}`}
                      className="inline-flex cursor-pointer items-center px-3 py-2 mr-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >
                      View
                      <EyeIcon
                        className="text-white font-bold h-4 w-4 ml-1"
                        aria-hidden="true"
                      />
                    </Link>
                    <div
                      onClick={() => {
                        setIsOpenModal(true);
                        setSelectedProduct(d);
                      }}
                      className="inline-flex cursor-pointer mr-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    >
                      Edit
                      <PencilIcon
                        className="text-white font-bold h-4 w-4 ml-1"
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedProduct(d);
                      }}
                      className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 bg-red-600 hover:bg-red-700 focus:ring-red-800"
                    >
                      Delete
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <ConfirmationModal selectedProduct={selectedProduct} setIsOpen={setIsOpen} isOpen={isOpen} deleteItem={deleteItem} loader={loader} />
    </div>
  );
}
