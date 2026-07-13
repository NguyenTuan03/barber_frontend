"use client";

export default function LoadingComp() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FDFBF7] dark:bg-[#09090b] transition-colors duration-500">
      {/* CSS Animation Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes barberpole {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 80px 0;
          }
        }
        @keyframes scissor-left {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes scissor-right {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-5deg); }
        }
        @keyframes text-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        .barber-stripe {
          background: repeating-linear-gradient(
            -45deg,
            #e11d48, /* Rose 600 */
            #e11d48 15px,
            #ffffff 15px,
            #ffffff 30px,
            #2563eb 30px, /* Blue 600 */
            #2563eb 45px,
            #ffffff 45px,
            #ffffff 60px
          );
          background-size: 85px 85px;
          animation: barberpole 1.2s linear infinite;
        }
      `}} />

      {/* Loader Container */}
      <div className="flex flex-col items-center gap-8 scale-90 sm:scale-100">
        {/* Modern Barber Pole Loader */}
        <div className="relative flex flex-col items-center">
          {/* Top Cap (Chrome/Gold Globe) */}
          <div className="w-10 h-6 rounded-t-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-600 border-2 border-zinc-950 dark:border-zinc-800 shadow-[0_2px_4px_rgba(0,0,0,0.15)] z-20" />
          <div className="w-12 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 border-x-2 border-b-2 border-zinc-950 dark:border-zinc-800 z-20" />

          {/* Glass Cylinder with Rotating Stripes */}
          <div className="w-8 h-28 border-x-2 border-zinc-950 dark:border-zinc-800 bg-zinc-900/5 dark:bg-white/5 relative overflow-hidden shadow-inner z-10">
            {/* Moving stripes */}
            <div className="absolute inset-0 barber-stripe" />
            {/* Glass shine effect */}
            <div className="absolute inset-y-0 left-1 w-1 bg-white/30 rounded-full blur-[0.5px]" />
            <div className="absolute inset-y-0 right-1 w-1.5 bg-black/10 blur-[0.5px]" />
          </div>

          {/* Bottom Cap */}
          <div className="w-12 h-1.5 bg-gradient-to-r from-amber-400 to-amber-600 border-x-2 border-t-2 border-zinc-950 dark:border-zinc-800 z-20" />
          <div className="w-10 h-6 rounded-b-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-600 border-2 border-zinc-950 dark:border-zinc-800 shadow-[0_2px_4px_rgba(0,0,0,0.15)] z-20" />
        </div>

        {/* Brand & Loading Info */}
        <div className="text-center flex flex-col items-center gap-2">
          {/* Scissors Icon with cutting micro-animation */}
          <div className="relative w-12 h-12 flex items-center justify-center mb-1 text-amber-500">
            {/* Left blade */}
            <svg
              className="absolute w-8 h-8 origin-[18px_18px]"
              style={{ animation: "scissor-left 1.2s ease-in-out infinite" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="6" cy="18" r="2" />
              <path d="M7.5 16.5L18 6" />
            </svg>
            {/* Right blade */}
            <svg
              className="absolute w-8 h-8 origin-[18px_18px]"
              style={{ animation: "scissor-right 1.2s ease-in-out infinite" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="6" cy="6" r="2" />
              <path d="M7.5 7.5L18 18" />
            </svg>
          </div>

          <h2 className="text-zinc-950 dark:text-white font-extrabold text-base tracking-[0.25em] uppercase font-sans">
            T99 BARBER
          </h2>
          <p
            className="text-zinc-400 dark:text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase"
            style={{ animation: "text-pulse 1.8s ease-in-out infinite" }}
          >
            Đang tải dữ liệu...
          </p>
        </div>
      </div>
    </div>
  );
}