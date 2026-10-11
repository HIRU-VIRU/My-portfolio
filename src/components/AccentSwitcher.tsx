import { useEffect, useRef, useState } from "react";
import { ACCENTS, applyAccent, getAccent } from "../utils/accent";
import "./styles/AccentSwitcher.css";

const AccentSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(getAccent);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (hex: string) => {
    applyAccent(hex);
    setCurrent(hex);
  };

  return (
    <div className="accent-switcher" ref={ref}>
      <button
        className="accent-toggle"
        aria-label="Change accent color"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        data-cursor="disable"
      >
        <span className="accent-toggle-dot" />
      </button>
      {open && (
        <div className="accent-popover" role="menu">
          <span className="accent-popover-label">Accent</span>
          <div className="accent-swatches">
            {ACCENTS.map((a) => (
              <button
                key={a.hex}
                role="menuitemradio"
                aria-checked={current === a.hex}
                aria-label={a.name}
                title={a.name}
                className="accent-swatch"
                style={{ "--swatch": a.hex } as React.CSSProperties}
                onClick={() => choose(a.hex)}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccentSwitcher;
