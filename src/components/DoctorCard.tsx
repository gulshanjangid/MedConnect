import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Globe, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Doctor } from "@/lib/mock-data";

interface DoctorCardProps {
  doctor: Doctor;
  index?: number;
}

export default function DoctorCard({ doctor, index = 0 }: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group glass-card rounded-xl overflow-hidden hover-lift"
    >
      <div className="p-6">
        <div className="flex gap-4">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-20 h-20 rounded-xl object-cover ring-2 ring-border"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg font-semibold text-foreground truncate">
              {doctor.name}
            </h3>
            <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {doctor.experience} yrs
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                {doctor.rating} ({doctor.reviewCount})
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Badge variant="secondary" className="text-xs">
            <Globe className="w-3 h-3 mr-1" />
            {doctor.languages.join(", ")}
          </Badge>
          {doctor.availableToday && (
            <Badge className="text-xs bg-success text-success-foreground">
              Available Today
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            <Video className="w-3 h-3 mr-1" />
            Video Consult
          </Badge>
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Consultation Fee</span>
            <p className="text-lg font-semibold text-foreground">₹{doctor.fee}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/doctor/${doctor.id}`}>
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </Link>
            <Link to={`/book/${doctor.id}`}>
              <Button size="sm">Book Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
