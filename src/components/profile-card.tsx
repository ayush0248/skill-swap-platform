"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import SkillTag from "./skill-tag"
interface User {
  id: number;
  uid: string;
  name: string;
  photo: string;
  photo_url?: string;
  skillsOffered: string[];
  skillsWanted: string[];
  availability: string;
  rating?: number;
  location?: string;
}

interface ProfileCardProps {
  user: User
  onRequestClick?: () => void
  showRequestButton?: boolean
}
export default function ProfileCard({ user, onRequestClick, showRequestButton = false }: ProfileCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Link href={`/profile/${user.id}`}>
            <Avatar className="h-16 w-16 cursor-pointer">
              <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <Link href={`/profile/${user.id}`}>
                  <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">{user.name}</h3>
                </Link>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{user.availability}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{user.rating}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Can teach:</p>
                <div className="flex flex-wrap gap-1">
                  {user.skillsOffered.slice(0, 3).map((skill) => (
                    <SkillTag key={skill} skill={skill} variant="offered" size="sm" />
                  ))}
                  {user.skillsOffered.length > 3 && (
                    <span className="text-xs text-gray-500">+{user.skillsOffered.length - 3} more</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Wants to learn:</p>
                <div className="flex flex-wrap gap-1">
                  {user.skillsWanted.slice(0, 3).map((skill) => (
                    <SkillTag key={skill} skill={skill} variant="wanted" size="sm" />
                  ))}
                  {user.skillsWanted.length > 3 && (
                    <span className="text-xs text-gray-500">+{user.skillsWanted.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>

            {showRequestButton && (
              <div className="mt-4">
                <Button onClick={onRequestClick} size="sm" className="w-full">
                  Request Swap
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
