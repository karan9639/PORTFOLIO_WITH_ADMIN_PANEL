export default function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="glass-card rounded-3xl px-8 py-6 shadow-soft">
        <div className="animate-pulse text-lg font-semibold text-white">Loading portfolio…</div>
      </div>
    </div>
  );
}
