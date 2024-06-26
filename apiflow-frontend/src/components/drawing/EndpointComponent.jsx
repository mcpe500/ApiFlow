export default function EndpointComponent({ url }) {
  return (
    <div className="relative w-64 h-64 group">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
        <rect
          x="2"
          y="2"
          width="252"
          height="252"
          fill="none"
          stroke="white"
          strokeWidth="4"
        />
        <line x1="2" y1="40" x2="254" y2="40" stroke="white" strokeWidth="2" />
      </svg>
      <div className="absolute inset-0 flex flex-col">
        <div className="h-10 flex items-center justify-center text-white border-b border-white">
          <span className="text-sm font-mono">{url}</span>
        </div>
        <div className="flex-grow bg-black bg-opacity-50">
          Empty for now, can be filled with data later
        </div>
      </div>
    </div>
  );
}
