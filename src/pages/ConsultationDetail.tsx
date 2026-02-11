import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Video, Phone, MessageSquare, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { consultations, prescriptions } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  SCHEDULED: "bg-primary text-primary-foreground",
  IN_PROGRESS: "bg-warning text-warning-foreground",
  COMPLETED: "bg-success text-success-foreground",
  PRESCRIPTION_ISSUED: "bg-accent text-accent-foreground",
  CANCELLED: "bg-destructive text-destructive-foreground",
};

const statusLabels: Record<string, string> = {
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  PRESCRIPTION_ISSUED: "Prescription Issued",
  CANCELLED: "Cancelled",
};

const typeIcons = { Video, Audio: Phone, Chat: MessageSquare };

export default function ConsultationDetail() {
  const { id } = useParams<{ id: string }>();
  const consultation = consultations.find((c) => c.id === id);

  if (!consultation) {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg text-muted-foreground">Consultation not found.</p>
        <Link to="/dashboard"><Button variant="link">Back to dashboard</Button></Link>
      </div>
    );
  }

  const prescription = prescriptions.find((p) => p.consultationId === consultation.id);
  const TypeIcon = typeIcons[consultation.type];

  return (
    <div className="py-8">
      <div className="container max-w-3xl">
        <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to dashboard
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="glass-card rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 md:p-8 bg-primary/5">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <img src={consultation.doctorAvatar} alt={consultation.doctorName} className="w-16 h-16 rounded-xl object-cover ring-2 ring-border" />
                  <div>
                    <h1 className="font-heading text-2xl font-bold text-foreground">{consultation.doctorName}</h1>
                    <p className="text-primary font-medium">{consultation.doctorSpecialization}</p>
                  </div>
                </div>
                <Badge className={statusColors[consultation.status]}>
                  {statusLabels[consultation.status]}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Details */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="text-sm font-medium text-foreground">{consultation.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time</p>
                    <p className="text-sm font-medium text-foreground">{consultation.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <TypeIcon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-medium text-foreground">{consultation.type} Consultation</p>
                  </div>
                </div>
              </div>

              {consultation.notes && (
                <div>
                  <h2 className="font-heading font-semibold text-foreground mb-2">Doctor's Notes</h2>
                  <div className="p-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground">
                    {consultation.notes}
                  </div>
                </div>
              )}

              {consultation.status === "SCHEDULED" && (
                <div className="flex gap-3">
                  <Button className="flex-1"><Video className="w-4 h-4 mr-2" />Join Consultation</Button>
                  <Button variant="destructive" className="flex-1"><AlertCircle className="w-4 h-4 mr-2" />Cancel</Button>
                </div>
              )}

              {/* Prescription */}
              {prescription && (
                <div>
                  <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                    <FileText className="w-5 h-5 inline mr-2" />Prescription
                  </h2>
                  <div className="glass-card rounded-xl p-5">
                    <p className="text-sm font-medium text-foreground mb-3">Diagnosis: {prescription.diagnosis}</p>
                    <div className="space-y-2">
                      {prescription.medications.map((med, i) => (
                        <div key={i} className="p-3 bg-secondary/50 rounded-lg">
                          <p className="font-medium text-foreground text-sm">{med.name} — {med.dosage}</p>
                          <p className="text-muted-foreground text-xs mt-1">{med.duration} • {med.instructions}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-4 w-full">
                      <FileText className="w-4 h-4 mr-2" />Download PDF
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
