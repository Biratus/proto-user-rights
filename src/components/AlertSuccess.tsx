import { CheckCircle } from "react-feather";

export default function AlertSuccess({ message }: { message: string }) {
  return (
    <div className="alert alert-success shadow-lg">
      <div>
        <CheckCircle />
        <span>{message}</span>
      </div>
    </div>
  );
}
