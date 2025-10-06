export const mockUser = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  bio: "Digital enthusiast and avid online shopper. Love discovering new brands and unique products!",
  emailVerified: true,
  image: "/avatar-placeholder.jpg",
  role: "USER",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-12-01"),
};

export const mockAddresses = [
  {
    id: "1",
    title: "Home",
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    postalCode: "94105",
    country: "United States",
    isDefault: true,
  },
  {
    id: "2",
    title: "Work",
    street: "456 Office Park",
    city: "San Francisco",
    state: "CA",
    postalCode: "94107",
    country: "United States",
    isDefault: false,
  },
];
