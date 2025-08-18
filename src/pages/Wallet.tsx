import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Plus, ArrowUpRight, ArrowDownLeft, Wallet as WalletIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

type Txn = {
  id: number;
  type: "ride" | "topup";
  description: string;
  amount: number; // positive for topup, negative for ride
  date: string;
};

// Reusable localStorage hook (sync init + auto-save)
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage might be unavailable (private mode, quota) – fail silently
    }
  }, [key, value]);

  return [value, setValue] as const;
}

const DEFAULT_TXNS: Txn[] = [
  { id: 1, type: "ride",  description: "Ride to Downtown Mall", amount: -8.5,  date: "Today, 2:30 PM" },
  { id: 2, type: "topup", description: "Added money",            amount: 25.0,  date: "Yesterday, 10:15 AM" },
];

const Wallet = () => {
  const [amount, setAmount] = useState("");
  // 🔒 Persisted state (no flicker/reset on route change or reload)
  const [balance, setBalance] = useLocalStorage<number>("wallet_balance", 45.5);
  const [transactions, setTransactions] = useLocalStorage<Txn[]>("wallet_transactions", DEFAULT_TXNS);

  const quickAmounts = [10, 25, 50, 100];

  const addTransaction = (txn: Omit<Txn, "id" | "date">) => {
    const newTxn: Txn = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      ...txn,
    };
    setTransactions((prev) => [newTxn, ...prev]);
  };

  const handleAddMoney = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) return;
    setBalance((b) => b + value);
    addTransaction({ type: "topup", description: "Added money", amount: value });
    setAmount("");
  };

  return (
    <Layout>
      <div className="p-6 space-y-8 bg-gradient-to-b from-[#0A0F1E] via-[#121826] to-[#1C1F2E] min-h-screen">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white">Wallet</h1>
          <p className="text-white/70">Manage your payments</p>
        </div>

        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-emerald-500 to-green-500 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <WalletIcon className="w-5 h-5" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-extrabold text-white mb-4">
              ${balance.toFixed(2)}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                onClick={() => amount && handleAddMoney()}
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Money
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Cards
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add Money Section */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Add Money</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg bg-white/10 border-white/20 text-white placeholder-white/50"
            />

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((q) => (
                <Button
                  key={q}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(q.toString())}
                  className="font-medium bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  ${q}
                </Button>
              ))}
            </div>

            <Button
              onClick={handleAddMoney}
              className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-black font-semibold hover:opacity-90 transition-all duration-300 shadow-lg"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Add ${amount || "0"}
            </Button>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="bg-white/5 backdrop-blur-md border border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      t.type === "ride"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    }`}
                  >
                    {t.type === "ride" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{t.description}</p>
                    <p className="text-sm text-white/60">{t.date}</p>
                  </div>
                </div>
                <div
                  className={`font-semibold ${
                    t.amount > 0 ? "text-emerald-400" : "text-white"
                  }`}
                >
                  {t.amount > 0 ? "+" : ""}${Math.abs(t.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Wallet;
