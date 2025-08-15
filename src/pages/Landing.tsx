import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Navigation } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0F1E] via-[#121826] to-[#1C1F2E] text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center opacity-40"
      ></div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>

      {/* Content Card */}
      <div className="relative z-10 w-full max-w-lg mx-auto p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
            RN
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-extrabold tracking-tight">
            RideNow
          </h1>
          <p className="text-lg text-white/90">
            Your ride, your way
          </p>
          <p className="text-white/75 leading-relaxed">
            Quick, safe, and affordable rides at your fingertips.
          </p>
        </div>

        {/* Get Started Button */}
        <div className="pt-8">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-black font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
          >
            Get Started
          </Button>
        </div>

        {/* Features */}
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-white/80">
          <div className="flex flex-col items-center space-y-2">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <span className="text-sm">Book instantly</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            <span className="text-sm">Secure payments</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Navigation className="w-6 h-6 text-emerald-400" />
            <span className="text-sm">Live tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
