import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Globe, GraduationCap, ArrowLeft, Video, Phone, MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { doctors, generateSlots } from "@/lib/mock-data";

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const doctor = doctors.find((d) => d.id === id);

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

  return (
    <div className="py-8">
      <div className="container max-w-4xl">
        <Link to="/doctors" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to doctors
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 md:p-8 bg-primary/5">
            <div className="flex flex-col sm:flex-row gap-6">
              <img src={doctor.avatar} alt={doctor.name} className="w-28 h-28 rounded-2xl object-cover ring-4 ring-card shadow-lg" />
              <div className="flex-1">
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{doctor.name}</h1>
                <p className="text-primary font-medium text-lg">{doctor.specialization}</p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{doctor.experience} years experience</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-warning fill-warning" />{doctor.rating} ({doctor.reviewCount} reviews)</span>
                  <span className="flex items-center gap-1"><Globe className="w-4 h-4" />{doctor.languages.join(", ")}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="outline"><Video className="w-3 h-3 mr-1" />Video</Badge>
                  <Badge variant="outline"><Phone className="w-3 h-3 mr-1" />Audio</Badge>
                  <Badge variant="outline"><MessageSquare className="w-3 h-3 mr-1" />Chat</Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Consultation Fee</p>
                <p className="text-3xl font-heading font-bold text-foreground">₹{doctor.fee}</p>
                <Link to={`/book/${doctor.id}`}>
                  <Button className="mt-3 w-full">Book Now</Button>
                </Link>
              </div>
            </div>
          </div>

          <Separator />

          {/* About */}
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-2">About</h2>
              <p className="text-muted-foreground leading-relaxed">{doctor.about}</p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
                <GraduationCap className="w-5 h-5 inline mr-2" />Education
              </h2>
              <ul className="space-y-1">
                {doctor.education.map((ed) => (
                  <li key={ed} className="text-muted-foreground text-sm">• {ed}</li>
                ))}
              </ul>
            </div>

            {/* Availability Preview */}
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                <Calendar className="w-5 h-5 inline mr-2" />Today's Availability
              </h2>
              {availableSlots.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {availableSlots.map((slot) => (
                    <Link key={slot.id} to={`/book/${doctor.id}?slot=${slot.id}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-2 px-3">
                        {slot.time}
                      </Badge>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No slots available today. Next available: {doctor.nextAvailable}</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
