import { redirect } from 'next/navigation';

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const id = +(await params).id;

  redirect(`/profile/${id}/kidney-assessment`);
}
