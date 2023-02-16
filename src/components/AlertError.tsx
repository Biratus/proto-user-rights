import { AlertCircle } from "react-feather";

export default function AlertError({ message }: { message: string }) {
  return (
    <div className="alert alert-error w-4/5 shadow-lg">
      <div>
        <AlertCircle />
        <span>{message}</span>
      </div>
    </div>
  );
}
