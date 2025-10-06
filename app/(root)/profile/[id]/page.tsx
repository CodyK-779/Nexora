import { getUserDetails } from "@/actions/user-action";
import ProfileSection from "@/components/ProfileSection";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const user = await getUserDetails(userId);

  if (!user) return;

  return <ProfileSection user={user} />;
}
