import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";

const data = JSON.parse(readFileSync(`tests/config/${process.env.VARIABLES_FILE || 'commands.json'}` , 'utf-8')) as { commands: Command[]};

type Command = {
  title: string;
  link: string;
  functions: {
    name: string;
    link: string;
  }[];
}
test.describe('Sandbox', () => {
  const { commands } = data;

  commands.forEach((command) => {
    test.describe(command.title, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(command.link);
      })
      
      test(`displays command title: ${command.title}`, async ({ page }) => {
        await expect(page.getByRole('heading', { level: 1, name: command.title })).toBeVisible();
      })

      test(`contains link to the command functions`, async ({ page }) => {
        test.skip(!command.functions || command.functions.length === 0, 'no functions');

        command.functions.forEach(async (func) => {
          const link = page.getByRole('heading', { level: 4, name: func.name }).getByRole('link');
          await expect(link).toBeVisible();
          await expect(link).toHaveAttribute('href', func.link);
            
        })
      })
    })
    
  });
})
