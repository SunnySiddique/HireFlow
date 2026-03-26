import { User } from "lucide-react";
import Image from "next/image";

interface HeroProfileProps {
  jobSeekerProfile: any;
}

const HeroProfile = ({ jobSeekerProfile: profile }: HeroProfileProps) => {
  if (!profile) return null;

  return (
    <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b border-border">
      <div className="max-w-370 mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-end justify-between">
          {/* Profile Image & Basic Info */}
          <div className="flex flex-col sm:flex-row gap-6 items-start flex-1">
            {/* Profile Image */}
            <div className="relative group">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-muted border-2 border-border overflow-hidden">
                {profile.profile_url ? (
                  <Image
                    src={profile.profile_url}
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
            </div>

            {/* Name & Headline */}
            <div className="flex-1">
              <>
                <h1 className="text-3xl sm:text-4xl font-black mb-2">
                  {profile?.full_name}
                </h1>
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
                  </div>
                )}
              </>
            </div>
          </div>
        </div>

        {/* Open to Work Badge */}
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
      </div>
    </div>
  );
};

export default HeroProfile;
