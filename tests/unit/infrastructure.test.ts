import { describe, it, expect } from 'vitest';
import enMessages from '@/messages/en.json';
import taMessages from '@/messages/ta.json';
import mlMessages from '@/messages/ml.json';

describe('M0 Infrastructure & i18n Skeleton Test', () => {
  it('should have matching i18n keys across all supported locales (en, ta, ml)', () => {
    const enKeys = Object.keys(enMessages.common);
    const taKeys = Object.keys(taMessages.common);
    const mlKeys = Object.keys(mlMessages.common);

    expect(taKeys).toEqual(expect.arrayContaining(enKeys));
    expect(mlKeys).toEqual(expect.arrayContaining(enKeys));
  });

  it('should include required brand name and language strings', () => {
    expect(enMessages.common.appName).toBe('Sports ID');
    expect(taMessages.common.appName).toBe('Sports ID');
    expect(mlMessages.common.appName).toBe('Sports ID');
  });
});
