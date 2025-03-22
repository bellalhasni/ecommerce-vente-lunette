import React, { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";

const initialAddressFormData = {
  address: "",
  phone: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  const maxAddresses = 3;

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= maxAddresses && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: `Vous pouvez enregistrer au maximum ${maxAddresses} adresses.`,
        variant: "destructive",
      });

      return;
    }

    const action = currentEditedId
      ? editaAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      : addNewAddress({
          ...formData,
          userId: user?.id,
        });

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setFormData(initialAddressFormData);
        setCurrentEditedId(null);
        toast({
          title: `Adresse ${currentEditedId ? "mise à jour" : "ajoutée"} avec succès !`,
        });
      }
    });
  }

  function handleDeleteAddress(addressId) {
    dispatch(deleteAddress({ userId: user?.id, addressId })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({ title: "Adresse supprimée avec succès !" });
      }
    });
  }

  function handleEditAddress(address) {
    setCurrentEditedId(address?._id);
    setFormData({
      address: address?.address || "",
      phone: address?.phone || "",
    });
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  return (
    <div className="space-y-8 p-4 lg:p-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* En-tête */}
      <header className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">Gérer mes adresses</h1>
        <p className="text-blue-500 mt-2">
          Ajoutez ou modifiez vos adresses et numéros de téléphone.
        </p>
      </header>

      {/* Liste des adresses */}
      <Card className="shadow-md border border-blue-200">
        <CardHeader className="bg-blue-100">
          <CardTitle className="text-xl font-semibold text-blue-600">
            Adresses enregistrées
          </CardTitle>
        </CardHeader>
        <CardContent>
          {addressList && addressList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {addressList.map((address) => (
                <AddressCard
                  key={address._id}
                  addressInfo={address}
                  selectedId={selectedId}
                  setCurrentSelectedAddress={setCurrentSelectedAddress}
                  handleEditAddress={handleEditAddress}
                  handleDeleteAddress={() => handleDeleteAddress(address._id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              Vous n'avez pas encore ajouté d'adresses.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Ajouter/Modifier une adresse */}
      <Card className="shadow-md border border-blue-200">
        <CardHeader className="bg-blue-100">
          <CardTitle className="text-xl font-semibold text-blue-600">
            {currentEditedId ? "Modifier une adresse" : "Ajouter une nouvelle adresse"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CommonForm
            formControls={[
              { name: "address", label: "Adresse", type: "text", placeholder: "Votre adresse" },
              { name: "phone", label: "Numéro de téléphone", type: "tel", placeholder: "Votre numéro" },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId ? "Enregistrer les modifications" : "Ajouter l'adresse"}
            onSubmit={handleManageAddress}
            isBtnDisabled={
              !Object.values(formData).every((value) => value.trim() !== "")
            }
          />
        </CardContent>
      </Card>

      {/* Pied de page */}
      <footer className="text-center text-sm text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} Votre entreprise. Tous droits réservés.
      </footer>
    </div>
  );
}

export default Address;
