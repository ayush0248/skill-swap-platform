'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import Navigation from "@/components/navigation"
import ProfileCard from "@/components/profile-card"

type User = {
  id: number
  uid: string
  name: string
  photo: string
  photo_url?: string
  skillsOffered: string[]
  skillsWanted: string[]
  availability: string
  rating?: number
  location?: string
}

export default function HomePage() {
  const [user, setUser] = useState<any>(null)
  const [profiles, setProfiles] = useState<User[]>([])
  const [currentUserProfile, setCurrentUserProfile] = useState<User | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 4
  const router = useRouter()

  // ✅ Handle Firebase auth and fetch profile from Supabase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("uid", firebaseUser.uid)
          .single()

        if (error || !profile) {
          setCurrentUserProfile(null)
        } else {
          setCurrentUserProfile(profile)
        }
      } else {
        setUser(null)
        router.push("/login")
      }
    })

    return () => unsubscribe()
  }, [])

  // ✅ Fetch all public profiles from Supabase
  useEffect(() => {
    if (!currentUserProfile) return

    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("is_public", true)
        .neq("uid", user?.uid)

      if (!error && data) setProfiles(data)
    }

    fetchProfiles()
  }, [currentUserProfile, user])

  const filteredUsers = profiles.filter((u) => {
    const matchesSearch =
      searchTerm === "" ||
      u.skillsOffered.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      u.skillsWanted.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAvailability =
      availabilityFilter === "all" ||
      u.availability.toLowerCase().includes(availabilityFilter.toLowerCase())

    return matchesSearch && matchesAvailability
  })

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <main className="container mx-auto px-4 py-8">
        {currentUserProfile ? (
          <>
            {/* 🔍 Search Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Find Your Perfect Skill Match
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by skills or name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={availabilityFilter}
                  onValueChange={setAvailabilityFilter}
                >
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Availability</SelectItem>
                    <SelectItem value="weekends">Weekends</SelectItem>
                    <SelectItem value="evenings">Evenings</SelectItem>
                    <SelectItem value="weekdays">Weekdays</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 👤 Results */}
            <div className="mb-8">
              <p className="text-gray-600 mb-4">
                Showing {paginatedUsers.length} of {filteredUsers.length} results
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedUsers.map((user) => (
                  <ProfileCard
                    key={user.uid}
                    user={user}
                    onRequestClick={() => {}}
                    showRequestButton={true}
                  />
                ))}
              </div>
            </div>

            {/* ⏩ Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold mb-4">
              Complete your profile first
            </h2>
            <Button onClick={() => router.push("/profile")}>
              Go to Profile Setup
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
