import "./loadingBar.css";

export default function LoadingBar() {
  return (
    <div className="slider">
      <div className="line"></div>
      <div className="subline inc"></div>
      <div className="subline dec"></div>
    </div>
  );
}
