import { usePackingList } from '../../hooks/usePackingList';

interface PLDetailsPageLayoutProps {
  children?: React.ReactNode;
}

export default function PLDetailsPageLayout({
  children,
}: PLDetailsPageLayoutProps) {
  const { packingList } = usePackingList();
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-base-300">
      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-center mb-12">
        {packingList.name}
      </h1>

      {/* Card container */}
      {children}
    </div>
  );
}
