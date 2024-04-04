import React, { useState, useEffect } from "react";

export default function AddNewProductModal({
  isModalOpen,
  selectedProduct,
  categories,
  handleCloseModal,
  updateProductData,
  addNewProduct,
  loader,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setTitle("");
    setDescription("");
    setCategory("");
    if (selectedProduct.title) {
      setTitle(selectedProduct.title);
      setDescription(selectedProduct.description);
      setCategory(selectedProduct.category);
    }
  }, [selectedProduct]);

  function handleSubmit() {
    const payload = {
      title: title,
      description: description,
      category: category,
      image: selectedProduct.image || url,
    };
    if (selectedProduct.id) {
      updateProductData(selectedProduct.id, payload);
    } else {
      addNewProduct(payload);
    }
  }

  function handleUploadImage(obj) {
    const blob = URL.createObjectURL(obj);
    setUrl(blob);
  }

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        !isModalOpen && "hidden"
      } flex justify-center bg-gray-500 bg-opacity-75 transition-opacity overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
            <h5 className="text-xl font-medium text-gray-900 text-white">
              Update Product
            </h5>
          </div>
          <form className="space-y-6 w-full px-6 pt-4" action="#">
            {!selectedProduct.image && (
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 text-white"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <input
                  onChange={(e) => handleUploadImage(e.target.files[0])}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 text-gray-400 p-2.5 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                  id="file_input"
                  type="file"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="Title"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                placeholder="Product title"
              />
            </div>
            <div>
              <label
                htmlFor="categories"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Select an Category
              </label>
              <select
                id="categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
              >
                <option>Choose a category</option>
                {categories.map((category, index) => (
                  <option key={index}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="Title"
                className="block mb-2 text-sm font-medium text-gray-900 text-white"
              >
                Description
              </label>
              <textarea
                type="text"
                name="title"
                id="title"
                cols={4}
                rows={6}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                placeholder="Product Description"
              />
            </div>
            <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b border-gray-600">
              <button
                onClick={handleSubmit}
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                {selectedProduct.id
                  ? loader
                    ? "Updating..."
                    : "Update"
                  : loader
                  ? "Adding..."
                  : "Add"}
              </button>
              <button
                onClick={() => handleCloseModal(false)}
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
