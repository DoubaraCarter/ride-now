import { motion } from "framer-motion";

const Preloader = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center flex-col bg-[#0f172a] z-50" 
      // bg-[#0f172a] = slate-900/dark background (adjust to your theme)
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
        <h1 className="text-4xl font-bold text-white tracking-wide">
          <span className="text-emerald-400">Ride</span>Now
        </h1>
        <p className="text-white/80 mt-2 mb-4">Your ride, your way...</p>
      <motion.div
        className="w-12 h-12 border-4 border-[#22c55e] border-t-transparent rounded-full animate-spin"
      />
    </motion.div>
  );
};

export default Preloader;
