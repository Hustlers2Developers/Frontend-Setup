"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const [name, setName] = useState("Atharv Porate");
  const email = "atharv@hustlers2developers.com";
  const role = "Core Contributor";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[72px]">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          {/* Header */}
          <h1 className="text-2xl font-semibold text-foreground mb-8">
            Profile
          </h1>

          {/* Two column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
            {/* Left sidebar */}
            <Card className="p-8 h-fit">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src="https://github.com/AtharvPorate1.png" alt={name} />
                  <AvatarFallback className="text-lg font-medium bg-primary text-primary-foreground">
                    {name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-lg font-semibold text-foreground">
                  {name}
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  {email}
                </p>

                <span className="mt-4 px-3 py-1 text-xs font-medium rounded-full bg-accent text-accent-foreground">
                  {role}
                </span>
              </div>
            </Card>

            {/* Right side - Profile form */}
            <Card className="p-8">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                Edit Profile
              </h3>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label 
                    htmlFor="name" 
                    className="text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <label 
                    htmlFor="email" 
                    className="text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    value={email}
                    disabled
                    className="h-11 bg-muted cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>

                <Button 
                  type="submit"
                  className="w-[150px] h-11 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save Changes
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
