
export interface Trip {
  id: string;
  type: "EXPRESS" | "STANDARD"; 
  serviceType: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  distance: number;
  action: "PICKUP" | "COLLECT" | "DROP";
  estimatedWeight?: number;
  studioName?: string;
  studioPhone?: string;
  studioAddress?: string;
  status?: "PICKUP" | "DROP" | "COMPLETED";
  items?: {
    category: string;
    name: string;
    quantity: number;
  }[];
}

export const trips: Trip[] = [
  {
    id: "EXP-5678",
    type: "EXPRESS",
    serviceType: "Express Wash & Iron",
    customerName: "Priya Patel",
    phoneNumber: "+91 9865432109",
    address: "Flat 203, Sapphire Heights, Gachibowli, Hyderabad, Telangana",
    distance: 5.1,
    action: "PICKUP",
    status: "PICKUP",
    estimatedWeight: 3.2,
    items: [
      { category: "Upper Wear", name: "T-Shirt", quantity: 4 },
      { category: "Bottom Wear", name: "Shorts", quantity: 3 }
    ]
  },
  {
    id: "STD-4321",
    type: "STANDARD",
    serviceType: "Standard Wash & Press",
    customerName: "Rahul Sharma",
    phoneNumber: "+91 9876123456",
    address: "202, Lotus Apartments, Madhapur, Hyderabad, Telangana",
    distance: 3.8,
    action: "PICKUP",
    status: "PICKUP",
    estimatedWeight: 2.5,
    items: [
      { category: "Upper Wear", name: "Shirts", quantity: 3 },
      { category: "Bottom Wear", name: "Trousers", quantity: 2 },
      { category: "Upper Wear", name: "T-Shirts", quantity: 2 }
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
    action: "COLLECT",
    status: "PICKUP",
    studioName: "Clean Express Studio",
    studioPhone: "+91 9876543214",
    studioAddress: "Shop 23, MG Road, Secunderabad, Hyderabad, Telangana",
    estimatedWeight: 1.5,
    items: [
      { category: "Upper Wear", name: "Blouse", quantity: 2 },
      { category: "Bottom Wear", name: "Saree", quantity: 1 }
    ]
  },
  {
    id: "EXP-9012",
    type: "EXPRESS",
    serviceType: "Express Dry Clean & Press",
    customerName: "Vikram Malhotra",
    phoneNumber: "+91 9876123450",
    address: "Villa 8, Cyber Pearl Colony, Hitec City, Hyderabad, Telangana",
    distance: 2.9,
    action: "COLLECT",
    status: "PICKUP",
    studioName: "Royal Dry Clean Studio",
    studioPhone: "+91 9871234567",
    studioAddress: "Plot 45, Jubilee Hills, Hyderabad, Telangana",
    estimatedWeight: 2.0,
    items: [
      { category: "Upper Wear", name: "Formal Shirt", quantity: 2 },
      { category: "Bottom Wear", name: "Trousers", quantity: 1 }
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
    action: "PICKUP",
    status: "PICKUP",
    estimatedWeight: 2.7,
    items: [
      { category: "Upper Wear", name: "Formal Shirt", quantity: 2 },
      { category: "Bottom Wear", name: "Formal Pants", quantity: 2 },
      { category: "Upper Wear", name: "Suit", quantity: 1 }
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
    action: "COLLECT",
    status: "PICKUP",
    studioName: "Sparkling Clean Studio",
    studioPhone: "+91 9876543214",
    studioAddress: "Madhapur, Hyderabad, India",
    estimatedWeight: 10.0,
    items: [
      { category: "Upper Wear", name: "T-Shirt", quantity: 8 },
      { category: "Bottom Wear", name: "Jeans", quantity: 5 },
      { category: "Upper Wear", name: "Shirt", quantity: 7 },
      { category: "Bottom Wear", name: "Shorts", quantity: 4 },
      { category: "Shoe Cleaning", name: "Sneakers", quantity: 3 }
    ]
  },
  {
    id: "STD-3456",
    type: "STANDARD",
    serviceType: "Standard Ironing",
    customerName: "Neha Kapoor",
    phoneNumber: "+91 9876543219",
    address: "Flat 405, Sunshine Apartments, Banjara Hills, Hyderabad, Telangana",
    distance: 6.3,
    action: "COLLECT",
    status: "PICKUP",
    studioName: "Fresh Iron Studio",
    studioPhone: "+91 9888765432",
    studioAddress: "Shop 34, Ameerpet, Hyderabad, Telangana",
    estimatedWeight: 3.5,
    items: [
      { category: "Upper Wear", name: "Formal Shirt", quantity: 4 },
      { category: "Bottom Wear", name: "Trousers", quantity: 3 },
      { category: "Upper Wear", name: "Blouse", quantity: 2 }
    ]
  }
];
