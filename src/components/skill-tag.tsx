"use client"

import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillTagProps {
  skill: string
  variant?: "offered" | "wanted"
  size?: "sm" | "default"
  removable?: boolean
  onRemove?: () => void
}

export default function SkillTag({
  skill,
  variant = "offered",
  size = "default",
  removable = false,
  onRemove,
}: SkillTagProps) {
  const baseClasses = cn("inline-flex items-center gap-1", size === "sm" ? "text-xs px-2 py-1" : "text-sm px-3 py-1")

  const variantClasses = {
    offered: "bg-green-100 text-green-800 hover:bg-green-200",
    wanted: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  }

  return (
    <Badge variant="secondary" className={cn(baseClasses, variantClasses[variant])}>
      {skill}
      {removable && onRemove && (
        <button onClick={onRemove} className="ml-1 hover:bg-black/10 rounded-full p-0.5">
          <X className="h-3 w-3" />
        </button>
      )}
    </Badge>
  )
}
