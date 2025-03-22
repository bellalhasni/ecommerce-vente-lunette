import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "@/store/admin/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;

    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetailsForAdmin(orderDetails?._id));
        dispatch(getAllOrdersForAdmin());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] bg-white rounded-lg p-6 shadow-xl">
      <div className="grid gap-6">
        <div className="grid gap-2">
          {/* Order Info */}
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium text-gray-700">Order ID</p>
            <Label className="text-gray-900">{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-gray-700">Order Date</p>
            <Label className="text-gray-900">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-gray-700">Order Price</p>
            <Label className="text-gray-900">${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-gray-700">Payment method</p>
            <Label className="text-gray-900">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-gray-700">Payment Status</p>
            <Label className="text-gray-900">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-gray-700">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 rounded-full ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500 text-white"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-4">
          {/* Order Items */}
          <div className="font-medium text-gray-800">Order Details</div>
          <ul className="grid gap-3 bg-gray-100 p-4 rounded-lg">
            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
              ? orderDetails?.cartItems.map((item) => (
                  <li className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm">
                    <span className="text-gray-700">Title: {item.title}</span>
                    <span className="text-gray-700">Quantity: {item.quantity}</span>
                    <span className="text-gray-700">Price: ${item.price}</span>
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div className="grid gap-4">
          {/* Shipping Info */}
          <div className="font-medium text-gray-800">Shipping Info</div>
          <div className="grid gap-0.5 text-muted-foreground bg-gray-50 p-4 rounded-lg">
            <span className="text-gray-700">{user.userName}</span>
            <span className="text-gray-700">{orderDetails?.addressInfo?.address}</span>
            <span className="text-gray-700">{orderDetails?.addressInfo?.city}</span>
            <span className="text-gray-700">{orderDetails?.addressInfo?.pincode}</span>
            <span className="text-gray-700">{orderDetails?.addressInfo?.phone}</span>
            <span className="text-gray-700">{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>

        {/* Update Order Status Form */}
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText="Update Order Status"
            onSubmit={handleUpdateStatus}
            buttonClass="bg-blue-600 text-white hover:bg-blue-700 rounded-lg py-2 px-4 mt-4"
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
