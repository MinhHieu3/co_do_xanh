import { useEffect, useState } from "react";

// A detailed leaf SVG component
const LeafSvg = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M91.3149 20.9168C91.3149 20.9168 76.5169 7.74955 49.3361 24.3168C22.1553 40.8841 12.0305 76.6026 12.0305 76.6026C12.0305 76.6026 31.7915 88.0817 58.9723 71.5144C86.1531 54.9472 91.3149 20.9168 91.3149 20.9168Z" />
    <path d="M12.0303 76.6026C16.9406 72.8407 58.9721 71.5144 58.9721 71.5144" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function LeavesBackground() {
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    // Generate random leaves for the background
    const generateLeaves = () => {
      const newLeaves = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        size: Math.random() * 25 + 15, // 15px to 40px
        left: Math.random() * 100, // 0% to 100%
        animationDuration: Math.random() * 20 + 15, // 15s to 35s
        animationDelay: Math.random() * 10, // 0s to 10s
        opacity: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
        color: Math.random() > 0.5 ? "text-[#8CC63F]" : "text-[#009e4e]",
        blur: Math.random() > 0.5 ? "blur-[2px]" : "blur-[1px]",
      }));
      setLeaves(newLeaves);
    };

    generateLeaves();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft background similar to image */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fcfdfc] to-[#f4fbf4] opacity-90" />
      <div className="absolute inset-0 bg-noise opacity-[0.015]" />
      
      {/* Floating leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className={`absolute top-[-100px] animate-falling-leaf ${leaf.color} ${leaf.blur} drop-shadow-sm`}
          style={{
            left: `${leaf.left}%`,
            width: `${leaf.size}px`,
            height: `${leaf.size}px`,
            opacity: leaf.opacity,
            animationDuration: `${leaf.animationDuration}s`,
            animationDelay: `${leaf.animationDelay}s`,
          }}
        >
          <LeafSvg className="w-full h-full transform -rotate-45" />
        </div>
      ))}

      <style>{`
        @keyframes falling-leaf {
          0% {
            transform: translateY(-50px) rotate(0deg) translateX(0px);
          }
          25% {
            transform: translateY(25vh) rotate(90deg) translateX(30px);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(-20px);
          }
          75% {
            transform: translateY(75vh) rotate(270deg) translateX(30px);
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(0px);
          }
        }
        .animate-falling-leaf {
          animation-name: falling-leaf;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .bg-noise {
           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
