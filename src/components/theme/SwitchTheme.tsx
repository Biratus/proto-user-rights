import { Moon, Sun } from "react-feather";

export default function SwitchTheme({}) {
  return (
    <label className="swap-rotate swap btn-ghost btn-secondary btn-circle btn p-1">
      <input type="checkbox" data-toggle-theme="light,dark" />

      <Sun className="swap-on fill-current" />

      <Moon className="swap-off fill-current" />
    </label>
  );
}
