"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Check, Trash } from "lucide-react";

interface NotificationActionsProps {
  onMarkAllRead: () => void;
  onDeleteAll: () => void;
  disabled: boolean;
  isDeleting: boolean;
}

export const NotificationActions = ({
  onDeleteAll,
  onMarkAllRead,
  disabled,
  isDeleting,
}: NotificationActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* Mark all as read */}
      <Button
        variant="outline"
        size="icon"
        className="sm:hidden cursor-pointer"
        onClick={() => onMarkAllRead()}
        disabled={disabled}
      >
        <Check className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="hidden sm:flex items-center gap-2 cursor-pointer"
        onClick={() => onMarkAllRead()}
        disabled={disabled}
      >
        <Check className="w-4 h-4" />
        Mark all as read
      </Button>

      {/* Delete all notifications with Alert */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="icon"
            className="sm:hidden"
            disabled={disabled}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Notifications?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to remove all
              your notifications?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDeleteAll()}>
              {isDeleting ? "Deleting..." : "Delete All"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex items-center gap-2 cursor-pointer"
            disabled={disabled}
          >
            <Trash className="w-4 h-4" />
            Delete all
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Notifications?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to remove all
              your notifications?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDeleteAll()}
              className="cursor-pointer"
            >
              {isDeleting ? "Deleting..." : "Delete All"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
