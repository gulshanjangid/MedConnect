import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DoctorCard from "@/components/DoctorCard";
import { doctors, specializations } from "@/lib/mock-data";

export default function Doctors() {
  const [search, setSearch] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      const matchSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.specialization.toLowerCase().includes(search.toLowerCase());
      const matchSpec = selectedSpec === "All" || d.specialization === selectedSpec;
      const matchAvail = !availableOnly || d.availableToday;
      return matchSearch && matchSpec && matchAvail;
    });
  }, [search, selectedSpec, availableOnly]);

  return (
    <div className="py-8">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl font-bold text-foreground">Find a Doctor</h1>
          <p className="text-muted-foreground mt-1">
            Search by name, specialization, or availability
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-4 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={availableOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setAvailableOnly(!availableOnly)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Available Today
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {specializations.map((spec) => (
              <Badge
                key={spec}
                variant={selectedSpec === spec ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedSpec(spec)}
              >
                {spec}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((doc, i) => (
            <DoctorCard key={doc.id} doctor={doc} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No doctors match your criteria.</p>
            <Button variant="link" onClick={() => { setSearch(""); setSelectedSpec("All"); setAvailableOnly(false); }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
