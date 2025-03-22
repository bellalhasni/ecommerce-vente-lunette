import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  console.log(orderDetails, "orderList");

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  return (
    <Card className="bg-white shadow-lg rounded-lg">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-xl font-bold text-gray-800">All Orders</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Order ID</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Order Date</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Order Status</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Order Price</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem._id} className="hover:bg-gray-50">
                    <TableCell className="px-4 py-2 text-sm text-gray-800">{orderItem?._id}</TableCell>
                    <TableCell className="px-4 py-2 text-sm text-gray-800">{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell className="px-4 py-2 text-sm text-gray-800">
                      <Badge
                        className={`py-1 px-3 text-white rounded-full ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-gray-500"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-2 text-sm text-gray-800">${orderItem?.totalAmount}</TableCell>
                    <TableCell className="px-4 py-2 text-sm text-gray-800">
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        {orderDetails && <AdminOrderDetailsView orderDetails={orderDetails} />}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : (
                <TableRow>
                  <TableCell colSpan={5} className="px-4 py-2 text-center text-sm text-gray-500">No orders found</TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
