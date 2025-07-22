import React, { useState, useRef, useEffect } from "react"
import { ChevronDownIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function Select({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  className,
}) {
  const [open, setOpen] = useState(false)
  const selectRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleSelect = (val) => {
    onChange?.(val)
    setOpen(false)
  }

  const selectedLabel = options.find((opt) => opt.value === value)?.label

  return (
    <div
      ref={selectRef}
      className={cn("relative w-48 text-sm", className)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className={cn(!value && "text-muted-foreground")}>
          {selectedLabel || placeholder}
        </span>
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={cn(
                "flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-accent hover:text-accent-foreground",
                value === opt.value && "bg-accent text-accent-foreground"
              )}
            >
              <span>{opt.label}</span>
              {value === opt.value && <CheckIcon className="h-4 w-4" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
