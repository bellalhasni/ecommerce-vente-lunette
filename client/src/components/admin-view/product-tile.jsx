import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[250px] object-cover rounded-t-lg"
        />
        {product?.salePrice > 0 && (
          <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-lg">
            Sale
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h2 className="text-2xl font-semibold text-gray-900 truncate">{product?.title}</h2>
        <div className="mt-2 flex justify-between items-center">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through text-gray-500" : "text-primary"
            } text-lg font-semibold`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-xl font-bold text-green-600">
              ${product?.salePrice}
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center p-4 bg-gray-50 rounded-b-lg">
        <Button
          variant="outline"
          className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
          onClick={() => handleDelete(product?._id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
