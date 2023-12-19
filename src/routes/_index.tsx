import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => [{ title: 'jpb06' }];

const Index = () => <div className="mt-20 h-[2000px] w-full">cool</div>;
export default Index;
