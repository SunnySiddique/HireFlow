import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Job } from "@/types/jobs";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRef } from "react";
import { AnimatedSection, fadeUp, stagger } from "./animation";

// ── Sub-components ────

function CheckList({ items }: { items: string[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.ul
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className="space-y-3"
    >
      {items.map((item, i) => (
        <motion.li key={i} variants={fadeUp} className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground">{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

const JobDetailContent = ({ job }: { job: Job }) => {
  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <AnimatedSection delay={0}>
          <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Job Description
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.job_description}
            </p>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={1}>
          <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Requirements
            </h2>
            <CheckList items={job.requirements} />
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={2}>
          <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Responsibilities
            </h2>
            <CheckList items={job.responsibilities} />
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={3}>
          <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Skills Required
            </h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              className="flex flex-wrap gap-2"
            >
              {job.skills_required.map((skill) => (
                <motion.div
                  key={skill}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Badge className="bg-primary/10 text-primary border border-primary/20 cursor-default">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={4}>
          <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
            <h2 className="text-xl font-bold text-foreground mb-4">Benefits</h2>
            <CheckList items={job.benefits} />
          </Card>
        </AnimatedSection>
      </div>
    </>
  );
};

export default JobDetailContent;
