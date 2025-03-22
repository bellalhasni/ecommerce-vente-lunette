export const registerFormControls = [
  {
    name: "userName",
    label: "Nom d'utilisateur",
    placeholder: "Entrez votre nom d'utilisateur",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Entrez votre email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mot de passe",
    placeholder: "Entrez votre mot de passe",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Entrez votre email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mot de passe",
    placeholder: "Entrez votre mot de passe",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Titre",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Entrez le titre du produit",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Entrez la description du produit",
  },
  {
    label: "Catégorie",
    name: "category",
    componentType: "select",
    options: [
      { id: "sun-glasses", label: "Lunettes de soleil" },
      { id: "optical-glasses", label: "Lunettes de vue" },
      { id: "kids-glasses", label: "Lunettes pour enfants" },
      { id: "accessories", label: "Accessoires" },
    ],
  },
  {
    label: "Marque",
    name: "brand",
    componentType: "select",
    options: [
      { id: "rayban", label: "Ray-Ban" },
      { id: "oakley", label: "Oakley" },
      { id: "prada", label: "Prada" },
      { id: "gucci", label: "Gucci" },
      { id: "cartier", label: "Cartier" },
    ],
  },
  {
    label: "Prix",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Entrez le prix du produit",
  },
  {
    label: "Prix promotionnel",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Entrez le prix promotionnel (facultatif)",
  },
  {
    label: "Stock total",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Entrez le stock total",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Accueil",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Produits",
    path: "/shop/listing",
  },
  {
    id: "sun-glasses",
    label: "Lunettes de soleil",
    path: "/shop/listing",
  },
  {
    id: "optical-glasses",
    label: "Lunettes de vue",
    path: "/shop/listing",
  },
  {
    id: "kids-glasses",
    label: "Lunettes pour enfants",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessoires",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Rechercher",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  "sun-glasses": "Lunettes de soleil",
  "optical-glasses": "Lunettes de vue",
  "kids-glasses": "Lunettes pour enfants",
  accessories: "Accessoires",
};

export const brandOptionsMap = {
  rayban: "Ray-Ban",
  oakley: "Oakley",
  prada: "Prada",
  gucci: "Gucci",
  cartier: "Cartier",
};

export const filterOptions = {
  category: [
    { id: "sun-glasses", label: "Lunettes de soleil" },
    { id: "optical-glasses", label: "Lunettes de vue" },
    { id: "kids-glasses", label: "Lunettes pour enfants" },
    { id: "accessories", label: "Accessoires" },
  ],
  brand: [
    { id: "rayban", label: "Ray-Ban" },
    { id: "oakley", label: "Oakley" },
    { id: "prada", label: "Prada" },
    { id: "gucci", label: "Gucci" },
    { id: "cartier", label: "Cartier" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Prix : Du plus bas au plus élevé" },
  { id: "price-hightolow", label: "Prix : Du plus élevé au plus bas" },
  { id: "title-atoz", label: "Titre : A à Z" },
  { id: "title-ztoa", label: "Titre : Z à A" },
];

export const addressFormControls = [
  {
    label: "Adresse",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Entrez votre adresse",
  },
  {
    label: "Ville",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Entrez votre ville",
  },
  {
    label: "Code postal",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Entrez votre code postal",
  },
  {
    label: "Téléphone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Entrez votre numéro de téléphone",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Entrez des notes supplémentaires",
  },
];
