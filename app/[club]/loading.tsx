export default function ClubLoading() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #1f2937, #111827, #1f2937)",
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-16 pt-8">
          <div className="h-16 md:h-20 lg:h-24 w-64 md:w-80 mx-auto bg-white/20 rounded-lg animate-pulse mb-4" />
          <div className="w-24 h-1 bg-white/30 mx-auto my-4 rounded-sm" />
          <div className="h-6 w-32 mx-auto bg-white/20 rounded animate-pulse mt-4" />
        </header>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl flex items-center justify-center w-full sm:w-auto sm:min-w-[280px] sm:max-w-sm min-h-[120px] bg-white/10 animate-pulse"
            >
              <div className="h-6 w-32 bg-white/20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
