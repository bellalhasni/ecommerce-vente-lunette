import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500">
      {/* Section unique : Texte et Formulaire */}
      <div className="flex flex-col items-center justify-center w-full px-4 py-12 sm:px-6 lg:px-8">
        {/* Titre principal */}
        <div className="max-w-md space-y-6 text-center text-white">
          <h1 className="text-4xl font-extrabold tracking-tight">
            Bienvenue sur notre plateforme de shopping en ligne
          </h1>
          <p className="text-lg font-medium mt-4">
            Découvrez et achetez vos produits préférés facilement et en toute sécurité.
          </p>
        </div>

        {/* Formulaire (outlet pour afficher le contenu dynamique) */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
