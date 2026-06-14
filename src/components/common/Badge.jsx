export default function Badge({
  type = "success",
  text,
}) {

  const styles = {
    success: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    warning: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`${styles[type]} px-3 py-1 rounded-full text-xs font-semibold`}
    >
      {text}
    </span>
  );
}