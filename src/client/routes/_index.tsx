import { TopMenu } from '@client/components/top-menu/TopMenu';
import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [{ title: 'Remix Notes' }];

const Index = () => (
  <main className="flex flex-col content-center justify-center sm:flex-row">
    <TopMenu />
  </main>
);
export default Index;
