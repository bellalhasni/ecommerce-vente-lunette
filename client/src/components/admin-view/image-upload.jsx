import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        alert("Veuillez sélectionner un fichier image valide.");
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("La taille maximale autorisée est de 5 Mo.");
        return;
      }
      setImageFile(selectedFile);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      if (!droppedFile.type.startsWith("image/")) {
        alert("Veuillez déposer un fichier image valide.");
        return;
      }
      if (droppedFile.size > 5 * 1024 * 1024) {
        alert("La taille maximale autorisée est de 5 Mo.");
        return;
      }
      setImageFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    try {
      setImageLoadingState(true);
      const data = new FormData();
      data.append("my_file", imageFile);
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );

      if (response?.data?.success) {
        setUploadedImageUrl(response.data.result.url);
      } else {
        alert("Échec du téléchargement de l'image.");
      }
    } catch (error) {
      console.error("Erreur lors du téléchargement :", error);
      alert("Une erreur s'est produite lors du téléchargement de l'image.");
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block text-indigo-700">
        Téléchargez une image
      </Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4 transition-all bg-gradient-to-r from-indigo-50 to-purple-100 hover:from-indigo-100 hover:to-purple-200`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer text-indigo-600 hover:text-indigo-800`}
          >
            <UploadCloudIcon className="w-10 h-10 mb-2" />
            <span>Glissez-déposez ou cliquez pour télécharger une image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-200 animate-pulse" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-indigo-500 mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Supprimer le fichier</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
