import { useEffect, useRef, useState } from "react";
import "./CustomSelect.css";

interface Props {
  id: string;
  value: string; // YYYY-MM-DD
  min: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  lang: "VI" | "EN" | string;
}

const pad = (n: number) => String(n).padStart(2, "0");
const toStr = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return { y, m: m - 1, d };
};

export default function CustomDatePicker({ id, value, min, onChange, lang }: Props) {
  const en = lang === "EN";
  const [open, setOpen] = useState(false);
  const base = parse(value || min);
  const [view, setView] = useState({ y: base.y, m: base.m });
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const toggle = () => {
    if (!open) {
      const b = parse(value || min);
      setView({ y: b.y, m: b.m });
    }
    setOpen(!open);
  };

  const minP = parse(min);
  const canPrev = view.y > minP.y || (view.y === minP.y && view.m > minP.m);
  const shift = (delta: number) => {
    const d = new Date(view.y, view.m + delta, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };

  const monthName = en
    ? new Date(view.y, view.m, 1).toLocaleString("en-US", { month: "long" })
    : `Tháng ${view.m + 1}`;
  const weekdays = en ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] : ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  const first = new Date(view.y, view.m, 1);
  const offset = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(view.y, view.m + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const display = value
    ? (() => { const p = parse(value); return `${pad(p.d)}/${pad(p.m + 1)}/${p.y}`; })()
    : en ? "Pick a date" : "Chọn ngày";

  return (
    <div className={`cselect${open ? " open" : ""}`} ref={rootRef}>
      <button
        type="button"
        id={id}
        className="cselect-btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={toggle}
      >
        <span className="cselect-value">{display}</span>
        <svg className="cselect-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" />
        </svg>
      </button>
      {open && (
        <div className="cdate" role="dialog" aria-label={en ? "Choose date" : "Chọn ngày"}>
          <div className="cdate-head">
            <button type="button" className="cdate-nav" onClick={() => shift(-1)} disabled={!canPrev} aria-label={en ? "Previous month" : "Tháng trước"}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <b>{monthName}{en ? "" : ","} {view.y}</b>
            <button type="button" className="cdate-nav" onClick={() => shift(1)} aria-label={en ? "Next month" : "Tháng sau"}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
          </div>
          <div className="cdate-grid cdate-wd">
            {weekdays.map((w) => <span key={w}>{w}</span>)}
          </div>
          <div className="cdate-grid">
            {cells.map((d, i) => {
              if (d === null) return <span key={`e${i}`} />;
              const s = toStr(view.y, view.m, d);
              const disabled = s < min;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={disabled}
                  className={`cdate-day${s === value ? " selected" : ""}${s === min ? " today" : ""}`}
                  onClick={() => { onChange(s); setOpen(false); }}
                >
                  {d}
                </button>
              );
            })}
          </div>
          <button type="button" className="cdate-today" onClick={() => { onChange(min); setOpen(false); }}>
            {en ? "Today" : "Hôm nay"}
          </button>
        </div>
      )}
    </div>
  );
}
