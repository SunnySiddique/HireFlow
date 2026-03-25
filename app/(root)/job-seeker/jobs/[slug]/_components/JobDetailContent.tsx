import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Job } from "@/types/jobs";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useRef } from "react";
import { stagger } from "./animation";

function CheckList({ items }: { items: string[] }) {
  const ref = useRef(null);
  return (
    <ul ref={ref} className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const JobDetailContent = ({ job }: { job: Job; isSubscribed: boolean }) => {
  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Job Description
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {job.job_description}
          </p>
        </Card>

        <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Requirements
          </h2>
          <CheckList items={job.requirements as string[]} />
        </Card>

        <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Responsibilities
          </h2>
          <CheckList items={job.responsibilities as string[]} />
        </Card>

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
            {(job.skills_required ?? []).map((skill) => (
              <motion.div key={skill} whileTap={{ scale: 0.97 }}>
                <Badge className="bg-primary/10 text-primary border border-primary/20 cursor-default">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </Card>

        <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
          <h2 className="text-xl font-bold text-foreground mb-4">Benefits</h2>
          <CheckList items={job.benefits as string[]} />
        </Card>
      </div>
    </>
  );
};

export default JobDetailContent;
