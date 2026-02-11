import { motion } from "framer-motion";
import { CalendarCheck, Clock, FileText, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "@/components/StatsCard";
import ConsultationCard from "@/components/ConsultationCard";
import { consultations, prescriptions } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const upcoming = consultations.filter((c) => c.status === "SCHEDULED");
  const past = consultations.filter((c) => c.status !== "SCHEDULED" && c.status !== "CANCELLED");
  const cancelled = consultations.filter((c) => c.status === "CANCELLED");

  const stats = [
    { icon: CalendarCheck, label: "Upcoming", value: String(upcoming.length), sublabel: "consultations" },
    { icon: Activity, label: "Completed", value: String(past.length), sublabel: "this month" },
    { icon: FileText, label: "Prescriptions", value: String(prescriptions.length), sublabel: "active" },
    { icon: Clock, label: "Next Appointment", value: upcoming[0]?.time ?? "—", sublabel: upcoming[0]?.date ?? "" },
  ];

  return (
    <div className="py-8">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold text-foreground">Patient Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your health overview.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {stats.map((s, i) => (
            <StatsCard key={s.label} {...s} index={i} />
          ))}
        </div>

        {/* Consultations */}
        <Tabs defaultValue="upcoming" className="mt-10">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upcoming">
                Upcoming <Badge variant="secondary" className="ml-2">{upcoming.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="past">
                Past <Badge variant="secondary" className="ml-2">{past.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelled <Badge variant="secondary" className="ml-2">{cancelled.length}</Badge>
              </TabsTrigger>
            </TabsList>
            <Link to="/doctors">
              <Button size="sm">Book New</Button>
            </Link>
          </div>

          <TabsContent value="upcoming" className="mt-4 space-y-4">
            {upcoming.length > 0 ? (
              upcoming.map((c, i) => <ConsultationCard key={c.id} consultation={c} index={i} />)
            ) : (
              <p className="text-center py-8 text-muted-foreground">No upcoming consultations</p>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-4 space-y-4">
            {past.map((c, i) => (
              <ConsultationCard key={c.id} consultation={c} index={i} />
            ))}
          </TabsContent>

          <TabsContent value="cancelled" className="mt-4 space-y-4">
            {cancelled.map((c, i) => (
              <ConsultationCard key={c.id} consultation={c} index={i} />
            ))}
          </TabsContent>
        </Tabs>

        {/* Prescriptions */}
        <div className="mt-10">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Recent Prescriptions</h2>
          {prescriptions.length > 0 ? (
            <div className="space-y-4">
              {prescriptions.map((rx) => (
                <motion.div key={rx.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{rx.doctorName}</h3>
                      <p className="text-sm text-muted-foreground">{rx.date}</p>
                    </div>
                    <Badge variant="outline"><FileText className="w-3 h-3 mr-1" />Prescription</Badge>
                  </div>
                  <p className="text-sm text-foreground font-medium">Diagnosis: {rx.diagnosis}</p>
                  <div className="mt-3 space-y-2">
                    {rx.medications.map((med, i) => (
                      <div key={i} className="text-sm bg-secondary/50 p-3 rounded-lg">
                        <p className="font-medium text-foreground">{med.name} — {med.dosage}</p>
                        <p className="text-muted-foreground">{med.duration} • {med.instructions}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No prescriptions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
