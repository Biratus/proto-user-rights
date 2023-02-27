"use client";

import { PropsWithoutRef } from "react";

type BooleanSelectProps = {
  label: string;
  value: boolean | undefined;
  values: string[];
  onChange: (value: boolean) => void;
  onReset: () => void;
};
export default function BooleanSelect({
  label,
  value,
  values: [forTrue, forFalse],
  onChange,
  onReset,
  ...props
}: BooleanSelectProps & PropsWithoutRef<any>) {
  return (
    <div className="form-control" {...props}>
      <label className="label justify-end">
        <button
          className={`btn-xs btn ${value === undefined ? "btn-disabled" : ""}`}
          onClick={() => onReset()}
        >
          tous
        </button>
      </label>
      <select
        className="select-bordered select"
        onChange={(evt) => onChange(evt.target.value == "true")}
        value={value === undefined ? "" : value ? "true" : "false"}
      >
        <option disabled value={""}>
          {label}
        </option>
        <option value="true">{forTrue}</option>
        <option value="false">{forFalse}</option>
      </select>
    </div>
  );
}
