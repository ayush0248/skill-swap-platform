"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Navigation from "@/components/navigation"
import SwapRequestCard from "@/components/swap-request-card"

// Mock data
const mockRequests = [
  {
    id: 1,
    type: "received",
    user: {
      name: "Marcus Johnson",
      photo: "/placeholder.svg?height=60&width=60",
    },
    skillOffered: "Python",
    skillWanted: "React",
    message: "Hi! I'd love to learn React from you. I can teach you Python in return.",
    status: "pending",
    date: "2 days ago",
  },
  {
    id: 2,
    type: "sent",
    user: {
      name: "Elena Rodriguez",
      photo: "/placeholder.svg?height=60&width=60",
    },
    skillOffered: "JavaScript",
    skillWanted: "Graphic Design",
    message: "Would love to learn design principles from you!",
    status: "accepted",
    date: "1 week ago",
  },
  {
    id: 3,
    type: "received",
    user: {
      name: "David Kim",
      photo: "/placeholder.svg?height=60&width=60",
    },
    skillOffered: "DevOps",
    skillWanted: "TypeScript",
    message: "Interested in learning TypeScript. Can help with DevOps in return.",
    status: "pending",
    date: "3 days ago",
  },
  {
    id: 4,
    type: "sent",
    user: {
      name: "Priya Patel",
      photo: "/placeholder.svg?height=60&width=60",
    },
    skillOffered: "React",
    skillWanted: "Digital Marketing",
    message: "Hi Priya! I'd like to learn about digital marketing strategies.",
    status: "rejected",
    date: "2 weeks ago",
  },
  {
    id: 5,
    type: "received",
    user: {
      name: "Alex Thompson",
      photo: "/placeholder.svg?height=60&width=60",
    },
    skillOffered: "Photography",
    skillWanted: "Web Development",
    message: "Would love to trade photography skills for web development knowledge!",
    status: "accepted",
    date: "1 month ago",
  },
]

export default function RequestsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  const handleAccept = (requestId: number) => {
    alert(`Request ${requestId} accepted!`)
  }

  const handleReject = (requestId: number) => {
    alert(`Request ${requestId} rejected!`)
  }

  const filterRequests = (status: string, type?: string) => {
    return mockRequests.filter((request) => {
      const statusMatch = status === "all" || request.status === status
      const typeMatch = !type || request.type === type
      return statusMatch && typeMatch
    })
  }

  const paginateRequests = (requests: any[]) => {
    const totalPages = Math.ceil(requests.length / itemsPerPage)
    const paginatedRequests = requests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    return { paginatedRequests, totalPages }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Skill Swap Requests</h1>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {(() => {
                const allRequests = filterRequests("all")
                const { paginatedRequests, totalPages } = paginateRequests(allRequests)

                return (
                  <>
                    <div className="space-y-4">
                      {paginatedRequests.map((request) => (
                        <SwapRequestCard
                          key={request.id}
                          request={request}
                          onAccept={handleAccept}
                          onReject={handleReject}
                        />
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-6">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        ))}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )
              })()}
            </TabsContent>

            <TabsContent value="pending" className="space-y-4">
              {(() => {
                const pendingRequests = filterRequests("pending")
                const { paginatedRequests } = paginateRequests(pendingRequests)

                return (
                  <div className="space-y-4">
                    {paginatedRequests.map((request) => (
                      <SwapRequestCard
                        key={request.id}
                        request={request}
                        onAccept={handleAccept}
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                )
              })()}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-4">
              {(() => {
                const acceptedRequests = filterRequests("accepted")
                const { paginatedRequests } = paginateRequests(acceptedRequests)

                return (
                  <div className="space-y-4">
                    {paginatedRequests.map((request) => (
                      <SwapRequestCard
                        key={request.id}
                        request={request}
                        onAccept={handleAccept}
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                )
              })()}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              {(() => {
                const rejectedRequests = filterRequests("rejected")
                const { paginatedRequests } = paginateRequests(rejectedRequests)

                return (
                  <div className="space-y-4">
                    {paginatedRequests.map((request) => (
                      <SwapRequestCard
                        key={request.id}
                        request={request}
                        onAccept={handleAccept}
                        onReject={handleReject}
                      />
                    ))}
                  </div>
                )
              })()}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
