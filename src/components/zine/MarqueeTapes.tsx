const tapes = [
  "-rotate-2 bg-neutral-950 text-rose-200",
  "rotate-2 bg-rose-500 text-neutral-950 [&>div]:[animation-direction:reverse]",
];

// two scrolling tapes crossing in an X; words are doubled so short lists still fill the width
const MarqueeTapes = ({ words }: { words: string[] }) => (
  <div className="relative h-36 -mx-2 my-2 overflow-hidden" aria-hidden>
    {tapes.map((tape) => (
      <div
        key={tape}
        className={`absolute inset-x-0 top-1/2 -translate-y-1/2 py-3 shadow-xl ${tape}`}
      >
        <div className="flex w-max motion-safe:animate-marquee">
          {[0, 1].map((half) => (
            <div
              key={half}
              className="flex shrink-0 items-center gap-8 pr-8 font-serif italic text-3xl whitespace-nowrap"
            >
              {[...words, ...words].map((word, index) => (
                <span key={index} className="flex items-center gap-8">
                  {word}
                  <span className="not-italic text-yellow-300">✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default MarqueeTapes;
