import { FC, useState, useEffect, useCallback, useRef, useMemo } from 'react';

interface Props {
  title: string;
  latinTitle?: string;
  body: string;
  latinBody?: string;
  showLatin: boolean;
  onToggleLatin: () => void;
  onBack: () => void;
}

const LINES_PER_STEP = 4;

function splitLines(text: string): string[] {
  return text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
}

/** Splits `lines` into exactly `parts` chunks of roughly equal size. */
function chunk(lines: string[], parts: number): string[][] {
  const size = Math.max(1, Math.ceil(lines.length / parts));
  const chunks: string[][] = [];
  for (let i = 0; i < lines.length; i += size) chunks.push(lines.slice(i, i + size));
  while (chunks.length < parts) chunks.push([]);
  return chunks;
}

/**
 * Walks through a long bilingual prayer (e.g. a litany) a few lines at a
 * time, so it can be prayed responsively rather than read in one block.
 * English and Latin are split into the same number of steps so toggling
 * the language mid-way keeps your place.
 */
const GuidedReader: FC<Props> = ({ title, latinTitle, body, latinBody, showLatin, onToggleLatin, onBack }) => {
  const { enChunks, laChunks, total } = useMemo(() => {
    const enLines = splitLines(body);
    const steps = Math.max(1, Math.ceil(enLines.length / LINES_PER_STEP));
    const laLines = latinBody ? splitLines(latinBody) : [];
    return {
      enChunks: chunk(enLines, steps),
      laChunks: latinBody ? chunk(laLines, steps) : [],
      total: steps,
    };
  }, [body, latinBody]);

  const [stepIndex, setStepIndex] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => setStepIndex((i) => Math.min(i + 1, total - 1)), [total]);
  const goPrev = useCallback(() => setStepIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => { setStepIndex(0); }, [body]);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = 0; }, [stepIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === total - 1;
  const progress = Math.round(((stepIndex + 1) / total) * 100);
  const lines = (showLatin && laChunks.length ? laChunks[stepIndex] : enChunks[stepIndex]) ?? [];

  return (
    <div className="rosary-guide">
      <div className="rosary-header">
        <span className="rosary-set-tag">{showLatin && latinTitle ? latinTitle : title}</span>
        <button className="rosary-reset-btn" onClick={onBack}>↩ Back</button>
      </div>

      <div className="rosary-progress-bar">
        <div className="rosary-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="rosary-step-count">{stepIndex + 1} / {total}</p>

      <div ref={bodyRef} className="verse rosary-body guided-reader-body">
        {lines.map((line, i) => <p key={i}>{line}</p>)}
      </div>

      <div className="buttons">
        <button onClick={goPrev} disabled={isFirst}>← Previous</button>
        {isLast ? (
          <button onClick={onBack}>Finish ✓</button>
        ) : (
          <button onClick={goNext}>Next →</button>
        )}
        {latinBody && <button onClick={onToggleLatin}>{showLatin ? 'Show English' : 'Show Latin'}</button>}
      </div>
    </div>
  );
};

export default GuidedReader;
