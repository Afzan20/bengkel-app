export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}) {
  const variants = {
    primary: "bg-[#DEE33E] hover:bg-[#9FA324] text-black",
    secondary: "bg-[#9FA324] hover:bg-[#8d921f] text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-black",
  };

  return (
    <button
      onClick={onClick}
      className={`w-full py-4 rounded-lg font-bold transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}