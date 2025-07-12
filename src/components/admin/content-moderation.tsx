"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, X, Flag } from "lucide-react"

// Mock reported content
const mockReports = [
  {
    id: 1,
    type: "skill_description",
    reporter: {
      name: "Sarah Chen",
      photo: "/placeholder.svg?height=32&width=32",
    },
    reported_user: {
      name: "Spam User",
      photo: "/placeholder.svg?height=32&width=32",
    },
    content: "I can teach you how to make $1000/day with this one weird trick! Contact me for more info!!!",
    reason: "Spam/Inappropriate content",
    date: "2024-03-15",
    status: "pending",
    severity: "high",
  },
  {
    id: 2,
    type: "profile_description",
    reporter: {
      name: "Marcus Johnson",
      photo: "/placeholder.svg?height=32&width=32",
    },
    reported_user: {
      name: "Fake Profile",
      photo: "/placeholder.svg?height=32&width=32",
    },
    content:
      "Expert in everything! I know all programming languages, design, marketing, and can solve any problem instantly!",
    reason: "Misleading information",
    date: "2024-03-14",
    status: "pending",
    severity: "medium",
  },
  {
    id: 3,
    type: "message",
    reporter: {
      name: "Elena Rodriguez",
      photo: "/placeholder.svg?height=32&width=32",
    },
    reported_user: {
      name: "Inappropriate User",
      photo: "/placeholder.svg?height=32&width=32",
    },
    content: "Hey beautiful, forget about skill swapping, let's meet up for something else...",
    reason: "Inappropriate behavior",
    date: "2024-03-13",
    status: "resolved",
    severity: "high",
  },
]

type Report = {
  id: number
  type: string
  reporter: { name: string; photo: string }
  reported_user: { name: string; photo: string }
  content: string
  reason: string
  date: string
  status: string
  severity: string
}

export default function ContentModeration() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [moderationNote, setModerationNote] = useState("")

  const handleApprove = (reportId: number) => {
    alert(`Report ${reportId} approved - content will remain`)
    setModerationNote("")
  }

  const handleReject = (reportId: number) => {
    if (!moderationNote.trim()) {
      alert("Please add a moderation note before rejecting content")
      return
    }
    alert(`Report ${reportId} rejected - content removed and user notified`)
    setModerationNote("")
  }

  const getSeverityBadge = (severity: string) => {
    const variants = {
      low: { variant: "secondary" as const, color: "text-green-600 bg-green-100" },
      medium: { variant: "secondary" as const, color: "text-yellow-600 bg-yellow-100" },
      high: { variant: "secondary" as const, color: "text-red-600 bg-red-100" },
    }

    const config = variants[severity as keyof typeof variants]
    return (
      <Badge variant={config.variant} className={config.color}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, color: "text-orange-600 bg-orange-100" },
      resolved: { variant: "secondary" as const, color: "text-green-600 bg-green-100" },
    }

    const config = variants[status as keyof typeof variants]
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      skill_description: "Skill Description",
      profile_description: "Profile Description",
      message: "Message",
    }
    return labels[type as keyof typeof labels] || type
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5" />
          Content Moderation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reporter</TableHead>
                <TableHead>Reported User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={report.reporter.photo || "/placeholder.svg"} alt={report.reporter.name} />
                        <AvatarFallback className="text-xs">
                          {report.reporter.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{report.reporter.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={report.reported_user.photo || "/placeholder.svg"}
                          alt={report.reported_user.name}
                        />
                        <AvatarFallback className="text-xs">
                          {report.reported_user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{report.reported_user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{getTypeLabel(report.type)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{report.reason}</span>
                  </TableCell>
                  <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                  <TableCell className="text-sm">{report.date}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Content Moderation Review</DialogTitle>
                            <DialogDescription>Review reported content and take appropriate action</DialogDescription>
                          </DialogHeader>

                          {selectedReport && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-2">Reporter</h4>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={selectedReport.reporter.photo || "/placeholder.svg"}
                                        alt={selectedReport.reporter.name}
                                      />
                                      <AvatarFallback>
                                        {selectedReport.reporter.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{selectedReport.reporter.name}</span>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-2">Reported User</h4>
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={selectedReport.reported_user.photo || "/placeholder.svg"}
                                        alt={selectedReport.reported_user.name}
                                      />
                                      <AvatarFallback>
                                        {selectedReport.reported_user.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span>{selectedReport.reported_user.name}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Reported Content</h4>
                                <div className="p-3 bg-gray-50 rounded-lg border">
                                  <p className="text-sm">{selectedReport.content}</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Type:</span>
                                  <p>{getTypeLabel(selectedReport.type)}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Reason:</span>
                                  <p>{selectedReport.reason}</p>
                                </div>
                                <div>
                                  <span className="font-medium">Severity:</span>
                                  <div className="mt-1">{getSeverityBadge(selectedReport.severity)}</div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2">Moderation Note</h4>
                                <Textarea
                                  placeholder="Add a note about your decision..."
                                  value={moderationNote}
                                  onChange={(e) => setModerationNote(e.target.value)}
                                  rows={3}
                                />
                              </div>

                              <div className="flex gap-2 pt-4">
                                <Button
                                  onClick={() => handleApprove(selectedReport.id)}
                                  className="flex-1 bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Approve Content
                                </Button>
                                <Button
                                  onClick={() => handleReject(selectedReport.id)}
                                  variant="destructive"
                                  className="flex-1"
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Remove Content
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
