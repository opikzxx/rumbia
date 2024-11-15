const getInitialData = () => [
  {
    id: 1,
    name: "Product 1",
    description: "Deskripsi Produk 1",
    sku: "SKU-001",
    variations: [
      { name: "Variasi 1", sku: "SKU-001-001", price: "Rp 110.000" },
      { name: "Variasi 2", sku: "SKU-001-002", price: "Rp 120.000" },
      { name: "Variasi 3", sku: "SKU-001-003", price: "Rp 130.000" },
    ],
  },
  {
    id: 2,
    name: "Product 2",
    description: "Deskripsi Produk 2",
    sku: "SKU-002",
    variations: [
      { name: "Variasi 1", sku: "SKU-002-001", price: "Rp 210.000" },
      { name: "Variasi 2", sku: "SKU-002-002", price: "Rp 220.000" },
    ],
  },
  {
    id: 3,
    name: "Product 3",
    description: "Deskripsi Produk 3",
    sku: "SKU-003",
    variations: [
      { name: "Variasi 1", sku: "SKU-003-001", price: "Rp 310.000" },
      { name: "Variasi 2", sku: "SKU-003-002", price: "Rp 320.000" },
    ],
  },
];

export { getInitialData };
