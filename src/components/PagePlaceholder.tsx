interface PagePlaceholderProps {
  title: string;
  description?: string;
}

export default function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        {description && (
          <p className="text-lg text-gray-600 mb-8">{description}</p>
        )}
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 mt-8">
          <p className="text-gray-500 text-lg">Content Coming Soon</p>
        </div>
      </div>
    </div>
  );
}
