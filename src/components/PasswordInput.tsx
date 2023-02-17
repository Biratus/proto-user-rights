import React, { useCallback, useState } from "react";
import { Eye, EyeOff } from "react-feather";

export const PasswordInput = React.forwardRef<HTMLInputElement>(
  (props, ref) => {
    const [showPwd, setShowPwd] = useState(false);
    const toggleShowPwd = useCallback(() => {
      setShowPwd((prev) => !prev);
    }, []);
    return (
      <div className="flex items-center justify-end">
        <input
          // type="password"
          type={showPwd ? "text" : "password"}
          placeholder="..."
          className="input-bordered input w-full max-w-xs drop-shadow-md"
          ref={ref}
        />
        <span
          className="btn-ghost btn-sm btn-circle btn absolute mr-2 cursor-pointer"
          onClick={toggleShowPwd}
        >
          {showPwd ? <EyeOff /> : <Eye />}
        </span>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
