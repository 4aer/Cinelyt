export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full py-20">
      <div className="w-10 h-10 border-4 border-zinc-600 border-t-red-500 rounded-full animate-spin" />
    </div>
  )
}