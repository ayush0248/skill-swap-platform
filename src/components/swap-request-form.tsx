"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Clock, ArrowRight } from "lucide-react"
import SkillTag from "./skill-tag"

interface SwapRequest {
  id: number
  type: "sent" | "received"
  user: {
    name: string
    photo: string
  }
  skillOffered: string
  skillWanted: string
  message: string
  status: "pending" | "accepted" | "rejected"
  date: string
}

interface SwapRequestCardProps {
  request: SwapRequest
  onAccept: (id: number) => void
  onReject: (id: number) => void
}

export default function SwapRequestCard({ request, onAccept, onReject }: SwapRequestCardProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      accepted: { variant: "secondary" as const, icon: Check, color: "text-green-600" },
      rejected: { variant: "secondary" as const, icon: X, color: "text-red-600" },
    }

    const config = variants[status as keyof typeof variants]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className={`${config.color} bg-opacity-10`}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={request.user.photo || "/placeholder.svg"} alt={request.user.name} />
            <AvatarFallback>
              {request.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold">{request.user.name}</h3>
                <p className="text-sm text-gray-500">
                  {request.type === "sent" ? "You requested" : "Requested from you"} • {request.date}
                </p>
              </div>
              {getStatusBadge(request.status)}
            </div>

            <div className="flex items-center gap-2 mb-3">
              <SkillTag skill={request.skillOffered} variant="offered" size="sm" />
              <ArrowRight className="h-4 w-4 text-gray-400" />
              <SkillTag skill={request.skillWanted} variant="wanted" size="sm" />
            </div>

            <p className="text-gray-600 text-sm mb-4">{request.message}</p>

            {request.type === "received" && request.status === "pending" && (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => onAccept(request.id)} className="bg-green-600 hover:bg-green-700">
                  <Check className="h-4 w-4 mr-1" />
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReject(request.id)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
