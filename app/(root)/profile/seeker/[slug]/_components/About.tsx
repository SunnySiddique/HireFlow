interface AboutProps {
  about: string | undefined | null;
}

const About = ({ about }: AboutProps) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
      <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
        <span className="w-1.5 h-8 bg-primary rounded-full"></span>
        About
      </h2>
      <p className="text-muted-foreground leading-relaxed text-lg">
        {about ? (
          about
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No bio added yet.</p>
          </div>
        )}
      </p>
    </div>
  );
};

export default About;
