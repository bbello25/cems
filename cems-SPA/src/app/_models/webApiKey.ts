import { TrustedHost } from './trustedHost';

export interface WebApiKey {
  id: number;
  apiKey: string;
  trustedHosts: TrustedHost[];
}
