const CTA = () => {
  return (
    <>
      <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl text-foreground sm:text-6xl font-black mb-6 leading-tight">
            Ready to Land Your Dream Role?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-semibold opacity-95">
            Join 500K+ professionals who found their perfect fit through
            HireFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-primary text-black font-semibold rounded-lg  transition-all text-base shadow-lg hover:shadow-2xl">
              Get Started Free
            </button>
            <button className="px-10 py-4 border-2 border-accent-foreground text-foreground font-bold rounded-lg hover:bg-primary-foreground/10 transition-all text-base transform hover:scale-105">
              Post a Job
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
