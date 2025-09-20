import BeinleumiGroupBaseScraper from './base-beinleumi-group';
import { LoginResults } from './base-scraper-with-browser';
import { createLoginFields } from './base-beinleumi-group';
import { waitForPostLogin } from './base-beinleumi-group';
import { sleep } from '../helpers/waiting';

type ScraperSpecificCredentials = { username: string, password: string };

class OtsarHahayalScraper extends BeinleumiGroupBaseScraper {
  BASE_URL = 'https://online.bankotsar.co.il';

  LOGIN_URL = `${this.BASE_URL}/MatafLoginService/MatafLoginServlet?bankId=OTSARPRTAL&site=Private&KODSAFA=HE`;

  TRANSACTIONS_URL = `${this.BASE_URL}/wps/myportal/FibiMenu/Online/OnAccountMngment/OnBalanceTrans/PrivateAccountFlow`;

  getLoginOptions(credentials: ScraperSpecificCredentials) {
    return {
      loginUrl: `${this.LOGIN_URL}`,
      fields: createLoginFields(credentials),
      submitButtonSelector: '#continueBtn',
      postAction: async () => waitForPostLogin(this.page),
      possibleResults: {
        [LoginResults.Success]: [
          /otsar.*accountSummary/,  // New UI pattern for Otsar Hahayal
          /FibiMenu\/Online/,       // Old UI pattern
        ],
        [LoginResults.InvalidPassword]: [
          /FibiMenu\/Marketing\/Private\/Home/,
          /login.*error/i,          // Additional pattern for Otsar Hahayal
        ],
      },
      preAction: async () => {
        await sleep(1000);
      },
    };
  }
}

export default OtsarHahayalScraper;