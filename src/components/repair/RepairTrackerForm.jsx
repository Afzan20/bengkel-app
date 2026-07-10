import { useEffect, useState } from "react";

export default function RepairTrackerForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [progress, setProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Waiting");
  const [notes, setNotes] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [completedAt, setCompletedAt] = useState("");

  useEffect(() => {
    if (initialData) {
      setProgress(initialData.progress || 0);
      setCurrentStatus(initialData.current_status || "Waiting");
      setNotes(initialData.notes || "");
      setStartedAt(initialData.started_at || "");
      setCompletedAt(initialData.completed_at || "");
    }
  }, [initialData]);

  useEffect(() => {
    if (progress == 0) {
      setCurrentStatus("Waiting");
    } else if (progress <= 25) {
      setCurrentStatus("Inspection");
    } else if (progress <= 75) {
      setCurrentStatus("Repair");
    } else if (progress < 100) {
      setCurrentStatus("Final Check");
    } else {
      setCurrentStatus("Completed");
    }
  }, [progress]);

  function handleSave(e) {
    e.preventDefault();

    onSubmit({
      progress: Number(progress),
      current_status: currentStatus,
      notes,
      started_at: startedAt || null,
      completed_at:
        Number(progress) === 100
          ? completedAt || new Date().toISOString()
          : null,
      updated_at: new Date().toISOString(),
    });
  }

  return (
    <form
      onSubmit={handleSave}
      className="p-6 w-full max-w-2xl"
    >
      <h2 className="text-2xl font-bold mb-6">
        Update Repair Progress
      </h2>

      <div className="space-y-5">

        <div>
          <label className="font-medium">
            Progress ({progress}%)
          </label>

          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={progress}
            onChange={(e) =>
              setProgress(e.target.value)
            }
            className="w-full mt-3"
          />
        </div>

        <div>
          <label className="font-medium">
            Current Status
          </label>

          <input
            type="text"
            value={currentStatus}
            readOnly
            className="w-full border rounded-lg p-3 mt-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="font-medium">
            Started At
          </label>

          <input
            type="datetime-local"
            value={startedAt}
            onChange={(e) =>
              setStartedAt(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">
            Completed At
          </label>

          <input
            type="datetime-local"
            value={completedAt}
            onChange={(e) =>
              setCompletedAt(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
            disabled={progress < 100}
          />
        </div>

        <div>
          <label className="font-medium">
            Notes
          </label>

          <textarea
            rows="4"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Repair notes..."
          />
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 rounded-xl bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-[#DEE33E] font-semibold"
        >
          Save Changes
        </button>

      </div>

    </form>
  );
}