import { useQuery } from '@tanstack/react-query';
import { useAccount } from '@/components/account-session';
import { getLearning } from '@/lib/learning.functions';
import { educationalProfiles, resolveEducationalProfile, type EducationalProfile } from '@/lib/profile-navigation';

/** Perfil educativo elegido por la persona (null si no ha ingresado o no lo ha elegido). Solo personaliza la navegación. */
export function useMyEducationalProfile(): { profile: EducationalProfile | null; label: string | null } {
  const { user } = useAccount();
  const query = useQuery({ queryKey: ['learning-account'], queryFn: () => getLearning(), enabled: !!user });
  const profile = user ? resolveEducationalProfile(query.data?.profile?.preparation_path) : null;
  return { profile, label: educationalProfiles.find(p => p.code === profile)?.label ?? null };
}
