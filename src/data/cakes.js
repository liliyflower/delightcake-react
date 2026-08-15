
export const categories = [
  {
    slug: "chocolate",
    name: "Chocolate Cakes",
    tagline: "Smooth chocolate ganache, finished with silky chocolate frosting.",
    cover: "/images/choC2.jpg",
  },
  {
    slug: "strawberry",
    name: "Strawberry Cakes",
    tagline: "Layers of fresh strawberry sponge and light cream.",
    cover: "/images/strbC1.jpg",
  },
  {
    slug: "vanilla",
    name: "Vanilla Cakes",
    tagline: "Classic vanilla bean sponge, simple and timeless.",
    cover: "/images/vani0.jpg",
  },
  {
    slug: "cupcake",
    name: "Cupcakes",
    tagline: "Bite-sized treats, perfect for parties and favors.",
    cover: "/images/cupC1.jpg",
  },
  {
    slug: "wedding",
    name: "Wedding Cakes",
    tagline: "Elegant tiered cakes designed around your big day.",
    cover: "/images/weddingC1.jpg",
  },
  {
    slug: "macaron",
    name: "Macaron Cakes",
    tagline: "Delicate macaron shells with a light, chewy center.",
    cover: "/images/MacaronC1.jpg",
  },
];

export const cakes = [
  // Chocolate
  { id: "cho-001", category: "chocolate", name: "Chocolate A001", price: 35, image: "/images/choC2.jpg" },
  { id: "cho-002", category: "chocolate", name: "Chocolate A002", price: 45, image: "/images/choC1.jpg" },
  { id: "cho-003", category: "chocolate", name: "Chocolate A003", price: 50, image: "/images/IMG_4038.jpg" },
  { id: "cho-004", category: "chocolate", name: "Chocolate A004", price: 60, image: "/images/IMG_4039.jpg" },
  { id: "cho-005", category: "chocolate", name: "Chocolate A005", price: 125, image: "/images/IMG_4040.jpg" },
  { id: "cho-006", category: "chocolate", name: "Chocolate A006", price: 100, image: "/images/IMG_4041.jpg" },

  // Strawberry
  { id: "str-001", category: "strawberry", name: "Strawberry B001", price: 55, image: "/images/strC2.jpg" },
  { id: "str-002", category: "strawberry", name: "Strawberry B002", price: 80, image: "/images/strbC1.jpg" },
  { id: "str-003", category: "strawberry", name: "Strawberry B003", price: 75, image: "/images/IMG_4042.jpg" },
  { id: "str-004", category: "strawberry", name: "Strawberry B004", price: 110, image: "/images/IMG_4044.jpg" },
  { id: "str-005", category: "strawberry", name: "Strawberry B005", price: 132, image: "/images/IMG_4047.jpg" },
  { id: "str-006", category: "strawberry", name: "Strawberry B006", price: 95, image: "/images/IMG_4045.jpg" },

  // Vanilla
  { id: "vani-001", category: "vanilla", name: "Vanilla C001", price: 30, image: "/images/IMG_4049.jpg" },
  { id: "vani-002", category: "vanilla", name: "Vanilla C002", price: 25, image: "/images/IMG_4052.jpg" },
  { id: "vani-003", category: "vanilla", name: "Vanilla C003", price: 45, image: "/images/vani0.jpg" },
  { id: "vani-004", category: "vanilla", name: "Vanilla C004", price: 40, image: "/images/IMG_4050.jpg" },
  { id: "vani-005", category: "vanilla", name: "Vanilla C005", price: 35, image: "/images/IMG_4051.jpg" },
  { id: "vani-006", category: "vanilla", name: "Vanilla C006", price: 55, image: "/images/IMG_4053.jpg" },

  // Cupcake
  { id: "cup-001", category: "cupcake", name: "CupCake D001", price: 20, image: "/images/IMG_4057.jpg" },
  { id: "cup-002", category: "cupcake", name: "CupCake D002", price: 25, image: "/images/IMG_4058.jpg" },
  { id: "cup-003", category: "cupcake", name: "CupCake D003", price: 30, image: "/images/IMG_4059.jpg" },
  { id: "cup-004", category: "cupcake", name: "CupCake D004", price: 35, image: "/images/cupC1.jpg" },
  { id: "cup-005", category: "cupcake", name: "CupCake D005", price: 40, image: "/images/IMG_4060.jpg" },
  { id: "cup-006", category: "cupcake", name: "CupCake D006", price: 45, image: "/images/IMG_4061.jpg" },

  // Wedding
  { id: "wedd-001", category: "wedding", name: "WeddingCake E001", price: 175, image: "/images/pexels-eduraw-30655514.jpg" },
  { id: "wedd-002", category: "wedding", name: "WeddingCake E002", price: 189, image: "/images/pexels-george-sistonen-952755-7248037.jpg" },
  { id: "wedd-003", category: "wedding", name: "WeddingCake E003", price: 199, image: "/images/pexels-jonathanborba-7174717.jpg" },
  { id: "wedd-004", category: "wedding", name: "WeddingCake E004", price: 225, image: "/images/pexels-jonathanborba-9714788.jpg" },
  { id: "wedd-005", category: "wedding", name: "WeddingCake E005", price: 445, image: "/images/weddingC1.jpg" },
  { id: "wedd-006", category: "wedding", name: "WeddingCake E006", price: 366, image: "/images/pexels-marina-ribeiro-decoracoes-1081262752-20609919.jpg" },

  // Macaron
  { id: "maco-001", category: "macaron", name: "MacoronsCake F001", price: 20, image: "/images/pexels-aleson-padilha-945919991-34104109.jpg" },
  { id: "maco-002", category: "macaron", name: "MacoronsCake F002", price: 25, image: "/images/pexels-elizabeth-zambrano-2001874318-31717737.jpg" },
  { id: "maco-003", category: "macaron", name: "MacoronsCake F003", price: 30, image: "/images/pexels-oleksandra-17322936.jpg" },
  { id: "maco-004", category: "macaron", name: "MacoronsCake F004", price: 10, image: "/images/pexels-thesocialsundae-6346166.jpg" },
  { id: "maco-005", category: "macaron", name: "MacoronsCake F005", price: 10, image: "/images/pexels-travel-with-lenses-734723610-32525708.jpg" },
  { id: "maco-006", category: "macaron", name: "MacoronsCake F006", price: 10, image: "/images/MacaronC1.jpg" },
];

export function getCategory(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getCakesByCategory(slug) {
  return cakes.filter((c) => c.category === slug);
}

export function getCakeById(id) {
  return cakes.find((c) => c.id === id);
}
