import { JOB_PLATFORM_STATS } from "@/constants";

const QuickStats = () => {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-y border-border transition-colors duration-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {JOB_PLATFORM_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary/15 rounded-2xl flex items-center justify-center group-hover:bg-primary/25 group-hover:scale-110 transition-all border border-primary/20">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-4xl font-black text-primary mb-2 group-hover:text-secondary transition-colors">
                  {stat.number}
                </h3>
                <p className="text-muted-foreground font-semibold text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default QuickStats;
