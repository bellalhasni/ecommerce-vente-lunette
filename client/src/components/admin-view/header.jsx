import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 border-b shadow-md">
      {/* Bouton pour basculer le menu (affiché sur petits écrans) */}
      <Button
        onClick={() => setOpen(true)}
        className="lg:hidden sm:block bg-white text-blue-500 hover:bg-blue-100 focus:ring focus:ring-blue-200 rounded-full p-2"
      >
        <AlignJustify className="w-6 h-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Bouton de déconnexion */}
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-5 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition duration-200 shadow-lg focus:ring focus:ring-red-300"
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
