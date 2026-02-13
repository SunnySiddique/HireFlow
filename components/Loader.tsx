const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Animated Logo */}
          <div className="relative w-20 h-20">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary/50 animate-spin" />

            {/* Middle pulsing ring */}
            <div className="absolute inset-2 rounded-full border-2 border-primary/30 animate-pulse" />

            {/* Orbiting dots */}
            <div
              className="absolute w-1 h-1 bg-primary rounded-full animate-spin"
              style={{
                top: "2px",
                left: "50%",
                marginLeft: "-2px",
                animationDuration: "1s",
              }}
            />
          </div>
        </div>

        {/* Add shimmer animation */}
        <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
      </div>
    </>
  );
};

export default Loader;
