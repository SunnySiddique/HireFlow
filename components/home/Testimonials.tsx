import { JOB_PLATFORM_TESTIMONIALS } from "@/constants";
import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <>
      <section className="bg-muted/50 py-24 sm:py-32 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-5xl sm:text-6xl font-black mb-4 text-foreground">
              Success Stories
            </h2>
            <p className="text-lg text-muted-foreground font-semibold">
              Professionals who landed their dream roles through TalentHub
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JOB_PLATFORM_TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-foreground mb-8 text-base leading-relaxed font-medium">{`"${testimonial.text}"`}</p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground font-semibold">
                    {testimonial.role} • {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
