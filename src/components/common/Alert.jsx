import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function Alert({
  type = "success",
  message,
}) {

  const styles = {
    success: {
      bg: "bg-green-100",
      text: "text-green-700",
      icon: <CheckCircle size={18} />,
    },

    error: {
      bg: "bg-red-100",
      text: "text-red-700",
      icon: <AlertCircle size={18} />,
    },

    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      icon: <AlertTriangle size={18} />,
    },

    info: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      icon: <Info size={18} />,
    },
  };

  return (
    <div
      className={`${styles[type].bg} ${styles[type].text} flex items-center gap-3 p-4 rounded-xl text-sm font-medium`}
    >
      {styles[type].icon}

      <p>{message}</p>
    </div>
  );
}