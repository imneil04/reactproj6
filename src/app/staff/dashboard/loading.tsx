export default function Loading() {

  return (
    <div className="p-6 space-y-4 animate-pulse max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="h-8 w-48 bg-gray-200 rounded-lg" />

        {/* Message cards */}
        {[1, 2, 3].map((item) => (
            <div
            key={item}
            className="
                bg-white rounded-xl border
                p-4 space-y-3 shadow-sm
            "
            >
            <div className="flex justify-between">
                <div className="h-4 w-40 bg-gray-200 rounded" />

                <div className="h-4 w-16 bg-gray-200 rounded-full" />
            </div>

            <div className="h-3 w-24 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
}