export function Logo() {
  return (
    <div className="flex items-center gap-2 font-headline font-bold text-xl text-primary">
       <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M6 26V8.5C6 7.67157 6.67157 7 7.5 7H14.5C15.3284 7 16 7.67157 16 8.5V26M6 26H16M6 26H2M16 26H20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 13H9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 26V7L26 13L30 7V26"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="hidden group-data-[state=expanded]:block">
        AbatementEstimator
      </span>
    </div>
  );
}
