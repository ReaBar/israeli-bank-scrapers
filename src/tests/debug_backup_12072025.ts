import { CompanyTypes, createScraper } from '../index';
import { type Page } from 'puppeteer';
import { type Scraper } from '../scrapers/interface';
import { type ScraperCredentials } from '../scrapers/interface';
import { type TransactionsAccount } from '../transactions';
import debug from 'debug';

// Enable debug logs
process.env.DEBUG = 'israeli-bank-scrapers:*';
debug.enable('israeli-bank-scrapers:*');

async function debugScraper() {
  let scraper: (Scraper<ScraperCredentials> & { page?: Page }) | null = null;
  
  try {
    console.log('Starting debug scraper function');
    const options = {
      companyId: CompanyTypes.otsarHahayal,
      startDate: new Date('2025-05-01'),
      combineInstallments: false,
      showBrowser: true,
      verbose: true,
      slowMo: 10000,
      timeout: 120000,
      args: [
        '--disable-popup-blocking',
        '--disable-notifications',
        '--window-size=1920,1080',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
      defaultTimeout: 60000,
      skipCloseBrowser: true,
    };

    const credentials = {
      username: 'vzb83xr',
      password: 'sZX9bWtoQHYFFM',
    };

    console.log('Starting scraper with options:', options);
    console.log('Creating scraper instance...');
    scraper = createScraper(options) as Scraper<ScraperCredentials> & { page?: Page };
    
    console.log('Attempting to scrape...');
    try {
      console.log('Step 1: Initializing scraper...');
      
      if (scraper.page) {
        scraper.page.on('error', (err: Error) => {
          console.error('Page error:', err);
        });
        
        scraper.page.on('console', (msg: { text: () => string }) => {
          console.log('Browser console:', msg.text());
        });

        scraper.page.on('dialog', async (dialog: { message: () => string, accept: () => Promise<void> }) => {
          console.log('Dialog appeared:', dialog.message());
          await dialog.accept();
        });

        scraper.page.on('close', () => {
          console.log('Page was closed unexpectedly!');
          process.exit(1);
        });
      }

      const scrapeResult = await scraper.scrape(credentials);
      console.log('Step 2: Scraping completed');
      //console.log('Scrape result:', JSON.stringify(scrapeResult, null, 2));

      if (scrapeResult.success && scrapeResult.accounts) {
        console.log('Scraping successful!');
        scrapeResult.accounts.forEach((account: TransactionsAccount) => {
          console.log(`Found ${account.txns.length} transactions for account number ${account.accountNumber}`);
          console.log('Account balance:', account.balance);
          console.log('First few transactions:', account.txns.slice(0, 3));
          console.log('All transactions:\n', JSON.stringify(scrapeResult, null, 2));
        });
      } else {
        console.error('Scraping failed with error type:', scrapeResult.errorType);
        console.error('Error message:', scrapeResult.errorMessage);
      }
    } catch (scrapeError: any) {
      console.error('Error during scraping:', scrapeError);
      console.error('Error stack:', scrapeError.stack);
      if (scrapeError.message) {
        console.error('Error message:', scrapeError.message);
      }
    }
  } catch (e: any) {
    console.error('Scraping failed with error:', e);
    console.error('Error stack:', e.stack);
    if (e.message) {
      console.error('Error message:', e.message);
    }
  } finally {
    // Check if the page is still open before keeping the process alive
    if (scraper?.page) {
      const isPageClosed = await scraper.page.evaluate(() => false).catch(() => true);
      if (isPageClosed) {
        console.log('Browser was closed. Exiting...');
        process.exit(1);
      } else {
        console.log('Scraping process completed. Browser will remain open for inspection.');
        console.log('Press Ctrl+C to exit...');
        
        process.stdin.resume();
        process.on('SIGINT', () => {
          console.log('Received SIGINT. Closing browser...');
          if (scraper?.page) {
            scraper.page.close().catch(console.error);
          }
          process.exit(0);
        });
      }
    } else {
      console.log('Browser was closed. Exiting...');
      process.exit(1);
    }
  }
}

// Handle the promise properly
void debugScraper(); 