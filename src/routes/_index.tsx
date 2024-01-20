import type { MetaFunction } from '@remix-run/node';

import { Card } from '@client/components';

export const meta: MetaFunction = () => [{ title: 'jpb06' }];

const Index = () => <Card>Welcome</Card>;
export default Index;
