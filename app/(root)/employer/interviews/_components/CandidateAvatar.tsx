import Image from "next/image";

const getInitials = (name: string) =>
  name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "??";

const avatarColors = [
  "bg-primary/20 text-primary",
  "bg-secondary/20 text-secondary",
  "bg-chart-1/20 text-chart-1",
  "bg-chart-2/20 text-chart-2",
  "bg-chart-3/40 text-chart-2",
];

const getAvatarColor = (name: string) =>
  avatarColors[name?.charCodeAt(0) % avatarColors.length] ?? avatarColors[0];

const CandidateAvatar = ({
  name,
  profileUrl,
  size = "md",
}: {
  name: string;
  profileUrl?: string;
  size?: "sm" | "md";
}) => {
  const dim = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-xs";
  if (profileUrl) {
    return (
      <div
        className={`${dim} rounded-full overflow-hidden shrink-0 border border-border`}
      >
        <Image
          src={profileUrl}
          alt={name}
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-semibold shrink-0 ${getAvatarColor(name)}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default CandidateAvatar;
