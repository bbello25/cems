import { TrustedHost } from './trustedHost';

export class WebApiKey {
  id: number;
  apiKey: string;
  trustedHosts: TrustedHost[];
}
