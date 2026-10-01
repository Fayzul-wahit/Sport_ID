import { redirect } from 'next/navigation';

export default function RootLocalePage({ params: { locale } }: { params: { locale: string } }) {
  redirect(`/${locale}/language`);
}
