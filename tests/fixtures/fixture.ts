import { test as base } from '@playwright/test'

type Command = {

  title: string;
  link: string;
  functions: {
    name: string;
    link: string;
  }[]
}


export const test = base.extend<{ commands: Command[] }>({
  
})

export { expect } from '@playwright/test';
