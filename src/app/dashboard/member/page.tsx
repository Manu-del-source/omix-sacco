import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { MemberDashboardContent } from '@/components/dashboard/MemberDashboardContent'

export default async function MemberDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'member' && profile?.role !== 'staff' && profile?.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-omix-navy pt-24 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        <MemberDashboardContent userEmail={user.email || ''} />
      </div>
    </div>
  )
}
