export default function LeavesBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft background similar to image */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fcfdfc] to-[#f4fbf4] opacity-90" />
    </div>
  );
}
