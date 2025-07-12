"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, CalendarIcon, FileText, BarChart3, Users, MessageSquare } from "lucide-react"
import { format } from "date-fns"

// Mock report data
const availableReports = [
  {
    id: 1,
    name: "User Activity Report",
    description: "Detailed user engagement and activity metrics",
    type: "user_activity",
    lastGenerated: "2024-03-15",
    size: "2.3 MB",
    format: "CSV",
  },
  {
    id: 2,
    name: "Swap Statistics Report",
    description: "Complete swap completion rates and success metrics",
    type: "swap_stats",
    lastGenerated: "2024-03-14",
    size: "1.8 MB",
    format: "PDF",
  },
  {
    id: 3,
    name: "Feedback Logs Report",
    description: "User feedback, ratings, and review analytics",
    type: "feedback_logs",
    lastGenerated: "2024-03-13",
    size: "3.1 MB",
    format: "Excel",
  },
  {
    id: 4,
    name: "Content Moderation Report",
    description: "Reports flagged content and moderation actions",
    type: "moderation",
    lastGenerated: "2024-03-12",
    size: "856 KB",
    format: "PDF",
  },
  {
    id: 5,
    name: "Platform Usage Analytics",
    description: "Overall platform usage patterns and trends",
    type: "analytics",
    lastGenerated: "2024-03-11",
    size: "4.2 MB",
    format: "CSV",
  },
]

export default function ReportsDownload() {
  const [selectedReport, setSelectedReport] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined })
  const [reportFormat, setReportFormat] = useState("csv")

  const handleGenerateReport = () => {
    if (!selectedReport) {
      alert("Please select a report type")
      return
    }

    alert(`Generating ${selectedReport} report... You will receive a download link shortly.`)
  }

  const handleDownloadExisting = (reportName: string, format: string) => {
    alert(`Downloading ${reportName} (${format})...`)
  }

  const getReportIcon = (type: string) => {
    const icons = {
      user_activity: Users,
      swap_stats: BarChart3,
      feedback_logs: MessageSquare,
      moderation: FileText,
      analytics: BarChart3,
    }
    const Icon = icons[type as keyof typeof icons] || FileText
    return <Icon className="h-4 w-4" />
  }

  const getFormatBadge = (format: string) => {
    const colors = {
      CSV: "bg-green-100 text-green-800",
      PDF: "bg-red-100 text-red-800",
      Excel: "bg-blue-100 text-blue-800",
    }
    return (
      <Badge variant="secondary" className={colors[format as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
        {format}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Generate New Report */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate New Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user_activity">User Activity Report</SelectItem>
                  <SelectItem value="swap_stats">Swap Statistics Report</SelectItem>
                  <SelectItem value="feedback_logs">Feedback Logs Report</SelectItem>
                  <SelectItem value="moderation">Content Moderation Report</SelectItem>
                  <SelectItem value="analytics">Platform Usage Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Format</Label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? format(dateRange.from, "PPP") : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) => setDateRange({ ...dateRange, from: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? format(dateRange.to, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="pt-4">
            <Button onClick={handleGenerateReport} className="w-full md:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Available Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Last Generated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getReportIcon(report.type)}
                        <span className="font-medium">{report.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{report.description}</span>
                    </TableCell>
                    <TableCell>{getFormatBadge(report.format)}</TableCell>
                    <TableCell>
                      <span className="text-sm font-mono">{report.size}</span>
                    </TableCell>
                    <TableCell className="text-sm">{report.lastGenerated}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadExisting(report.name, report.format)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold">2,156</p>
            <p className="text-sm text-gray-600">Completed Swaps</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">4.7</p>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold">89%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
