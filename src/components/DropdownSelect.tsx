"use client";

import { useCallback } from "react";
import DropdownCheck from "./DropdownCheck";

type DropdownSelectProps = {
  items: string[];
  selected: string[];
  onChange: (values: string[]) => void;
  className?: string;
  style?: any;
};
export default function DropdownSelect({
  items,
  selected,
  onChange,
  ...props
}: DropdownSelectProps) {
  const allItems = useCallback(() => onChange(items), [onChange]);
  const noItems = useCallback(() => onChange([]), [onChange]);

  return (
    <div className="flex items-center gap-4" {...props}>
      <div className="space-x-2">
        <button className="btn-xs btn" onClick={allItems}>
          Tous
        </button>
        <button className="btn-xs btn" onClick={noItems}>
          Aucun
        </button>
      </div>

      <div className="input input-sm flex items-center gap-2">
        {selected.length ? (
          selected.length == items.length ? (
            <span className="badge">Tous</span>
          ) : (
            selected.map((s) => (
              <span key={s} className="badge">
                {s}
              </span>
            ))
          )
        ) : (
          <span className="badge">Aucun</span>
        )}
        <DropdownCheck
          items={items.map((comp) => ({
            label: comp,
            value: comp,
            selected:
              selected.length != 0 && selected.length != items.length
                ? selected.includes(comp)
                : false,
          }))}
          onSubmit={onChange}
        />
      </div>
    </div>
  );
}
