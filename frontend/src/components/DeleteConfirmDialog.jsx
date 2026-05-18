import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"

export default function DeleteConfirmDialog({children, handler}) {
  return (
    <Dialog>
                <DialogTrigger asChild>
                {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Confirm Delete </DialogTitle>
                    <DialogDescription>
                      Are you sure to delete this 
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handler} type="submit">Delete</Button>
                  </DialogFooter>
                </DialogContent>
            </Dialog>
  )
}
