"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Calendar, MessageSquare } from "lucide-react"
import Navigation from "@/components/navigation"
import SkillTag from "@/components/skill-tag"
import SwapRequestForm from "@/components/swap-request-form"

// Mock user data
const mockUser = {
  id: 1,
  name: "Sarah Chen",
  photo: "/placeholder.svg?height=120&width=120",
  location: "San Francisco, CA",
  skillsOffered: ["React", "TypeScript", "UI/UX Design", "Figma", "JavaScript"],
  skillsWanted: ["Python", "Machine Learning", "Data Science"],
  availability: "Weekends",
  rating: 4.8,
  totalReviews: 24,
  bio: "Passionate frontend developer with 5+ years of experience. I love creating beautiful, user-friendly interfaces and I'm eager to learn more about data science and machine learning. Always excited to share knowledge and learn from others!",
  joinedDate: "March 2023",
  completedSwaps: 12,
  reviews: [
    {
      id: 1,
      reviewer: "Marcus Johnson",
      rating: 5,
      comment: "Sarah is an excellent teacher! She helped me understand React concepts very clearly.",
      date: "2 weeks ago",
    },
    {
      id: 2,
      reviewer: "Elena Rodriguez",
      rating: 5,
      comment: "Great experience learning TypeScript from Sarah. Very patient and knowledgeable.",
      date: "1 month ago",
    },
    {
      id: 3,
      reviewer: "David Kim",
      rating: 4,
      comment: "Sarah's UI/UX insights were incredibly valuable. Highly recommend!",
      date: "2 months ago",
    },
  ],
}

export default function ViewProfilePage({ params }: { params: { id: string } }) {
  const [showRequestForm, setShowRequestForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={mockUser.photo || "/placeholder.svg"} alt={mockUser.name} />
                    <AvatarFallback className="text-2xl">
                      {mockUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{mockUser.rating}</span>
                    <span className="text-gray-500">({mockUser.totalReviews} reviews)</span>
                  </div>

                  <Button onClick={() => setShowRequestForm(true)} className="w-full md:w-auto">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Request Skill Swap
                  </Button>
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>

                  <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{mockUser.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Available {mockUser.availability}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{mockUser.bio}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-900">Joined:</span>
                      <p className="text-gray-600">{mockUser.joinedDate}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Completed Swaps:</span>
                      <p className="text-gray-600">{mockUser.completedSwaps}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Response Rate:</span>
                      <p className="text-gray-600">95%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills & Interests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">Can Teach</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.skillsOffered.map((skill) => (
                      <SkillTag key={skill} skill={skill} variant="offered" />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-700 mb-2">Wants to Learn</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockUser.skillsWanted.map((skill) => (
                      <SkillTag key={skill} skill={skill} variant="wanted" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUser.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.reviewer}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Swap Request Modal */}
      {/* <SwapRequestForm isOpen={showRequestForm} onClose={() => setShowRequestForm(false)} targetUser={mockUser} /> */}
    </div>
  )
}
