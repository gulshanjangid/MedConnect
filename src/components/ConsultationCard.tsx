import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, Phone, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Consultation } from "@/lib/mock-data";

const statusColors: Record<Consultation["status"], string> = {
  SCHEDULED: "bg-primary text-primary-foreground",
  IN_PROGRESS: "bg-warning text-warning-foreground",
  COMPLETED: "bg-success text-success-foreground",
  PRESCRIPTION_ISSUED: "bg-accent text-accent-foreground",
  CANCELLED: "bg-destructive text-destructive-foreground",
};

const statusLabels: Record<Consultation["status"], string> = {
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  PRESCRIPTION_ISSUED: "Prescription Issued",
  CANCELLED: "Cancelled",
};

const typeIcons = {
  Video: Video,
  Audio: Phone,
  Chat: MessageSquare,
};

interface Props {
  consultation: Consultation;
  index?: number;
}

export default function ConsultationCard({ consultation, index = 0 }: Props) {
  const TypeIcon = typeIcons[consultation.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="glass-card rounded-xl p-5 hover-lift"
    >
      <div className="flex gap-4">
        <img
          src={consultation.doctorAvatar}
          alt={consultation.doctorName}
          className="w-14 h-14 rounded-xl object-cover ring-2 ring-border"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-heading font-semibold text-foreground">
                {consultation.doctorName}
              </h4>
              <p className="text-sm text-muted-foreground">
                {consultation.doctorSpecialization}
              </p>
            </div>
            <Badge className={`text-xs shrink-0 ${statusColors[consultation.status]}`}>
              {statusLabels[consultation.status]}
            </Badge>
          </div>

          <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {consultation.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {consultation.time}
            </span>
            <span className="flex items-center gap-1">
              <TypeIcon className="w-3.5 h-3.5" />
              {consultation.type}
            </span>
          </div>

          {consultation.notes && (
            <p className="text-sm text-muted-foreground mt-2 bg-secondary/50 p-2 rounded-md">
              {consultation.notes}
            </p>
          )}

          <div className="flex gap-2 mt-3">
            <Link to={`/consultation/${consultation.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            {consultation.status === "SCHEDULED" && (
              <Button size="sm" variant="default">
                Join Consultation
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
