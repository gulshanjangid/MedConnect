export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  reviewCount: number;
  fee: number;
  avatar: string;
  languages: string[];
  about: string;
  education: string[];
  availableToday: boolean;
  nextAvailable: string;
}

export interface AvailabilitySlot {
  id: string;
  doctorId: string;
  date: string;
  time: string;
  isBooked: boolean;
}

export interface Consultation {
  id: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorAvatar: string;
  date: string;
  time: string;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "PRESCRIPTION_ISSUED" | "CANCELLED";
  type: "Video" | "Audio" | "Chat";
  notes?: string;
}

export interface Prescription {
  id: string;
  consultationId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medications: { name: string; dosage: string; duration: string; instructions: string }[];
}

export const doctors: Doctor[] = [
  {
    id: "d1",
    name: "Dr. Priya Sharma",
    specialization: "Ayurvedic Medicine",
    experience: 12,
    rating: 4.9,
    reviewCount: 342,
    fee: 800,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    languages: ["English", "Hindi"],
    about: "Dr. Priya Sharma is a renowned Ayurvedic practitioner with over 12 years of experience in treating chronic conditions through holistic approaches. She specializes in panchakarma therapy and herbal medicine.",
    education: ["BAMS - Gujarat Ayurved University", "MD Ayurveda - BHU Varanasi"],
    availableToday: true,
    nextAvailable: "Today, 3:00 PM",
  },
  {
    id: "d2",
    name: "Dr. Rajesh Patel",
    specialization: "General Physician",
    experience: 15,
    rating: 4.8,
    reviewCount: 520,
    fee: 600,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    languages: ["English", "Hindi", "Gujarati"],
    about: "Dr. Rajesh Patel brings 15 years of clinical experience in general medicine. He is known for his patient-centric approach and expertise in managing lifestyle diseases.",
    education: ["MBBS - AIIMS Delhi", "MD Internal Medicine - PGIMER"],
    availableToday: true,
    nextAvailable: "Today, 5:30 PM",
  },
  {
    id: "d3",
    name: "Dr. Anita Desai",
    specialization: "Dermatology",
    experience: 8,
    rating: 4.7,
    reviewCount: 198,
    fee: 1000,
    avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964d31f?w=200&h=200&fit=crop&crop=face",
    languages: ["English", "Hindi", "Marathi"],
    about: "Dr. Anita Desai is a board-certified dermatologist specializing in both medical and cosmetic dermatology with a focus on ayurvedic skin treatments.",
    education: ["MBBS - KEM Mumbai", "MD Dermatology - JIPMER"],
    availableToday: false,
    nextAvailable: "Tomorrow, 10:00 AM",
  },
  {
    id: "d4",
    name: "Dr. Vikram Singh",
    specialization: "Orthopedics",
    experience: 20,
    rating: 4.9,
    reviewCount: 680,
    fee: 1200,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
    languages: ["English", "Hindi", "Punjabi"],
    about: "Dr. Vikram Singh is an acclaimed orthopedic specialist with two decades of experience in joint replacement and sports medicine.",
    education: ["MBBS - AIIMS Delhi", "MS Orthopedics - CMC Vellore"],
    availableToday: true,
    nextAvailable: "Today, 4:00 PM",
  },
  {
    id: "d5",
    name: "Dr. Meera Krishnan",
    specialization: "Pediatrics",
    experience: 10,
    rating: 4.8,
    reviewCount: 415,
    fee: 700,
    avatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&h=200&fit=crop&crop=face",
    languages: ["English", "Tamil", "Hindi"],
    about: "Dr. Meera Krishnan is a compassionate pediatrician dedicated to holistic child healthcare, combining modern medicine with traditional wellness practices.",
    education: ["MBBS - Madras Medical College", "MD Pediatrics - NIMHANS"],
    availableToday: false,
    nextAvailable: "Tomorrow, 11:30 AM",
  },
  {
    id: "d6",
    name: "Dr. Arjun Reddy",
    specialization: "Cardiology",
    experience: 18,
    rating: 4.9,
    reviewCount: 590,
    fee: 1500,
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
    languages: ["English", "Telugu", "Hindi"],
    about: "Dr. Arjun Reddy is a leading cardiologist with expertise in interventional cardiology and preventive heart care.",
    education: ["MBBS - Osmania Medical College", "DM Cardiology - AIIMS"],
    availableToday: true,
    nextAvailable: "Today, 6:00 PM",
  },
];

export const generateSlots = (doctorId: string): AvailabilitySlot[] => {
  const times = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"];
  const today = new Date();
  return times.map((time, i) => ({
    id: `${doctorId}-slot-${i}`,
    doctorId,
    date: today.toISOString().split("T")[0],
    time,
    isBooked: Math.random() > 0.7,
  }));
};

export const consultations: Consultation[] = [
  {
    id: "c1",
    doctorName: "Dr. Priya Sharma",
    doctorSpecialization: "Ayurvedic Medicine",
    doctorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    date: "2026-02-12",
    time: "3:00 PM",
    status: "SCHEDULED",
    type: "Video",
  },
  {
    id: "c2",
    doctorName: "Dr. Rajesh Patel",
    doctorSpecialization: "General Physician",
    doctorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    date: "2026-02-10",
    time: "11:00 AM",
    status: "COMPLETED",
    type: "Video",
    notes: "Follow-up in 2 weeks. Blood tests recommended.",
  },
  {
    id: "c3",
    doctorName: "Dr. Vikram Singh",
    doctorSpecialization: "Orthopedics",
    doctorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
    date: "2026-02-08",
    time: "4:00 PM",
    status: "PRESCRIPTION_ISSUED",
    type: "Audio",
    notes: "X-ray review completed. Physical therapy recommended.",
  },
  {
    id: "c4",
    doctorName: "Dr. Anita Desai",
    doctorSpecialization: "Dermatology",
    doctorAvatar: "https://images.unsplash.com/photo-1594824476967-48c8b964d31f?w=200&h=200&fit=crop&crop=face",
    date: "2026-01-25",
    time: "10:00 AM",
    status: "CANCELLED",
    type: "Chat",
  },
];

export const prescriptions: Prescription[] = [
  {
    id: "p1",
    consultationId: "c3",
    doctorName: "Dr. Vikram Singh",
    date: "2026-02-08",
    diagnosis: "Mild lumbar strain with muscle spasm",
    medications: [
      { name: "Ibuprofen 400mg", dosage: "1 tablet", duration: "7 days", instructions: "After meals, twice daily" },
      { name: "Muscle relaxant (Thiocolchicoside)", dosage: "4mg", duration: "5 days", instructions: "Before bed" },
      { name: "Calcium + Vitamin D3", dosage: "1 tablet", duration: "30 days", instructions: "After breakfast" },
    ],
  },
];

export const specializations = [
  "All",
  "Ayurvedic Medicine",
  "General Physician",
  "Dermatology",
  "Orthopedics",
  "Pediatrics",
  "Cardiology",
  "Neurology",
  "Gynecology",
];
