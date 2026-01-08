import { getSiteConfig } from '@/app/actions';
import ContentEditor from './content-form';

export default async function ContentPage() {
  const config = await getSiteConfig();
  return <ContentEditor config={config} />;
}
