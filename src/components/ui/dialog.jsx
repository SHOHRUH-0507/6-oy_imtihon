import React from "react"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function Dialog({ open, onOpenChange, children }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          
          {children}
        </div>
      )}
    </>
  )
}

export function DialogTrigger({ children, onClick }) {
  return React.cloneElement(children, {
    onClick: (e) => {
      e.stopPropagation()
      onClick?.()
    },
  })
}

export function DialogContent({ className, children, showCloseButton = true, onClose }) {
  return (
    <div
      className={cn(
        "relative z-50 w-full max-w-lg bg-white p-6 rounded-lg shadow-xl animate-in zoom-in-95",
        className
      )}
    >
      {showCloseButton && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-sm opacity-70 hover:opacity-100 transition"
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
      {children}
    </div>
  )
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />
}

export function DialogFooter({ className, ...props }) {
  return <div className={cn("flex justify-end gap-2", className)} {...props} />
}

export function DialogTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />
}

export function DialogDescription({ className, ...props }) {
  return <p className={cn("text-sm text-gray-600", className)} {...props} />
}
