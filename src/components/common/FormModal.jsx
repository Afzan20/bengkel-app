import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function FormModal({
  open,
  onClose,
  children,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-2xl border-none max-w-4xl max-h-[90vh] overflow-y-auto">
        {children}
      </DialogContent>
    </Dialog>
  );
}
