"use client";
import { Check, MoreHorizontal } from "react-feather";

type Item<T> = {
  label: string;
  value: T;
  selected?: boolean;
};

interface DropDownCheckProps<T> {
  items: Item<T>[];
  size?: string;
  side?: string;
  onSubmit: (items: T[]) => void;
}
export default function DropdownCheck<T>({
  items,
  size = "md",
  side = "right",
  onSubmit,
}: DropDownCheckProps<T>) {
  const updatingItems = items.map((i) => ({ ...i })); // Besoin de la copie sinon c'est la reference qui est mise à jour !

  const select = (index: number, checked: boolean) => {
    updatingItems[index].selected = checked;
  };

  const submitAll = () => {
    /**@ts-ignore */
    document.activeElement!.blur();
    onSubmit(updatingItems.filter((i) => i.selected).map((i) => i.value));
  };
  return (
    <div className={`dropdown-${side} dropdown flex items-center`}>
      <label
        tabIndex={0}
        // className={`btn-outline btn-primary btn-${size} btn-square btn m-1`}
        className={`badge badge-${size} cursor-pointer`}
      >
        {/* <Plus /> */}
        <MoreHorizontal />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content rounded-box flex flex-col gap-4 bg-base-300 p-2 shadow"
      >
        <div className="flex max-h-64 w-max snap-y flex-col gap-2 overflow-y-scroll p-2">
          {updatingItems.map(({ label, value, selected }, i) => (
            <div key={i} className="form-control">
              <label className="label cursor-pointer gap-3">
                <input
                  type="checkbox"
                  defaultChecked={selected}
                  className="checkbox checkbox-sm"
                  onChange={(evt) => select(i, evt.target.checked)}
                />
                <span className="label-text">{label}</span>
              </label>
            </div>
          ))}
        </div>
        <label
          className="btn-success btn-sm btn-circle btn self-end"
          onClick={submitAll}
        >
          <Check />
        </label>
      </div>
    </div>
  );
}
