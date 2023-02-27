"use client";
import cn from "classnames";
import ReactSlider, { ReactSliderProps } from "react-slider";
const DoubleRangeInput = <T extends number | readonly number[]>({
  color = "primary",
  ..._props
}: ReactSliderProps<T> & { color?: string }) => {
  const bg = `bg-${color}`;
  return (
    <ReactSlider
      {..._props}
      renderThumb={(props, state) => (
        <div
          {...props}
          className={`aspect-square h-full rounded-full ${bg} text-${color}-content flex cursor-grab items-center justify-center text-xs`}
          key={props.key}
        >
          {state.valueNow}
        </div>
      )}
      renderTrack={(props, state) => {
        const isLast = state.index === 2;
        const isFirst = state.index === 0;
        return (
          <div
            {...props}
            className={cn({
              "top-1/2 h-1/4 -translate-y-1/2 rounded-full": true,
              "bg-neutral-content": isFirst || isLast,
              [bg]: !isFirst && !isLast,
            })}
            key={props.key}
          ></div>
        );
      }}
    />
  );
};
export default DoubleRangeInput;
