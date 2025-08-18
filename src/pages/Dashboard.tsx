import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, CreditCard } from "lucide-react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);

  // Load balance from localStorage
  useEffect(() => {
    const loadBalance = () => {
      try {
        const raw = localStorage.getItem("wallet_balance");
        setBalance(raw ? JSON.parse(raw) : 0);
      } catch {
        setBalance(0);
      }
    };

    loadBalance(); // initial load

    // Listen for changes from Wallet updates
    window.addEventListener("storage", loadBalance);

    return () => {
      window.removeEventListener("storage", loadBalance);
    };
  }, []);

  const recentRides = [
    { id: 1, destination: "Downtown Mall", time: "2h ago", rating: 4.8 },
    { id: 2, destination: "Airport Terminal", time: "1 day ago", rating: 5.0 },
    { id: 3, destination: "Business District", time: "3 days ago", rating: 4.9 },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-8 bg-gradient-to-b from-[#0A0F1E] via-[#121826] to-[#1C1F2E] min-h-screen">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Welcome back!</h1>
          <p className="text-white/70">Where would you like to go today?</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card
            className="cursor-pointer bg-gradient-to-br from-emerald-400/20 to-green-500/10 border border-emerald-400/30 hover:scale-[1.02] transition-transform"
            onClick={() => navigate("/book-ride")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
              <div className="p-3 bg-emerald-500/20 rounded-full">
                <MapPin className="w-7 h-7 text-emerald-400" />
              </div>
              <span className="font-semibold text-white">Book Ride</span>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer bg-gradient-to-br from-indigo-400/20 to-blue-500/10 border border-indigo-400/30 hover:scale-[1.02] transition-transform"
            onClick={() => navigate("/wallet")}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-3">
              <div className="p-3 bg-indigo-500/20 rounded-full">
                <CreditCard className="w-7 h-7 text-indigo-400" />
              </div>
              <span className="font-semibold text-white">Wallet</span>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Balance */}
        <Card className="bg-gradient-to-r from-emerald-500 to-green-500 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <CreditCard className="w-5 h-5" />
              Wallet Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-white mb-4">
              ${balance.toFixed(2)}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              onClick={() => navigate("/wallet")}
            >
              Add Money
            </Button>
          </CardContent>
        </Card>

        {/* Recent Rides */}
        <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5 text-emerald-400" />
              Recent Rides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentRides.map((ride) => (
              <div
                key={ride.id}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div>
                  <p className="font-medium text-white">{ride.destination}</p>
                  <p className="text-sm text-white/60">{ride.time}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-white">{ride.rating}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
