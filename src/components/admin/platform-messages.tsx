"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Send, MessageSquare, AlertTriangle, Info, CheckCircle } from "lucide-react"

// Mock platform messages
const mockMessages = [
  {
    id: 1,
    title: "Platform Maintenance Scheduled",
    content: "We will be performing scheduled maintenance on March 20th from 2:00 AM to 4:00 AM EST.",
    type: "maintenance",
    status: "sent",
    sentDate: "2024-03-15",
    recipients: 1247,
  },
  {
    id: 2,
    title: "New Feature: Skill Verification",
    content:
      "We're excited to announce our new skill verification system! Users can now verify their skills through our partner platforms.",
    type: "feature",
    status: "sent",
    sentDate: "2024-03-10",
    recipients: 1247,
  },
  {
    id: 3,
    title: "Community Guidelines Update",
    content:
      "We've updated our community guidelines to ensure a better experience for all users. Please review the changes in your settings.",
    type: "announcement",
    status: "draft",
    sentDate: null,
    recipients: 0,
  },
]

export default function PlatformMessages() {
  const [newMessage, setNewMessage] = useState({
    title: "",
    content: "",
    type: "announcement",
  })

  const handleSendMessage = () => {
    if (!newMessage.title.trim() || !newMessage.content.trim()) {
      alert("Please fill in all required fields")
      return
    }

    alert("Platform-wide message sent successfully!")
    setNewMessage({ title: "", content: "", type: "announcement" })
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      announcement: { variant: "secondary" as const, color: "text-blue-600 bg-blue-100", icon: Info },
      maintenance: { variant: "secondary" as const, color: "text-orange-600 bg-orange-100", icon: AlertTriangle },
      feature: { variant: "secondary" as const, color: "text-green-600 bg-green-100", icon: CheckCircle },
    }

    const config = variants[type as keyof typeof variants]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      sent: { variant: "secondary" as const, color: "text-green-600 bg-green-100" },
      draft: { variant: "secondary" as const, color: "text-gray-600 bg-gray-100" },
    }

    const config = variants[status as keyof typeof variants]
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Send New Message */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Send Platform Message
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Message Title *</Label>
              <Input
                id="title"
                placeholder="Enter message title..."
                value={newMessage.title}
                onChange={(e) => setNewMessage({ ...newMessage, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Message Type</Label>
              <Select value={newMessage.type} onValueChange={(value) => setNewMessage({ ...newMessage, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="feature">Feature Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Message Content *</Label>
            <Textarea
              id="content"
              placeholder="Enter your message content..."
              value={newMessage.content}
              onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-gray-600">
              This message will be sent to all <strong>1,247</strong> active users
            </p>
            <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Message History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Message History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Sent Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{message.title}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{message.content.substring(0, 60)}...</p>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(message.type)}</TableCell>
                    <TableCell>{getStatusBadge(message.status)}</TableCell>
                    <TableCell>
                      <span className="font-medium">{message.recipients.toLocaleString()}</span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {message.sentDate || <span className="text-gray-400">Not sent</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {message.status === "draft" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Send
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
