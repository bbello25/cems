import { TrustedHost } from './TrustedHost';

export class ApiKey {
  id: number;
  key: string;
  trustedHosts: TrustedHost[];
}
