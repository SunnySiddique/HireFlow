import { getInitials } from "@/lib/utils";
import Image from "next/image";
import { memo, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

const SidebarAvatar = memo(function SidebarAvatar({
  src,
  alt,
  displayName,
  size = "lg",
}: {
  src?: string | null;
  alt: string;
  displayName: string;
  size?: "sm" | "lg";
}) {
  const [imgError, setImgError] = useState(false);
  const dimension = size === "lg" ? 40 : 32;

  return (
    <Avatar
      className={`${size === "lg" ? "h-10 w-10" : "h-8 w-8"} flex-shrink-0`}
    >
      {src && !imgError ? (
        <Image // ← directly inside Avatar, no wrapper
          src={src}
          alt={alt}
          width={dimension}
          height={dimension}
          className="rounded-full object-cover w-full h-full pointer-events-none"
          onError={() => setImgError(true)}
          priority={size === "lg"}
        />
      ) : (
        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
          {getInitials(displayName)}
        </AvatarFallback>
      )}
    </Avatar>
  );
});

export default SidebarAvatar;
