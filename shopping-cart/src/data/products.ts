export interface Product {
id: number;
title: string;
price: number;
description: string;
category: string;
image: string;
rating?: { rate: number; count: number };
}

export async function getProducts(): Promise<Product[]> {
try {
const res = await fetch("https://fakestoreapi.com/products");
if (!res.ok) throw new Error("Failed network");
const data = (await res.json()) as Product[];
return data;
} catch (err) {
console.warn("Falling back to sample products:", err);
// Minimal fallback so the UI still works offline
return [
{
id: 1,
title: "Sample Backpack",
price: 39.99,
description: "Sturdy backpack for daily use.",
category: "men's clothing",
image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
},
{
id: 2,
title: "Sample T-Shirt",
price: 14.99,
description: "Soft cotton tee.",
category: "men's clothing",
image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg",
},
{
id: 3,
title: "Sample Ring",
price: 299.99,
description: "Stylish gold ring.",
category: "jewelery",
image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
},
{
id: 4,
title: "Sample HDD",
price: 64.99,
description: "Reliable 1TB external HDD.",
category: "electronics",
image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
},
];
}
}