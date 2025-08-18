import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, MapPin, Wallet, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
}

const Layout = ({ children, showNavigation = true }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: MapPin, label: "Ride", path: "/book-ride" },
    { icon: Wallet, label: "Wallet", path: "/wallet" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      {showNavigation && (
        <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg">
          <div className="flex justify-around items-center py-2 px-4">
            {navItems.map(({ icon: Icon, label, path }) => (
              <Button
                key={path}
                variant="ghost"
                // size="mobile"
                onClick={() => navigate(path)}
                className={`flex flex-col gap-1 h-16 ${
                  isActive(path) 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{label}</span>
              </Button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;