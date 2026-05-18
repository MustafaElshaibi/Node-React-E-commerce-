import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner"

export default function ErrorToaster() {
  const lastError = useSelector((state) => state.error.lastError);
  const dispatch = useDispatch()

  useEffect(() => {
    if (lastError?.message) {
      toast.error(lastError.message, { toastId: lastError.timestamp, action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          } });
    }
  }, [lastError, dispatch]);

  return null;
}