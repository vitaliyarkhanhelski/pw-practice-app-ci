// import {test, expect} from '@playwright/test';
import { test } from '@applitools/eyes-playwright/fixture';

test('Applitools Visual Test', async ({page, eyes}) => {
/*     await page.goto('https://example.com');

    // Visual checkpoint of the full page using the `Strict` match level
    await eyes.check('Homepage', {
      fully: true,
      matchLevel: 'Strict',
    }); */


    await page.goto('/');
    await eyes.check('Home Page');

    await page.getByText('Forms').click();  
    await page.getByText('Form Layout').click();  
    await eyes.check('Forms Layout Check');
})
