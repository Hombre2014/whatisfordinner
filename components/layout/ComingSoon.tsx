type ComingSoonProps = {
  title: string;
  description: string;
};

/** Placeholder body for pages that are built in a later milestone. */
export const ComingSoon = ({ title, description }: ComingSoonProps) => (
  <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
    <p className="text-sm font-bold tracking-wide text-highlight uppercase">
      Coming soon
    </p>
    <h1 className="mt-2 text-4xl font-bold">{title}</h1>
    <p className="mt-4 text-lg text-muted-foreground">{description}</p>
  </div>
);
