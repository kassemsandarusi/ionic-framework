import { newE2EPage } from '@stencil/core/testing';
import { expectFiles } from '@stencil/core/testing/testing-utils';

test('datetime: minmax', async () => {
  const page = await newE2EPage({
    url: '/src/components/datetime/test/minmax?ionic:_testing=true'
  });

  const screenshotCompares = [];

  screenshotCompares.push(await page.compareScreenshot());

  const monthYearItem = await page.find('ion-datetime#inside >>> .calendar-month-year');

  await monthYearItem.click();
  await page.waitForChanges();

  screenshotCompares.push(await page.compareScreenshot());

  for (const screenshotCompare of screenshotCompares) {
    expect(screenshotCompare).toMatchScreenshot();
  }
});

test('datetime: minmax months disabled', async () => {
  const page = await newE2EPage({
    url: '/src/components/datetime/test/minmax?ionic:_testing=true'
  });

  const calendarMonths = await page.findAll('ion-datetime#inside >>> .calendar-month');

  await page.waitForChanges();

  expect(calendarMonths[0]).toHaveClass('calendar-month-disabled');
  expect(calendarMonths[1]).not.toHaveClass('calendar-month-disabled');
  expect(calendarMonths[2]).not.toHaveClass('calendar-month-disabled');

});

test('datetime: minmax navigation disabled', async () => {
  const page = await newE2EPage({
    url: '/src/components/datetime/test/minmax?ionic:_testing=true'
  });

  const navButtons = await page.findAll('ion-datetime#outside >>> .calendar-next-prev ion-button');

  expect(navButtons[0]).toHaveAttribute('disabled');
  expect(navButtons[1]).toHaveAttribute('disabled');

});
