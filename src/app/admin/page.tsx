"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, AlertTriangle, Download, TrendingUp, Eye } from "lucide-react"
import AdminNavigation from "@/components/admin/admin-navigation"
import UserManagement from "@/components/admin/user-management"
import SwapMonitoring from "@/components/admin/swap-monitoring"
import ContentModeration from "@/components/admin/content-moderation"
import PlatformMessages from "@/components/admin/platform-messages"
import ReportsDownload from "@/components/admin/reports-download"

// Mock admin stats
const adminStats = {
  totalUsers: 1247,
  activeSwaps: 89,
  pendingReports: 12,
  totalSwapsCompleted: 2156,
  newUsersThisWeek: 34,
  reportsResolvedToday: 8,
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, monitor swaps, and oversee platform operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{adminStats.newUsersThisWeek} this week</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.activeSwaps}</p>
                  <p className="text-xs text-blue-600">Currently in progress</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Reports</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.pendingReports}</p>
                  <p className="text-xs text-orange-600">Requires attention</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Swaps</p>
                  <p className="text-2xl font-bold text-gray-900">{adminStats.totalSwapsCompleted.toLocaleString()}</p>
                  <p className="text-xs text-green-600">All time completed</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="swaps" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Swaps
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Moderation
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="swaps">
            <SwapMonitoring />
          </TabsContent>

          <TabsContent value="moderation">
            <ContentModeration />
          </TabsContent>

          <TabsContent value="messages">
            <PlatformMessages />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsDownload />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
