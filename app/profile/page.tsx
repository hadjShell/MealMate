"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Phone, MapPin, Ruler, Weight, Calendar, Utensils, Target, Edit2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toolbar } from "@/components/toolbar"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    height: "180",
    weight: "75",
    age: "30",
    dietaryPreferences: "Vegetarian",
    allergies: "None",
    fitnessGoals: "Weight loss",
    bio: "I'm a food enthusiast always looking for new healthy recipes to try!",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile information has been successfully updated.",
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Toolbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profile.name} />
                <AvatarFallback>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl font-bold">{profile.name}</CardTitle>
            <CardDescription>{profile.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="health">Health & Goals</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="health">
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height" className="flex items-center">
                        <Ruler className="w-4 h-4 mr-2" />
                        Height (cm)
                      </Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        value={profile.height}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="flex items-center">
                        <Weight className="w-4 h-4 mr-2" />
                        Weight (kg)
                      </Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={profile.weight}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age" className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Age
                      </Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={profile.age}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dietaryPreferences" className="flex items-center">
                      <Utensils className="w-4 h-4 mr-2" />
                      Dietary Preferences
                    </Label>
                    <Select
                      name="dietaryPreferences"
                      value={profile.dietaryPreferences}
                      onValueChange={(value) =>
                        handleInputChange({ target: { name: "dietaryPreferences", value } } as any)
                      }
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select dietary preferences" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="Vegan">Vegan</SelectItem>
                        <SelectItem value="Pescatarian">Pescatarian</SelectItem>
                        <SelectItem value="Gluten-free">Gluten-free</SelectItem>
                        <SelectItem value="Dairy-free">Dairy-free</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allergies" className="flex items-center">
                      <Utensils className="w-4 h-4 mr-2" />
                      Allergies
                    </Label>
                    <Input
                      id="allergies"
                      name="allergies"
                      value={profile.allergies}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="List any food allergies"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fitnessGoals" className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Fitness Goals
                    </Label>
                    <Select
                      name="fitnessGoals"
                      value={profile.fitnessGoals}
                      onValueChange={(value) => handleInputChange({ target: { name: "fitnessGoals", value } } as any)}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fitness goals" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weight loss">Weight loss</SelectItem>
                        <SelectItem value="Muscle gain">Muscle gain</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Improved fitness">Improved fitness</SelectItem>
                        <SelectItem value="Better nutrition">Better nutrition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio" className="flex items-center">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="mr-2">
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

