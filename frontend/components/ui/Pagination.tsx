interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages: (number | "...")[] = []
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    pages.push(1)
    if (currentPage > 4) pages.push("...")
    for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 3) pages.push("...")
    pages.push(totalPages)
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-1.5 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-sm transition"
      >
        Prev
      </button>

      {getPages().map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-2 text-zinc-600 text-sm">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
              p === currentPage
                ? "bg-(--gold)] text-black font-bold"
                : "bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg bg-white/5 border border-white/8 text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-sm transition"
      >
        Next
      </button>
    </div>
  )
}