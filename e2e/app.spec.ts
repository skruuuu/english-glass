import {test,expect} from '@playwright/test';
test('four lesson flows with mocked authenticated API',async({page})=>{
 await page.route('**/api/me',r=>r.fulfill({json:{signedIn:true}}));
 await page.route('**/api/history',r=>r.fulfill({json:{attempts:[]}}));
 await page.route('**/api/feedback',r=>r.fulfill({json:{correct:true,feedback:'Good work.'}}));
 await page.goto('/');
 for(const [skill,answer] of [['Listening','A small iced latte'],['Speaking','Nice to meet you my name is Alex'],['Reading','At the library'],['Writing','I drink coffee every morning.']]){
  await page.getByRole('button',{name:new RegExp(skill)}).click();
  if(skill==='Listening'||skill==='Reading')await page.getByRole('button',{name:new RegExp(answer)}).click();
  else await page.getByRole('textbox').fill(answer);
  await page.getByRole('button',{name:'Check answer'}).click();
  await expect(page.getByText('Good work.')).toBeVisible();
  await page.getByRole('button',{name:'Complete lesson'}).click();
 }
 await page.getByRole('button',{name:'Progress',exact:true}).click();
 await expect(page.getByText('4 / 4')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('real unauthenticated API blocks history and feedback',async({request})=>{
 expect((await request.get('/api/history')).status()).toBe(401);
 expect((await request.post('/api/feedback',{headers:{Origin:'http://evil.invalid'},data:{skill:'Writing',answer:'hello'}})).status()).toBe(403);
});
