"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Ban, Eye, CheckCircle } from "lucide-react"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    photo: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2024-01-15",
    swapsCompleted: 12,
    reports: 0,
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    photo: "/placeholder.svg?height=40&width=40",
    status: "active",
    joinDate: "2024-02-20",
    swapsCompleted: 8,
    reports: 1,
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Spam User",
    email: "spam@example.com",
    photo: "/placeholder.svg?height=40&width=40",
    status: "flagged",
    joinDate: "2024-03-01",
    swapsCompleted: 0,
    reports: 5,
    lastActive: "3 days ago",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    email: "elena.r@example.com",
    photo: "/placeholder.svg?height=40&width=40",
    status: "banned",
    joinDate: "2024-01-10",
    swapsCompleted: 3,
    reports: 8,
    lastActive: "1 week ago",
  },
]

type User = {
  id: number
  name: string
  email: string
  photo: string
  status: string
  joinDate: string
  swapsCompleted: number
  reports: number
  lastActive: string
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleBanUser = (userId: number) => {
    alert(`User ${userId} has been banned`)
  }

  const handleUnbanUser = (userId: number) => {
    alert(`User ${userId} has been unbanned`)
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "secondary" as const, color: "text-green-600 bg-green-100" },
      flagged: { variant: "secondary" as const, color: "text-orange-600 bg-orange-100" },
      banned: { variant: "secondary" as const, color: "text-red-600 bg-red-100" },
    }

    const config = variants[status as keyof typeof variants]
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          User Management
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Swaps</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.swapsCompleted}</TableCell>
                  <TableCell>
                    {user.reports > 0 ? (
                      <span className="text-red-600 font-medium">{user.reports}</span>
                    ) : (
                      <span className="text-gray-500">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{user.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>User Details</DialogTitle>
                            <DialogDescription>Detailed information about {user.name}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-lg font-semibold">{user.name}</h3>
                                <p className="text-gray-600">{user.email}</p>
                                {getStatusBadge(user.status)}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Join Date:</span>
                                <p>{user.joinDate}</p>
                              </div>
                              <div>
                                <span className="font-medium">Swaps Completed:</span>
                                <p>{user.swapsCompleted}</p>
                              </div>
                              <div>
                                <span className="font-medium">Reports:</span>
                                <p>{user.reports}</p>
                              </div>
                              <div>
                                <span className="font-medium">Last Active:</span>
                                <p>{user.lastActive}</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {user.status === "banned" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnbanUser(user.id)}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBanUser(user.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Ban className="h-4 w-4" />
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
  )
}
