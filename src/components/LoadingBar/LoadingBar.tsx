import "./loadingBar.css";

export default function LoadingBar() {
  return (
    <div className="absolute h-2 w-full overflow-x-hidden">
      <div
        className="absolute h-2 bg-ajcBlue opacity-40"
        style={{ width: "150%" }}
      ></div>
      <div className="inc absolute h-2 bg-ajcBlue-light"></div>
      <div className="dec absolute h-2 bg-ajcBlue-light"></div>
    </div>
  );
}
