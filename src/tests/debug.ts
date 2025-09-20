import { CompanyTypes, createScraper } from '../index';
import { type Page } from 'puppeteer';
import { type Scraper } from '../scrapers/interface';
import { type ScraperCredentials } from '../scrapers/interface';
import { type TransactionsAccount } from '../transactions';
import debug from 'debug';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable debug logs
process.env.DEBUG = 'israeli-bank-scrapers:*';
debug.enable('israeli-bank-scrapers:*');

// Load local credentials from a git-ignored JSON file.
// Create and edit: src/tests/credentials.local.json (see credentials.sample.json for structure)
type LocalCreds = Record<string, any>;
const credentialsPath = path.join(__dirname.replace('/lib/', '/src/'), 'credentials.local.json');
let LOCAL_CREDS: LocalCreds = {};
if (fs.existsSync(credentialsPath)) {
  try {
    LOCAL_CREDS = JSON.parse(fs.readFileSync(credentialsPath, 'utf8')) as LocalCreds;
  } catch (e) {
    console.warn('Failed to parse credentials.local.json. Using empty credentials.');
  }
} else {
  console.warn('credentials.local.json not found. Using empty credentials.');
}

// Helper function to check if credentials are provided
function hasCredentials(creds: any): boolean {
  if (!creds) return false;
  
  // Check for username/password pattern
  if (creds.username && creds.password) {
    return creds.username.trim() !== '' && creds.password.trim() !== '';
  }
  
  // Check for id/card6Digits/password pattern
  if (creds.id && creds.card6Digits && creds.password) {
    return creds.id.trim() !== '' && creds.card6Digits.trim() !== '' && creds.password.trim() !== '';
  }
  
  return false;
}

// Configuration for multiple companies - only enable if credentials are provided
const COMPANY_CONFIGS = {
  [CompanyTypes.otsarHahayal]: {
    credentials: LOCAL_CREDS.otsarHahayal ?? { username: '', password: '' },
    enabled: false && hasCredentials(LOCAL_CREDS.otsarHahayal),
  },
  [CompanyTypes.max]: {
    credentials: LOCAL_CREDS.max ?? { username: '', password: '' },
    enabled: false && hasCredentials(LOCAL_CREDS.max),
  },
  'Max Michal': {
    credentials: LOCAL_CREDS['Max Michal'] ?? { username: '', password: '' },
    enabled: true && hasCredentials(LOCAL_CREDS['Max Michal']),
  },
  [CompanyTypes.visaCal]: {
    credentials: LOCAL_CREDS.visaCal ?? { username: '', password: '' },
    enabled: false && hasCredentials(LOCAL_CREDS.visaCal),
  },
  [CompanyTypes.amex]: {
    credentials: LOCAL_CREDS.amex ?? { id: '', card6Digits: '', password: '' },
    enabled: false && hasCredentials(LOCAL_CREDS.amex),
  },
  [CompanyTypes.isracard]: {
    credentials: LOCAL_CREDS.isracard ?? { id: '', card6Digits: '', password: '' },
    enabled: false && hasCredentials(LOCAL_CREDS.isracard),
  },
  // Second Isracard account (you can rename this key if needed)
  'Isracard Michal': {
    credentials: LOCAL_CREDS['Isracard Michal'] ?? { id: '', card6Digits: '', password: '' },
    enabled: false && hasCredentials(LOCAL_CREDS['Isracard Michal']),
  },
};

// Helper to create a hash for a transaction
function createTransactionHash(tx: any, source: string, accountId: string) {
  return [
    tx.date,
    tx.chargedAmount,
    tx.description,
    tx.category ?? '',
    source,
    accountId,
    tx.identifier !== undefined ? tx.identifier : 'undefined',
  ].join('_');
}

async function debugScraper() {
  let scraper: (Scraper<ScraperCredentials> & { page?: Page }) | null = null;
  
  // Combined results object organized by company name and account name
  const combinedResults: Record<string, Record<string, any>> = {};
  
  try {
    console.log('Starting multi-company debug scraper function');
    
    // Get enabled companies
    const enabledCompanies = Object.entries(COMPANY_CONFIGS)
      .filter(([_, config]) => config.enabled)
      .map(([companyId, config]) => ({ companyId, config }));
    
    if (enabledCompanies.length === 0) {
      console.log('No companies enabled. Please set enabled: true for at least one company in COMPANY_CONFIGS.');
      return;
    }
    
    console.log(`Found ${enabledCompanies.length} enabled companies:`, enabledCompanies.map(c => c.companyId));
    
    const baseOptions = {
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
      defaultTimeout: 20000,
      skipCloseBrowser: true,
    };

    // Process each enabled company
    for (const { companyId, config } of enabledCompanies) {
      console.log(`\n=== Processing ${companyId} ===`);
      
      try {
        // Map custom keys to the correct company type
        let actualCompanyId: CompanyTypes;
        switch (companyId) {
          case 'Max Michal':
          case 'max':
            actualCompanyId = CompanyTypes.max;
            break;
          case 'Cal Michal':
            actualCompanyId = CompanyTypes.visaCal;
            break;
          case 'Isracard Michal':
            actualCompanyId = CompanyTypes.isracard;
            break;
          default:
            actualCompanyId = companyId as CompanyTypes;
        }
        
        const options = {
          ...baseOptions,
          companyId: actualCompanyId,
        };

        console.log(`Creating scraper instance for ${companyId}...`);
        scraper = createScraper(options) as Scraper<ScraperCredentials> & { page?: Page };
        
        console.log(`Attempting to scrape ${companyId}...`);
        
        // Set up page event handlers
        if (scraper.page) {
          scraper.page.on('error', (err: Error) => {
            console.error(`[${companyId}] Page error:`, err);
          });
          
          scraper.page.on('console', (msg: { text: () => string }) => {
            console.log(`[${companyId}] Browser console:`, msg.text());
          });

          scraper.page.on('dialog', async (dialog: { message: () => string, accept: () => Promise<void> }) => {
            console.log(`[${companyId}] Dialog appeared:`, dialog.message());
            await dialog.accept();
          });

          scraper.page.on('close', () => {
            console.log(`[${companyId}] Page was closed unexpectedly!`);
            process.exit(1);
          });
        }

        const scrapeResult = await scraper.scrape(config.credentials);
        console.log(`[${companyId}] Scraping completed`);

        if (scrapeResult.success && scrapeResult.accounts) {
          console.log(`[${companyId}] Scraping successful!`);
          scrapeResult.accounts.forEach((account: TransactionsAccount) => {
            console.log(`[${companyId}] Found ${account.txns.length} transactions for account number ${account.accountNumber}`);
            console.log(`[${companyId}] Account balance:`, account.balance);
            console.log(`[${companyId}] First few transactions:`, account.txns.slice(0, 3));
          });
          
          // Add results to the combined object organized by official company type and account
          scrapeResult.accounts.forEach((account: TransactionsAccount) => {
            const accountKey = account.accountNumber || 'unknown_account';
            
            // Initialize company object if it doesn't exist
            if (!combinedResults[actualCompanyId]) {
              combinedResults[actualCompanyId] = {};
            }
            
            // If account already exists (from another config), add a suffix to avoid overwrite
            let uniqueAccountKey = accountKey;
            let suffix = 2;
            while (combinedResults[actualCompanyId][uniqueAccountKey]) {
              uniqueAccountKey = `${accountKey}_${suffix++}`;
            }
            
            // Add hash to each transaction
            const txnsWithHash = account.txns.map((tx) => ({
              ...tx,
              hash: createTransactionHash(tx, actualCompanyId, uniqueAccountKey),
            }));
            // Add account results to the company
            combinedResults[actualCompanyId][uniqueAccountKey] = {
              success: true,
              accountNumber: account.accountNumber,
              balance: account.balance,
              transactions: txnsWithHash,
              scrapedAt: new Date().toISOString(),
              companyType: actualCompanyId,
              configKey: companyId, // for traceability
            };
          });
          
        } else {
          console.error(`[${companyId}] Scraping failed with error type:`, scrapeResult.errorType);
          console.error(`[${companyId}] Error message:`, scrapeResult.errorMessage);
          
          // Add error results to combined object under official company type
          if (!combinedResults[actualCompanyId]) {
            combinedResults[actualCompanyId] = {};
          }
          // Use configKey as error key to distinguish between configs
          combinedResults[actualCompanyId][`error_${companyId}`] = {
            success: false,
            errorType: scrapeResult.errorType,
            errorMessage: scrapeResult.errorMessage,
            scrapedAt: new Date().toISOString(),
            companyType: actualCompanyId,
            configKey: companyId,
          };
        }
        
        // Close the current scraper before moving to the next one
        if (scraper?.page && !scraper.page.isClosed()) {
          await scraper.page.close();
        }
        scraper = null;
        
        // Add a small delay between companies
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (scrapeError: any) {
        console.error(`[${companyId}] Error during scraping:`, scrapeError);
        console.error(`[${companyId}] Error stack:`, scrapeError.stack);
        if (scrapeError.message) {
          console.error(`[${companyId}] Error message:`, scrapeError.message);
        }
        
        // Add error results to combined object under official company type
        let actualCompanyId: CompanyTypes;
        switch (companyId) {
          case 'Max Michal':
          case 'max':
            actualCompanyId = CompanyTypes.max;
            break;
          case 'Cal Michal':
            actualCompanyId = CompanyTypes.visaCal;
            break;
          case 'Isracard Michal':
            actualCompanyId = CompanyTypes.isracard;
            break;
          default:
            actualCompanyId = companyId as CompanyTypes;
        }
        if (!combinedResults[actualCompanyId]) {
          combinedResults[actualCompanyId] = {};
        }
        combinedResults[actualCompanyId][`error_${companyId}`] = {
          success: false,
          errorType: 'UNKNOWN_ERROR',
          errorMessage: scrapeError.message || 'Unknown error occurred',
          scrapedAt: new Date().toISOString(),
          companyType: actualCompanyId,
          configKey: companyId,
        };
        
        // Close the current scraper on error
        if (scraper?.page && !scraper.page.isClosed()) {
          await scraper.page.close();
        }
        scraper = null;
      }
    }
    
    console.log('\n=== All companies processed ===');

    // Remove duplicate accounts and empty parent nodes
    Object.keys(combinedResults).forEach((companyType) => {
      const accounts = combinedResults[companyType];
      const seenAccountNumbers = new Set();
      const dedupedAccounts: Record<string, any> = {};
      let hasAccounts = false;
      Object.entries(accounts).forEach(([accountId, result]) => {
        // If this is an error entry, preserve it
        if (accountId.startsWith('error_')) {
          dedupedAccounts[accountId] = result;
          return;
        }
        // If no accountNumber, treat as unique (or skip if you want)
        const accNum = result.accountNumber;
        if (accNum && !seenAccountNumbers.has(accNum)) {
          seenAccountNumbers.add(accNum);
          dedupedAccounts[accountId] = result;
          hasAccounts = true;
        }
        // If duplicate, skip
      });
      // If there are no accounts and no errors, remove the companyType
      const hasErrors = Object.keys(dedupedAccounts).some((k) => k.startsWith('error_'));
      if (!hasAccounts && !hasErrors) {
        delete combinedResults[companyType];
      } else {
        combinedResults[companyType] = dedupedAccounts;
      }
    });

    // Get local datetime string for folder and file naming
    const now = new Date();
    const dateFolder = now.toLocaleDateString('en-CA'); // YYYY-MM-DD
    // Format: YYYY-MM-DD_HH-mm (no seconds)
    const pad = (n: number) => n.toString().padStart(2, '0');
    const dateTimeString = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}`;

    // Save combined results to a single JSON file
    const outputDir = path.join(__dirname, 'debug_output', dateFolder);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const combinedOutputFile = path.join(outputDir, `combined_results_${dateTimeString}.json`);
    fs.writeFileSync(combinedOutputFile, JSON.stringify(combinedResults, null, 2));
    console.log(`Combined results saved to: ${combinedOutputFile}`);
    
    // Also save individual company results for debugging
    Object.entries(combinedResults).forEach(([officialCompanyId, accounts]) => {
      Object.entries(accounts).forEach(([accountId, result]) => {
        const individualFile = path.join(outputDir, `${officialCompanyId}_${accountId}_results_${dateTimeString}.json`);
        fs.writeFileSync(individualFile, JSON.stringify(result, null, 2));
      });
    });
    
  } catch (e: any) {
    console.error('Multi-company scraping failed with error:', e);
    console.error('Error stack:', e.stack);
    if (e.message) {
      console.error('Error message:', e.message);
    }
  } finally {
    console.log('Debug session completed.');
    process.exit(0);
  }
}



// Handle the promise properly
void debugScraper(); 