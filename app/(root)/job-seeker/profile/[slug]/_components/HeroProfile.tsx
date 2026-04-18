import CustomField from "@/components/CustomField";
import { Button } from "@/components/ui/button";
import { JobSeekerProfile, ProfileFormData } from "@/types/job-seeker";
import { Edit2, Save, Star, Upload, User } from "lucide-react";
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
  console.log(profile);
  const imageSrc = profileImage || profile.profile_url;
  return (
    <FormProvider {...form}>
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
        <div className="max-w-370 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-end justify-between">
            {/* Profile Image & Basic Info */}
            <div className="flex flex-col sm:flex-row gap-6 items-start flex-1">
              {/* Profile Image Upload */}
              <div className="relative group">
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-muted border-2 border-border overflow-hidden">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt="Profile image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 112px, 128px"
                      priority
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <User size={50} className="text-muted-foreground" />
                    </div>
                  )}
                </div>

                {editMode && (
                  <>
                    <button
                      onClick={() => profileImageRef.current?.click()}
                      className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all transform hover:scale-110"
                    >
                      <Upload className="w-5 h-5" />
                    </button>
                    <input
                      ref={profileImageRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              {/* Name & Headline */}
              <div className="flex-1">
                {editMode ? (
                  <div className="space-y-3">
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
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl sm:text-4xl font-black mb-2">
                      {profile?.full_name}
                    </h1>
                    {profile.is_featured && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest border border-amber-500/20">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        Featured
                      </div>
                    )}
                    {profile?.headline || profile.bio ? (
                      <>
                        <p className="text-lg sm:text-xl text-muted-foreground font-semibold">
                          {profile.headline}
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {profile.bio}
                        </p>
                      </>
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground text-lg font-semibold mb-2">
                          No Profile Bio and headline Yet
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Click the {`"Edit Profile"`} button to add your
                          personal information, experience, and education.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Edit/Save Button */}

            <div className="flex justify-end items-center gap-3">
              <Button
                variant={editMode ? "outline" : "ghost"}
                className={`px-6 py-5 rounded-lg font-bold transition-all flex items-center gap-2 shadow-md hover:shadow-lg transform whitespace-nowrap disabled:bg-muted disabled:cursor-not-allowed`}
                onClick={editMode ? handleProfileSave : () => setEditMode(true)}
                disabled={isPending}
              >
                {editMode ? (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {isPending ? "Saving..." : "Save Changes"}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </div>
                )}
              </Button>
              {editMode && (
                <Button variant={"outline"} onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              )}
            </div>
          </div>

          {/* Open to Work Badge */}
          {!editMode && (
            <div
              className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm whitespace-nowrap ${
                profile.open_to_work
                  ? "bg-primary/15 text-primary border-primary/30"
                  : "bg-muted/50 text-muted-foreground border-muted"
              }`}
            >
              {profile.open_to_work ? (
                <>
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                  <span>Open to Work</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-muted-foreground/40 rounded-full"></span>
                  <span>Not Available</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default HeroProfile;
