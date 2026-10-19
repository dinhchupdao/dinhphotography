import { initialPhotographers } from '@/lib/mockData';
import PhotographerDetailClient from './PhotographerDetailClient';

export function generateStaticParams() {
  return initialPhotographers.map((p) => ({
    id: p.id,
  }));
}

export default function PhotographerPage({ params }: { params: { id: string } }) {
  return <PhotographerDetailClient id={params.id} />;
}
