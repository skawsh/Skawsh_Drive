
export interface Trip {
  id: string;
  type: "EXPRESS" | "STANDARD"; 
  serviceType: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  distance: number;
  estimatedWeight?: number;
  items?: {
    category: string;
    name: string;
    quantity: number;
  }[];
}

export const trips: Trip[] = [
  {
    id: "EXP-1234",
    type: "EXPRESS",
    serviceType: "Express Wash",
    customerName: "Rahul Sharma",
    phoneNumber: "+91 9876543210",
    address: "Plot 42, Hitech City Road, Madhapur, Hyderabad, Telangana",
    distance: 3.2,
    estimatedWeight: 4.5,
    items: [
      { category: "Upper Wear", name: "Shirt", quantity: 3 },
      { category: "Bottom Wear", name: "Jeans", quantity: 2 },
      { category: "Shoe Cleaning", name: "Sneakers", quantity: 1 }
    ]
  },
  {
    id: "EXP-5678",
    type: "EXPRESS",
    serviceType: "Express Wash & Iron",
    customerName: "Priya Patel",
    phoneNumber: "+91 9865432109",
    address: "Flat 203, Sapphire Heights, Gachibowli, Hyderabad, Telangana",
    distance: 5.1,
    estimatedWeight: 3.2,
    items: [
      { category: "Upper Wear", name: "T-Shirt", quantity: 4 },
      { category: "Bottom Wear", name: "Shorts", quantity: 3 }
    ]
  },
  {
    id: "STD-4567",
    type: "STANDARD",
    serviceType: "Standard Wash",
    customerName: "Sparkle Laundry",
    phoneNumber: "+91 9812345670",
    address: "Shop No. 7, Ameerpet Main Road, Ameerpet, Hyderabad, Telangana",
    distance: 7.5,
    estimatedWeight: 8.0,
    items: [
      { category: "Upper Wear", name: "Shirt", quantity: 5 },
      { category: "Bottom Wear", name: "Pants", quantity: 4 },
      { category: "Upper Wear", name: "T-Shirt", quantity: 6 },
      { category: "Shoe Cleaning", name: "Formal Shoes", quantity: 2 }
    ]
  },
  {
    id: "STD-8901",
    type: "STANDARD",
    serviceType: "Standard Dry Clean",
    customerName: "Aarav Reddy",
    phoneNumber: "+91 9854321076",
    address: "Villa 15, Jubilee Hills Road No. 10, Jubilee Hills, Hyderabad, Telangana",
    distance: 9.3,
    estimatedWeight: 2.7,
    items: [
      { category: "Upper Wear", name: "Formal Shirt", quantity: 2 },
      { category: "Bottom Wear", name: "Formal Pants", quantity: 2 },
      { category: "Upper Wear", name: "Suit", quantity: 1 }
    ]
  },
  {
    id: "EXP-2345",
    type: "EXPRESS",
    serviceType: "Express Dry Clean",
    customerName: "Ananya Singh",
    phoneNumber: "+91 9843210965",
    address: "Apartment 506, Green Valley Apartments, Kondapur, Hyderabad, Telangana",
    distance: 4.8,
    estimatedWeight: 1.5,
    items: [
      { category: "Upper Wear", name: "Blouse", quantity: 2 },
      { category: "Bottom Wear", name: "Saree", quantity: 1 }
    ]
  },
  {
    id: "STD-6789",
    type: "STANDARD",
    serviceType: "Standard Wash & Iron",
    customerName: "Quick Laundry Services",
    phoneNumber: "+91 9832109654",
    address: "Shop 12, KPHB Colony Main Road, Kukatpally, Hyderabad, Telangana",
    distance: 12.6,
    estimatedWeight: 10.0,
    items: [
      { category: "Upper Wear", name: "T-Shirt", quantity: 8 },
      { category: "Bottom Wear", name: "Jeans", quantity: 5 },
      { category: "Upper Wear", name: "Shirt", quantity: 7 },
      { category: "Bottom Wear", name: "Shorts", quantity: 4 },
      { category: "Shoe Cleaning", name: "Sneakers", quantity: 3 }
    ]
  }
];
