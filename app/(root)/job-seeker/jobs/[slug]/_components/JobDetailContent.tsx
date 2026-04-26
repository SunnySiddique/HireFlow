import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Job } from "@/types/jobs";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function CheckList({ items }: { items: string[] }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No items listed at this time.
      </p>
    );
  }
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <span className="text-sm text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

const JobDetailContent = ({ job }: { job: Job }) => {
  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6 border border-border hover:border-primary/30 transition-colors duration-200">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Job Description
          </h2>
          {job.job_description ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {job.job_description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Job description not available at this time.
            </p>
          )}
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
          {job.skills_required && job.skills_required.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {job.skills_required.map((skill) => (
                <motion.div key={skill} whileTap={{ scale: 0.97 }}>
                  <Badge className="bg-primary/10 text-primary border border-primary/20 cursor-default">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No specific skills listed at this time.
            </p>
          )}
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
