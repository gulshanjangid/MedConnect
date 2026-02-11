import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Shield, Video, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { doctors } from "@/lib/mock-data";
import DoctorCard from "@/components/DoctorCard";
import heroImage from "@/assets/hero-doctor.jpg";

const features = [
  { icon: Video, title: "Video Consultations", desc: "Face-to-face with trusted doctors from home" },
  { icon: Shield, title: "Secure & Private", desc: "End-to-end encrypted consultations" },
  { icon: Clock, title: "24/7 Availability", desc: "Book appointments anytime, anywhere" },
  { icon: Star, title: "Top-Rated Doctors", desc: "Verified specialists with proven track records" },
];

export default function Index() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Doctor consultation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/30" />
        </div>

        <div className="container relative z-10 py-24 md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Your Health,{" "}
              <span className="text-accent">Our Priority</span>
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/80 leading-relaxed">
              Connect with experienced doctors through secure video consultations.
              Get prescriptions, follow-ups, and expert care — all from the comfort of your home.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/doctors">
                <Button size="lg" className="text-base px-8">
                  <Search className="w-4 h-4 mr-2" />
                  Find a Doctor
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  My Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-background border border-border hover-lift"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground text-lg">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground">Top Doctors</h2>
              <p className="text-muted-foreground mt-1">Consult with our highest-rated specialists</p>
            </div>
            <Link to="/doctors">
              <Button variant="ghost">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 3).map((doc, i) => (
              <DoctorCard key={doc.id} doctor={doc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <h2 className="font-heading text-3xl font-bold text-primary-foreground">
            Ready to consult?
          </h2>
          <p className="text-primary-foreground/80 mt-2 max-w-md mx-auto">
            Join thousands of patients who trust MedConnect for quality healthcare.
          </p>
          <Link to="/doctors">
            <Button size="lg" variant="secondary" className="mt-6 text-base px-8">
              Book Your Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
