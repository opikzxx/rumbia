import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Button from "../components/elements/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";

export default function AddProduct() {
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [productId] = useState(generateRandomId());

  function generateRandomId() {
    return "P-" + Math.random().toString(36).substr(2, 9);
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variations",
  });

  const onSubmit = (data) => {
    const productData = { ...data, id: productId };
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    existingProducts.push(productData);
    localStorage.setItem("products", JSON.stringify(existingProducts));
    reset({ name: "", sku: "", brand: "", description: "", variations: [] });
    navigate("/products");
  };

  return (
    <div className="max-w-screen-md mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Add Product</h1>

      <Button variant="secondary" size="small" onClick={() => navigate(-1)}>
        {"<"} Back
      </Button>

      <div className="border-2 border-slate-200 rounded-3xl mt-6 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <input
            type="hidden"
            id="product_id"
            value={productId}
            {...register("id")}
          />

          <div className="relative z-0 w-full group">
            <input
              autoComplete="off"
              type="text"
              id="product_name"
              {...register("name", { required: "Name is required" })}
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="product_name"
              className="absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Name
            </label>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="relative z-0 w-full group">
            <input
              type="text"
              id="product_sku"
              autoComplete="off"
              {...register("sku", { required: "SKU is required" })}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="product_sku"
              className="absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              SKU
            </label>
            {errors.sku && (
              <p className="text-red-500 text-sm">{errors.sku.message}</p>
            )}
          </div>

          <div className="relative z-0 w-full group">
            <select
              {...register("brand", { required: "Brand is required" })}
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            >
              <option value="">Select Brand</option>
              <option value="Brand A">Brand A</option>
              <option value="Brand B">Brand B</option>
              <option value="Brand C">Brand C</option>
            </select>
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>

          <div className="relative z-0 w-full group">
            <label
              htmlFor="description"
              className="absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6 mt-4"
            >
              Description
            </label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  theme="snow"
                  ref={quillRef}
                  className="block w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-10"
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <h2 className="font-bold text-lg mb-2">Variations</h2>
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center gap-4 mb-4 p-4">
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    autoComplete="off"
                    {...register(`variations[${index}].name`, {
                      required: "Name is required",
                    })}
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Name
                  </label>
                  {errors?.variations?.[index]?.name && (
                    <p className="text-red-500 text-sm">
                      {errors.variations[index].name.message}
                    </p>
                  )}
                </div>

                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    autoComplete="off"
                    {...register(`variations[${index}].sku`, {
                      required: "SKU is required",
                    })}
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6">
                    SKU
                  </label>
                  {errors?.variations?.[index]?.sku && (
                    <p className="text-red-500 text-sm">
                      {errors.variations[index].sku.message}
                    </p>
                  )}
                </div>

                <div className="relative z-0 w-full group">
                  <input
                    type="number"
                    autoComplete="off"
                    {...register(`variations[${index}].price`, {
                      required: "Price is required",
                    })}
                    className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label className="absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Price
                  </label>
                  {errors?.variations?.[index]?.price && (
                    <p className="text-red-500 text-sm">
                      {errors.variations[index].price.message}
                    </p>
                  )}
                </div>

                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              variant="primary"
              size="small"
              onClick={() => append({ name: "", sku: "", price: "" })}
            >
              Add Variation
            </Button>
          </div>

          <div className="mt-6">
            <Button variant="primary" size="large" type="submit">
              Save Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
