"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [profile, setProfile] = useState({
    name: "",
    location: "",
    photo: "",
    bio: "",
    skillsOffered: [] as string[],
    skillsWanted: [] as string[],
    availability: "weekends",
    isPublic: true,
  })

  const [newSkillOffered, setNewSkillOffered] = useState("")
  const [newSkillWanted, setNewSkillWanted] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("/login")
      } else {
        setUser(user)

        // Fetch existing profile
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("uid", user.uid)
          .single()

        if (data) {
          setProfile({
            name: data.name || "",
            location: data.location || "",
            photo: data.photo_url || "",
            bio: data.bio || "",
            skillsOffered: data.skillsOffered || [],
            skillsWanted: data.skillsWanted || [],
            availability: data.availability || "weekends",
            isPublic: data.is_public || false,
          })
        }
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const handleSave = async () => {
    if (!user) return

    const { error } = await supabase.from("profiles").upsert({
      uid: user.uid,
      name: profile.name,
      location: profile.location,
      photo_url: profile.photo,
      bio: profile.bio,
      skillsOffered: profile.skillsOffered,
      skillsWanted: profile.skillsWanted,
      availability: profile.availability,
      is_public: profile.isPublic,
    })

    if (error) {
      alert("Error saving profile")
    } else {
      alert("Profile saved!")
      router.push("/")
    }
  }

  const addSkillOffered = () => {
    if (newSkillOffered && !profile.skillsOffered.includes(newSkillOffered)) {
      setProfile((prev) => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()],
      }))
      setNewSkillOffered("")
    }
  }

  const addSkillWanted = () => {
    if (newSkillWanted && !profile.skillsWanted.includes(newSkillWanted)) {
      setProfile((prev) => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()],
      }))
      setNewSkillWanted("")
    }
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Card className="max-w-2xl mx-auto p-6">
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Avatar className="h-24 w-24 mx-auto">
            <AvatarImage src={profile.photo || "/placeholder.svg"} />
            <AvatarFallback>{profile.name?.charAt(0)}</AvatarFallback>
          </Avatar>

          <Label>Name</Label>
          <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />

          <Label>Location</Label>
          <Input value={profile.location} onChange={(e) => setProfile({ ...profile, location: e.target.value })} />

          <Label>Photo URL</Label>
          <Input value={profile.photo} onChange={(e) => setProfile({ ...profile, photo: e.target.value })} />

          <Label>Bio</Label>
          <Textarea value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />

          <Label>Skills You Offer</Label>
          <div className="flex gap-2">
            <Input value={newSkillOffered} onChange={(e) => setNewSkillOffered(e.target.value)} />
            <Button onClick={addSkillOffered}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skillsOffered.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-green-100 rounded-full text-sm">{skill}</span>
            ))}
          </div>

          <Label>Skills You Want</Label>
          <div className="flex gap-2">
            <Input value={newSkillWanted} onChange={(e) => setNewSkillWanted(e.target.value)} />
            <Button onClick={addSkillWanted}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.skillsWanted.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 rounded-full text-sm">{skill}</span>
            ))}
          </div>

          <Label>Availability</Label>
          <Select value={profile.availability} onValueChange={(val) => setProfile({ ...profile, availability: val })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekends">Weekends</SelectItem>
              <SelectItem value="evenings">Evenings</SelectItem>
              <SelectItem value="weekdays">Weekdays</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center justify-between">
            <Label>Make Public</Label>
            <Switch checked={profile.isPublic} onCheckedChange={(val) => setProfile({ ...profile, isPublic: val })} />
          </div>

          <Button onClick={handleSave} className="w-full">Save Profile</Button>
        </CardContent>
      </Card>
    </div>
  )
}
