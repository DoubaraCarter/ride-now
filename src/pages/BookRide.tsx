import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Calendar, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";

const BookRide = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="relative min-h-screen p-6 bg-gradient-to-b from-[#0A0F1E] via-[#121826] to-[#1C1F2E]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

        {/* Content */}
        <div className="relative z-10 max-w-lg mx-auto">
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white text-lg font-semibold">
                Book a Ride
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              
              {/* Pickup Location */}
              <div>
                <label className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  Pickup Location
                </label>
                <input
                  type="text"
                  placeholder="Enter pickup address"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              {/* Destination */}
              <div>
                <label className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <Navigation className="w-4 h-4 text-indigo-400" />
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-white/80 text-sm mb-2">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white/80 text-sm mb-2">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    Time
                  </label>
                  <input
                    type="time"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-black font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
                onClick={() => navigate("/ride-confirmation")}
              >
                Confirm Ride
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BookRide;
