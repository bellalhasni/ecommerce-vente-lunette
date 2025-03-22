import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex flex-col gap-6">
      {adminSidebarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            if (setOpen) setOpen(false);
          }}
          className="flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-lg font-medium text-gray-800 transition-all duration-200 hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:text-white"
        >
          <span className="p-2 rounded-full bg-gray-200">{menuItem.icon}</span>
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg"
        >
          <div className="flex flex-col h-full text-white">
            <SheetHeader className="border-b border-gray-700 pb-4">
              <SheetTitle className="flex gap-3 mt-5 items-center">
                <h1 className="text-2xl font-extrabold">Ecommerce</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-lg">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-3 p-6"
        >
          <ChartNoAxesCombined size={36} className="text-secondary" />
          <h1 className="text-2xl font-extrabold">Ecommerce</h1>
        </div>
        <hr className="border-gray-700" />
        <MenuItems />
        <div className="mt-auto p-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()}  All rights reserved
          </p>
        </div>
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
