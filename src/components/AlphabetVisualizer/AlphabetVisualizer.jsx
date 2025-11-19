import "./AlphabetVisualizer.css";

export const AlphabetVisualizer = ({ alphabet, activeAlphabetIndex, resultAlphabetIndex }) => (
    <div className="alphabet-visualizer">
        {alphabet.split("").map((ch, i) => (
            <span
                key={i}
                className={
                    i === activeAlphabetIndex
                        ? "alphabet-visualizer__char alphabet-visualizer__active"
                        : i === resultAlphabetIndex
                            ? "alphabet-visualizer__char alphabet-visualizer__result"
                            : "alphabet-visualizer__char"
                }
            >
                {ch}
            </span>
        ))}
    </div>
);
