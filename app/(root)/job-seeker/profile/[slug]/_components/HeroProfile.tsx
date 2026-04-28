import CustomField from "@/components/CustomField";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { JobSeekerProfile, ProfileFormData } from "@/types/job-seeker";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Edit2,
  Save,
  Sparkles,
  Star,
  Upload,
  User,
} from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface HeroProifleProps {
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  form: UseFormReturn<ProfileFormData>;
  handleProfileSave: () => void;
  isPending: boolean;
  setProfileFile: React.Dispatch<React.SetStateAction<File | null>>;
  jobSeekerProfile: JobSeekerProfile;
}

const HeroProfile = ({
  editMode,
  setEditMode,
  form,
  handleProfileSave,
  isPending,
  setProfileFile,
  jobSeekerProfile: profile,
}: HeroProifleProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const profileImageRef = useRef<HTMLInputElement>(null);

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const imageSrc = profileImage || profile.profile_url;

  return (
    <FormProvider {...form}>
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background border-b border-border">
        {/* Decorative background — hidden on mobile */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none hidden sm:block">
          <div
            className={cn(
              "absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-3xl opacity-50 transition-colors duration-700",
              profile.is_featured ? "bg-amber-500/20" : "bg-primary/10",
            )}
          />
          <div className="absolute top-1/2 -left-24 w-48 sm:w-72 h-48 sm:h-72 bg-secondary/10 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            {/* Left: avatar + info */}
            <div className="flex flex-col xs:flex-row gap-4 sm:gap-6 items-start flex-1 w-full min-w-0">
              {/* Avatar */}
              <motion.div
                whileHover={editMode ? { scale: 1.05 } : {}}
                className="relative group shrink-0"
              >
                <div
                  className={cn(
                    "relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-2xl sm:rounded-3xl bg-card shadow-xl z-10",
                    profile.is_featured
                      ? "border-4 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                      : "border-4 border-background",
                  )}
                >
                  <div className="absolute inset-0 rounded-[inherit] overflow-hidden">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt="Profile image"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 480px) 80px, (max-width: 640px) 96px, (max-width: 1024px) 112px, 144px"
                        priority
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-muted/50">
                        <User
                          size={40}
                          className="text-muted-foreground/50 sm:w-[50px] sm:h-[50px]"
                        />
                      </div>
                    )}

                    <AnimatePresence>
                      {editMode && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
                          onClick={() => profileImageRef.current?.click()}
                        >
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-md" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Featured badge on avatar */}
                {!editMode && profile.is_featured && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-amber-500/40 border border-white/20">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Star className="w-2.5 h-2.5 fill-white text-white" />
                      </motion.div>
                      Featured
                    </div>
                  </motion.div>
                )}

                {editMode && (
                  <input
                    ref={profileImageRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                )}
              </motion.div>

              {/* Name & Headline */}
              <div className="flex-1 w-full min-w-0 pt-1">
                {editMode ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3 sm:space-y-4 bg-card/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-border/50 shadow-sm"
                  >
                    <CustomField
                      control={form.control}
                      placeholder="Full Name"
                      label="Full Name"
                      name="fullName"
                    />
                    <CustomField
                      control={form.control}
                      placeholder="Headline (e.g., Senior Product Designer)"
                      label="Headline"
                      name="headline"
                    />
                    <CustomField
                      type="textarea"
                      control={form.control}
                      placeholder="Tell us about yourself"
                      label="Bio"
                      name="bio"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pt-2"
                  >
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <h1 className="text-2xl xs:text-3xl sm:text-4xl font-black tracking-tight text-foreground leading-tight break-words">
                        {profile?.full_name}
                      </h1>
                      {profile.is_featured && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            delay: 0.5,
                          }}
                          className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-amber-500/20 shrink-0"
                          title="Featured Talent"
                        >
                          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white" />
                        </motion.div>
                      )}
                    </div>

                    {profile?.headline || profile.bio ? (
                      <div className="space-y-2 sm:space-y-3">
                        <p className="text-base sm:text-lg lg:text-xl text-foreground/80 font-medium flex items-start sm:items-center gap-2 flex-wrap">
                          <Briefcase className="hidden sm:flex w-4 h-4 sm:w-5 sm:h-5 text-primary/70 shrink-0 mt-0.5 sm:mt-0" />
                          <span>{profile.headline}</span>
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                          {profile.bio}
                        </p>
                      </div>
                    ) : (
                      <div className="py-4 sm:py-6 px-4 sm:px-8 bg-card/50 border border-border/50 rounded-2xl inline-block mt-2 w-full sm:w-auto">
                        <p className="text-foreground font-semibold mb-1 flex items-center gap-2 text-sm sm:text-base">
                          <Sparkles className="w-4 h-4 text-primary shrink-0" />
                          No Profile Bio and headline Yet
                        </p>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          Click the "Edit Profile" button to add your personal
                          information.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Edit/Save buttons */}
            <div className="flex flex-row sm:flex-col lg:flex-row items-center gap-2 sm:gap-3 shrink-0 self-start sm:self-end">
              <AnimatePresence mode="wait">
                {editMode && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => setEditMode(false)}
                      className="px-4 sm:px-6 py-2 sm:py-5 text-sm sm:text-base rounded-xl font-semibold border-border hover:bg-muted"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                variant={editMode ? "default" : "outline"}
                className={cn(
                  "px-4 sm:px-6 py-2 sm:py-5 text-sm sm:text-base rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm hover:shadow-md whitespace-nowrap",
                  editMode
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-card hover:bg-muted border-border",
                )}
                onClick={editMode ? handleProfileSave : () => setEditMode(true)}
                disabled={isPending}
              >
                {editMode ? (
                  <>
                    {isPending ? (
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>{isPending ? "Saving..." : "Save Changes"}</span>
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Open to Work badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 sm:mt-8"
          >
            <button
              className={cn(
                "group relative inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border font-semibold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 overflow-hidden",
                profile.open_to_work
                  ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20 hover:border-primary/50"
                  : "bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:text-foreground",
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              {profile.open_to_work ? (
                <>
                  <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-primary"></span>
                  </span>
                  <span>Open to Work</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-muted-foreground/40 rounded-full"></span>
                  <span>Not Available</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      </div>
    </FormProvider>
  );
};

export default HeroProfile;
