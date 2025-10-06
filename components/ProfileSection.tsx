"use client";

import { use, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { mockUser } from "./ProfileData";
import ProfileCard from "./ProfileCard";
import ProfileMain from "./ProfileMain";
import { UserDetailsType } from "./InterfaceTypes";
import { useSession } from "@/app/lib/auth-client";

interface Props {
  user: UserDetailsType;
}

export default function ProfileSection({ user }: Props) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const currentUser = session?.user.id === user.id;

  return (
    <div className="min-h-screen mt-[68px] -mb-20 pt-8 pb-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-container">
        {/* Header */}
        <ProfileHeader
          name={user.name}
          currentUser={currentUser}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />

        <div className="grid xl:grid-cols-4 gap-8">
          {/* Profile Card */}
          <ProfileCard user={user} />

          {/* Main Content */}
          <ProfileMain
            user={user}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
}
