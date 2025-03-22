import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction === "plus") {
      const indexOfCurrentCartItem = cartItems.items.findIndex(
        (item) => item.productId === getCartItem?.productId
      );
      const product = productList.find(
        (product) => product._id === getCartItem?.productId
      );

      if (product && indexOfCurrentCartItem > -1) {
        const quantity = cartItems.items[indexOfCurrentCartItem].quantity;
        if (quantity + 1 > product.totalStock) {
          toast({
            title: `Stock limité : seulement ${product.totalStock} en stock.`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Quantité mise à jour avec succès." });
      }
    });
  }

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Article supprimé du panier avec succès." });
      }
    });
  }

  return (
    <div className="flex items-center space-x-6 bg-gray-50 p-4 rounded-lg shadow-sm">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-24 h-24 rounded-lg object-cover border border-gray-200"
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800">{cartItem?.title}</h3>
        <div className="flex items-center gap-3 mt-2">
          <Button
            variant="ghost"
            className="h-8 w-8 bg-red-100 text-red-600 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="text-lg font-semibold text-gray-700">
            {cartItem?.quantity}
          </span>
          <Button
            variant="ghost"
            className="h-8 w-8 bg-green-100 text-green-600 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-lg font-semibold text-gray-800">
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}{" "}
          €
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="text-red-500 hover:text-red-700 cursor-pointer mt-2"
          size={24}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
