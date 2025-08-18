import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, CreditCard, MapPin, LogOut, Edit, HelpCircle, FileText } from "lucide-react";
import Layout from "@/components/Layout";
import { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "Jermaine Cole",
    email: "Jer.Cole@email.com",
    phone: "+234 (xxx) xxxx-909"
  });

  return (
    <Layout>
      <div className="p-6 space-y-8 bg-gradient-to-b from-[#0A0F1E] via-[#121826] to-[#1C1F2E] min-h-screen">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-white/70">Manage your account & preferences</p>
        </div>

        {/* Profile Section */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <User className="w-5 h-5 text-emerald-400" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar Row */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center shadow-md">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{profileData.name}</h3>
                <p className="text-sm text-white/60">{profileData.email}</p>
              </div>
              <Button variant="outline" size="sm" className="border-emerald-400 text-emerald-400 hover:bg-emerald-500 hover:text-white">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>

            {/* Editable Fields */}
            <div className="space-y-3">
              {[
                { label: "Full Name", value: profileData.name, key: "name" },
                { label: "Email", value: profileData.email, key: "email" },
                { label: "Phone", value: profileData.phone, key: "phone" }
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-white">{field.label}</label>
                  <Input
                    value={field.value}
                    onChange={(e) => setProfileData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="text-lg bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Bell className="w-5 h-5 text-emerald-400" />
              App Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Push Notifications", desc: "Get ride updates & special offers", value: notifications, setter: setNotifications },
              { title: "Location Services", desc: "Improve pickup accuracy", value: locationServices, setter: setLocationServices }
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">{pref.title}</h4>
                  <p className="text-sm text-white/60">{pref.desc}</p>
                </div>
                <Switch checked={pref.value} onCheckedChange={pref.setter} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment & Security */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5 text-emerald-400" />
              Payment & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: CreditCard, label: "Manage Payment Methods" },
              { icon: Shield, label: "Privacy Settings" },
              { icon: MapPin, label: "Saved Addresses" }
            ].map((item, i) => (
              <Button
                key={i}
                variant="outline"
                className="w-full justify-start bg-white/10 border-white/20 text-white placeholder-white/50"
              >
                <item.icon className="w-4 h-4 mr-2 text-emerald-400" />
                {item.label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
          <CardContent className="pt-6 space-y-3">
            {[
              { icon: HelpCircle, label: "Help & Support" },
              { icon: FileText, label: "Terms & Conditions" }
            ].map((item, i) => (
              <Button
                key={i}
                variant="outline"
                className="w-full justify-start bg-white/10 border-white/20 text-white placeholder-white/50"
              >
                <item.icon className="w-4 h-4 mr-2 text-emerald-400" />
                {item.label}
              </Button>
            ))}
            <Button variant="destructive" className="w-full justify-start text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
