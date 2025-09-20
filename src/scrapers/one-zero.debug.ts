// import moment from 'moment/moment';
// import { getDebug } from '../helpers/debug';
// import {
//   type Transaction as ScrapingTransaction,
//   TransactionStatuses,
//   TransactionTypes,
//   type TransactionsAccount,
// } from '../transactions';
// import { BaseScraper } from './base-scraper';
// import { ScraperErrorTypes, createGenericError } from './errors';
// import {
//   type ScraperGetLongTermTwoFactorTokenResult,
//   type ScraperLoginResult,
//   type ScraperScrapingResult,
//   type ScraperTwoFactorAuthTriggerResult,
// } from './interface';
// import OneZeroScraper from './one-zero';

// const debug = getDebug('one-zero-debug');

// type Account = {
//   accountId: string;
// };

// type Portfolio = {
//   accounts: Array<Account>;
//   portfolioId: string;
//   portfolioNum: string;
// };

// type ScraperSpecificCredentials = { email: string, password: string } & ({
//   otpCodeRetriever: () => Promise<string>;
//   phoneNumber: string;
// } | {
//   otpLongTermToken: string;
// });

// export default class OneZeroDebugScraper extends OneZeroScraper {
//   async triggerTwoFactorAuth(phoneNumber: string): Promise<ScraperTwoFactorAuthTriggerResult> {
//     debug('Triggering 2FA for phone number:', phoneNumber);
//     const result = await super.triggerTwoFactorAuth(phoneNumber);
//     debug('2FA trigger result:', result);
//     return result;
//   }

//   public async getLongTermTwoFactorToken(otpCode: string): Promise<ScraperGetLongTermTwoFactorTokenResult> {
//     debug('Getting long term 2FA token for OTP code:', otpCode);
//     const result = await super.getLongTermTwoFactorToken(otpCode);
//     debug('Long term 2FA token result:', result);
//     return result;
//   }

//   async login(credentials: ScraperSpecificCredentials): Promise<ScraperLoginResult> {
//     debug('Logging in with credentials:', {
//       email: credentials.email,
//       hasOtpCodeRetriever: 'otpCodeRetriever' in credentials,
//       hasOtpLongTermToken: 'otpLongTermToken' in credentials,
//     });
//     const result = await super.login(credentials);
//     debug('Login result:', result);
//     return result;
//   }

//   async fetchData(): Promise<ScraperScrapingResult> {
//     debug('Fetching data with options:', this.options);
//     const result = await super.fetchData();
//     debug('Fetch data result:', {
//       success: result.success,
//       accountCount: result.accounts?.length,
//     });
//     return result;
//   }
// } 