export default function Modal({
  open,
  onClose,
  onConfirm,
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-2xl w-full max-w-md">

        <h1 className="text-2xl font-bold">
          Logout
        </h1>

        <p className="text-gray-500 mt-3">
          Are you sure want to logout?
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-3 rounded-xl bg-[#DDE33E] font-semibold"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}