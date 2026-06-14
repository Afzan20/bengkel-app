import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Modal({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-2xl border-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">
            Logout
          </DialogTitle>

          <DialogDescription className="text-gray-500">
            Are you sure want to logout?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-gray-100 text-black"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-3 rounded-xl bg-[#DEE33E] text-black font-semibold"
          >
            Logout
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}