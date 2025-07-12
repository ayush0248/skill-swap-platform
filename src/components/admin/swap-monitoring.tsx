"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, AlertTriangle, CheckCircle, Clock, X } from "lucide-react"
import SkillTag from "@/components/skill-tag"

// Mock swap data
const mockSwaps = [
  {
    id: 1,
    participants: [
      { name: "Sarah Chen", photo: "/placeholder.svg?height=32&width=32" },
      { name: "Marcus Johnson", photo: "/placeholder.svg?height=32&width=32" },
    ],
    skills: { offered: "React", wanted: "Python" },
    status: "pending",
    startDate: "2024-03-15",
    lastActivity: "2 hours ago",
    messages: 12,
  },
  {
    id: 2,
    participants: [
      { name: "Elena Rodriguez", photo: "/placeholder.svg?height=32&width=32" },
      { name: "David Kim", photo: "/placeholder.svg?height=32&width=32" },
    ],
    skills: { offered: "Design", wanted: "Node.js" },
    status: "active",
    startDate: "2024-03-10",
    lastActivity: "1 day ago",
    messages: 28,
  },
  {
    id: 3,
    participants: [
      { name: "Priya Patel", photo: "/placeholder.svg?height=32&width=32" },
      { name: "Alex Thompson", photo: "/placeholder.svg?height=32&width=32" },
    ],
    skills: { offered: "Marketing", wanted: "Photography" },
    status: "completed",
    startDate: "2024-02-20",
    lastActivity: "1 week ago",
    messages: 45,
  },
  {
    id: 4,
    participants: [
      { name: "John Doe", photo: "/placeholder.svg?height=32&width=32" },
      { name: "Jane Smith", photo: "/placeholder.svg?height=32&width=32" },
    ],
    skills: { offered: "JavaScript", wanted: "UI/UX" },
    status: "cancelled",
    startDate: "2024-03-01",
    lastActivity: "3 days ago",
    messages: 8,
  },
]

export default function SwapMonitoring() {
  const [selectedTab, setSelectedTab] = useState("all")

  const filterSwaps = (status: string) => {
    if (status === "all") return mockSwaps
    return mockSwaps.filter((swap) => swap.status === status)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, color: "text-yellow-600 bg-yellow-100", icon: Clock },
      active: { variant: "secondary" as const, color: "text-blue-600 bg-blue-100", icon: Eye },
      completed: { variant: "secondary" as const, color: "text-green-600 bg-green-100", icon: CheckCircle },
      cancelled: { variant: "secondary" as const, color: "text-red-600 bg-red-100", icon: X },
    }

    const config = variants[status as keyof typeof variants]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getSwapStats = () => {
    return {
      total: mockSwaps.length,
      pending: mockSwaps.filter((s) => s.status === "pending").length,
      active: mockSwaps.filter((s) => s.status === "active").length,
      completed: mockSwaps.filter((s) => s.status === "completed").length,
      cancelled: mockSwaps.filter((s) => s.status === "cancelled").length,
    }
  }

  const stats = getSwapStats()

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-600">Total Swaps</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
            <p className="text-sm text-gray-600">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
            <p className="text-sm text-gray-600">Cancelled</p>
          </CardContent>
        </Card>
      </div>

      {/* Swap Monitoring Table */}
      <Card>
        <CardHeader>
          <CardTitle>Swap Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Swaps</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedTab}>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Participants</TableHead>
                      <TableHead>Skills Exchange</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead>Messages</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterSwaps(selectedTab).map((swap) => (
                      <TableRow key={swap.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {swap.participants.map((participant, index) => (
                              <div key={index} className="flex items-center gap-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={participant.photo || "/placeholder.svg"} alt={participant.name} />
                                  <AvatarFallback className="text-xs">
                                    {participant.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm">{participant.name}</span>
                                {index === 0 && <span className="text-gray-400">↔</span>}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <SkillTag skill={swap.skills.offered} variant="offered" size="sm" />
                            <span className="text-gray-400">→</span>
                            <SkillTag skill={swap.skills.wanted} variant="wanted" size="sm" />
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(swap.status)}</TableCell>
                        <TableCell className="text-sm">{swap.startDate}</TableCell>
                        <TableCell className="text-sm text-gray-500">{swap.lastActivity}</TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">{swap.messages}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {swap.status === "active" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-orange-600 border-orange-200 bg-transparent"
                              >
                                <AlertTriangle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
