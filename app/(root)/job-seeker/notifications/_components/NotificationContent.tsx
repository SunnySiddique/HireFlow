import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import {
  Bell,
  Briefcase,
  CheckCircle2,
  Clock,
  MoreVertical,
  Sparkles,
} from "lucide-react";

const NotificationIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "match":
      return <Briefcase className="w-5 h-5 text-blue-500" />;
    case "view":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "interview":
      return <Clock className="w-5 h-5 text-purple-500" />;
    case "message":
      return <Bell className="w-5 h-5 text-pink-500" />;
    default:
      return <Sparkles className="w-5 h-5 text-amber-500" />;
  }
};

const NotificationContent = ({ notification }: { notification: any }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card
          className={`p-5 relative group transition-all hover:shadow-md border-l-4 ${notification.unread ? "border-l-primary bg-primary/[0.01]" : "border-l-transparent"}`}
        >
          <div className="flex gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${notification.unread ? "bg-primary/10" : "bg-muted"}`}
            >
              <NotificationIcon type={notification.type} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3
                    className={`font-bold truncate ${notification.unread ? "text-foreground" : "text-muted-foreground"}`}
                  >
                    {notification.title}
                  </h3>
                  {notification.unread && (
                    <Badge
                      variant="default"
                      className="h-5 px-1.5 text-[10px] uppercase tracking-wider"
                    >
                      New
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {notification.time}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Mark as read</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {notification.description}
              </p>
              <div className="flex items-center gap-4">
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs font-semibold text-primary"
                >
                  View Details
                </Button>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  {notification.date}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </>
  );
};

export default NotificationContent;
