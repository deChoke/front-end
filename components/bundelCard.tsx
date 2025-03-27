interface BundleCardProps {
    title: string;
    onClick: () => void;
  }
  
  export default function BundleCard({ title, onClick }: BundleCardProps) {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer p-4 border rounded shadow hover:shadow-lg transition"
      >
        <h2 className="text-xl font-bold text-center">{title}</h2>
      </div>
    )
  }
  