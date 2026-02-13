import { LucideIcon } from "lucide-react";

const EmptyState = ({
  icon: Icon,
  msg1,
  msg2,
}: {
  icon: LucideIcon;
  msg1: string;
  msg2: string;
}) => {
  return (
    <>
      <div className="py-12 text-center">
        <Icon className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />{" "}
        <p className="text-muted-foreground font-semibold mb-1">{msg1}</p>
        <p className="text-muted-foreground text-sm">{msg2}</p>
      </div>
    </>
  );
};

export default EmptyState;
