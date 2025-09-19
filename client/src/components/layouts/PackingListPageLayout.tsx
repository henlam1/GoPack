interface PackingListPageLayoutProps {
  title: string;
  children?: React.ReactNode;
}

export default function PackingListPageLayout({
  title,
  children,
}: PackingListPageLayoutProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-12">
        {title}
      </h1>

      {/* Card container */}
      {children}
    </div>
  );
}
