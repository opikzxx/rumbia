import PropTypes from "prop-types";
import Button from "../elements/Button";

export default function DeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the product{" "}
          <strong>{productName}</strong>?
        </p>
        <div className="mt-4 flex justify-between gap-4">
          <Button variant="primary" size="small" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

DeleteDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  productName: PropTypes.string.isRequired,
};
