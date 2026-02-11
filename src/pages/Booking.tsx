import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Video, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { doctors, generateSlots } from "@/lib/mock-data";
import { toast } from "sonner";

type ConsultType = "Video" | "Audio" | "Chat";

export default function Booking() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === doctorId);

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [consultType, setConsultType] = useState<ConsultType>("Video");
  const [confirmed, setConfirmed] = useState(false);

  if (!doctor) {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg text-muted-foreground">Doctor not found.</p>
        <Link to="/doctors"><Button variant="link">Back to doctors</Button></Link>
      </div>
    );
  }

  const slots = generateSlots(doctor.id);
  const availableSlots = slots.filter((s) => !s.isBooked);

  const handleConfirm = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot");
      return;
    }
    setConfirmed(true);
    toast.success("Consultation booked successfully!");
  };

  const selectedSlotData = slots.find((s) => s.id === selectedSlot);

  if (confirmed) {
    return (
      <div className="py-16">
        <div className="container max-w-lg text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}>
            <CheckCircle className="w-20 h-20 text-success mx-auto" />
          </motion.div>
          <h1 className="font-heading text-3xl font-bold text-foreground mt-6">Booking Confirmed!</h1>
          <p className="text-muted-foreground mt-2">Your consultation has been scheduled.</p>

          <div className="glass-card rounded-xl p-6 mt-8 text-left space-y-3">
            <div className="flex items-center gap-4">
              <img src={doctor.avatar} alt={doctor.name} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <p className="font-heading font-semibold text-foreground">{doctor.name}</p>
                <p className="text-sm text-primary">{doctor.specialization}</p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-muted-foreground">Date:</span> <span className="text-foreground font-medium">{selectedSlotData?.date}</span></div>
              <div><span className="text-muted-foreground">Time:</span> <span className="text-foreground font-medium">{selectedSlotData?.time}</span></div>
              <div><span className="text-muted-foreground">Type:</span> <span className="text-foreground font-medium">{consultType}</span></div>
              <div><span className="text-muted-foreground">Fee:</span> <span className="text-foreground font-medium">₹{doctor.fee}</span></div>
            </div>
          </div>

          <div className="flex gap-3 justify-center mt-8">
            <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
            <Button variant="outline" onClick={() => navigate("/doctors")}>Browse Doctors</Button>
          </div>
        </div>
      </div>
    );
  }

  const typeOptions: { type: ConsultType; icon: typeof Video; label: string }[] = [
    { type: "Video", icon: Video, label: "Video Call" },
    { type: "Audio", icon: Phone, label: "Audio Call" },
    { type: "Chat", icon: MessageSquare, label: "Chat" },
  ];

  return (
    <div className="py-8">
      <div className="container max-w-3xl">
        <Link to={`/doctor/${doctor.id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to profile
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Book Consultation</h1>

          {/* Doctor Summary */}
          <div className="glass-card rounded-xl p-5 mt-6 flex items-center gap-4">
            <img src={doctor.avatar} alt={doctor.name} className="w-16 h-16 rounded-xl object-cover ring-2 ring-border" />
            <div className="flex-1">
              <h2 className="font-heading font-semibold text-foreground">{doctor.name}</h2>
              <p className="text-sm text-primary">{doctor.specialization}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Fee</p>
              <p className="text-2xl font-heading font-bold text-foreground">₹{doctor.fee}</p>
            </div>
          </div>

          {/* Consultation Type */}
          <div className="mt-8">
            <h3 className="font-heading font-semibold text-foreground mb-3">Consultation Type</h3>
            <div className="grid grid-cols-3 gap-3">
              {typeOptions.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => setConsultType(type)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    consultType === type
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <Icon className={`w-6 h-6 ${consultType === type ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-sm font-medium ${consultType === type ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="mt-8">
            <h3 className="font-heading font-semibold text-foreground mb-1">
              <Calendar className="w-5 h-5 inline mr-2" />Select Time Slot
            </h3>
            <p className="text-sm text-muted-foreground mb-3">Today, {new Date().toLocaleDateString()}</p>

            {availableSlots.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`py-3 px-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedSlot === slot.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 mx-auto mb-1" />
                    {slot.time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No available slots today.</p>
            )}
          </div>

          {/* Confirm */}
          <div className="mt-8 flex justify-end gap-3">
            <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button onClick={handleConfirm} disabled={!selectedSlot} size="lg">
              Confirm Booking — ₹{doctor.fee}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
