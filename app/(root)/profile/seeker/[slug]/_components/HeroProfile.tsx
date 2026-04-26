import { JobSeekerProfile } from "@/types/job-seeker";
import { motion } from "framer-motion";
import { Camera, Edit2, Star, User } from "lucide-react";
import Image from "next/image";

interface HeroProfileProps {
  jobSeekerProfile: JobSeekerProfile;
  onEdit?: () => void;
  onToggleOpenToWork?: () => void;
}

export default function HeroProfile({
  jobSeekerProfile: profile,
  onEdit,
  onToggleOpenToWork,
}: HeroProfileProps) {
  if (!profile) return null;

  return (
    <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b border-border relative">
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 z-20 sm:top-8 sm:right-8 flex items-center gap-2 bg-background/80 backdrop-blur-sm border border-border px-4 py-2 rounded-full text-sm font-medium hover:bg-muted transition-colors shadow-sm"
        >
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-end justify-between">
          {/* Profile Image & Basic Info */}
          <div className="flex flex-col sm:flex-row gap-6 items-start flex-1">
            {/* Profile Image */}
            <div className="relative shrink-0 group">
              <div
                className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-muted flex items-center justify-center overflow-hidden z-10 transition-all ${
                  profile?.is_featured
                    ? "border-4 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                    : "border-2 border-border"
                }`}
              >
                {profile?.profile_url ? (
                  <Image
                    src={profile?.profile_url || ""}
                    alt="Profile image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 112px, 128px"
                    priority
                  />
                ) : (
                  <User className="w-12 h-12 text-muted-foreground" />
                )}

                {onEdit && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-[2px]">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>

              {/* Glowing Featured Badge */}
              {profile?.is_featured && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/40 border border-white/20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Star className="w-3 h-3 fill-white text-white" />
                    </motion.div>
                    Featured
                  </div>
                </motion.div>
              )}
            </div>

            {/* Name & Headline */}
            <div className="flex-1 mt-2 sm:mt-0">
              <>
                <h1 className="text-3xl sm:text-4xl font-black mb-2 text-foreground">
                  {profile?.full_name}
                </h1>
                {profile?.headline || profile.bio ? (
                  <div className="space-y-3 max-w-2xl">
                    <p className="text-lg sm:text-xl text-primary font-semibold">
                      {profile.headline}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>
                ) : (
                  <div className="py-4">
                    <p className="text-muted-foreground text-lg font-semibold mb-2">
                      No Profile Bio and headline Yet
                    </p>
                    {onEdit && (
                      <button
                        onClick={onEdit}
                        className="text-sm text-primary hover:underline font-medium"
                      >
                        Click here to add them
                      </button>
                    )}
                  </div>
                )}
              </>
            </div>
          </div>
        </div>

        {/* Open to Work Badge */}
        <button
          onClick={onToggleOpenToWork}
          disabled={!onToggleOpenToWork}
          className={`mt-8 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
            profile.open_to_work
              ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 shadow-sm"
              : "bg-muted/50 text-muted-foreground border-muted hover:bg-muted"
          } ${onToggleOpenToWork ? "cursor-pointer hover:scale-105" : "cursor-default"}`}
        >
          {profile.open_to_work ? (
            <>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span>Open to Work</span>
            </>
          ) : (
            <>
              <span className="w-2.5 h-2.5 bg-muted-foreground/40 rounded-full"></span>
              <span>Not Available</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
