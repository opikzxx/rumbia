import PropTypes from "prop-types";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../fragments/DialogDelete";
import { useState } from "react";
import parser from "html-react-parser";

export default function ProductCard({
  id,
  name,
  description,
  brand,
  sku,
  variations,
  onDelete,
}) {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col space-y-4">
      <div className="bg-slate-300 h-28 rounded-lg p-6 flex-1">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-gray-500">SKU: {sku}</p>
        <p className="text-sm text-gray-700">Brand: {brand}</p>
        <div className="h-20 overflow-hidden text-sm text-gray-600 mt-2">
          {parser(description)}
        </div>
      </div>
      {variations?.length > 0 && (
        <div className="mt-4 p-6 h-40">
          <h3 className="text-md font-semibold">Variations:</h3>
          <ul className="space-y-2 mt-2 max-h-28 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {variations.map((variation, index) => (
              <li key={index} className="p-2 border rounded-lg">
                <p className="font-semibold">Name: {variation.name}</p>
                <p className="text-sm text-gray-500">SKU: {variation.sku}</p>
                <p className="text-sm text-gray-700">
                  Price: {variation.price}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-center gap-2 p-6 mt-auto">
        <Button
          variant="primary"
          size="small"
          onClick={() => navigate(`/edit/${id}`)}
        >
          Edit
        </Button>
        <Button variant="secondary" size="small" onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleDeleteConfirm}
        productName={name}
      />
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  sku: PropTypes.string,
  variations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sku: PropTypes.string,
      price: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
