import { FC, useState, useEffect } from 'react';

interface Intention {
  id: string;
  text: string;
  answered: boolean;
}

interface Props {
  onBack: () => void;
}

const STORAGE_KEY = 'prayerIntentions';

function loadIntentions(): Intention[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const Intentions: FC<Props> = ({ onBack }) => {
  const [intentions, setIntentions] = useState<Intention[]>(loadIntentions);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(intentions));
  }, [intentions]);

  const addIntention = () => {
    const text = draft.trim();
    if (!text) return;
    setIntentions((prev) => [{ id: makeId(), text, answered: false }, ...prev]);
    setDraft('');
  };

  const toggleAnswered = (id: string) => {
    setIntentions((prev) => prev.map((i) => (i.id === id ? { ...i, answered: !i.answered } : i)));
  };

  const remove = (id: string) => {
    setIntentions((prev) => prev.filter((i) => i.id !== id));
  };

  const pending = intentions.filter((i) => !i.answered);
  const answered = intentions.filter((i) => i.answered);

  return (
    <div className="intentions">
      <div className="rosary-header">
        <span className="rosary-set-tag">Prayer Intentions</span>
        <button className="rosary-reset-btn" onClick={onBack}>↩ Back</button>
      </div>

      <p className="intentions-intro">
        Hold these people and needs before the Lord. Everything here stays on this device.
      </p>

      <div className="intentions-form">
        <input
          type="text"
          placeholder="Add an intention to pray for…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addIntention(); }}
          className="search-input"
        />
        <button onClick={addIntention}>Add</button>
      </div>

      {intentions.length === 0 && (
        <p className="intentions-empty">Nothing here yet — add someone or something to carry in prayer 🙏</p>
      )}

      {pending.length > 0 && (
        <ul className="intentions-list">
          {pending.map((i) => (
            <li key={i.id}>
              <button className="intention-check" onClick={() => toggleAnswered(i.id)} title="Mark as answered">○</button>
              <span className="intention-text">{i.text}</span>
              <button className="intention-remove" onClick={() => remove(i.id)} title="Remove">✕</button>
            </li>
          ))}
        </ul>
      )}

      {answered.length > 0 && (
        <>
          <p className="intentions-subheading">Answered — Deo gratias 🕊</p>
          <ul className="intentions-list intentions-answered">
            {answered.map((i) => (
              <li key={i.id}>
                <button className="intention-check answered" onClick={() => toggleAnswered(i.id)} title="Mark as still praying">✓</button>
                <span className="intention-text">{i.text}</span>
                <button className="intention-remove" onClick={() => remove(i.id)} title="Remove">✕</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Intentions;
