import { expectTypeOf } from 'vitest';

import type { Namespace, TranslationKey, Translator } from '@/types/translation';

/**
 * Compile-time guarantees. `pnpm type-check` fails if any `@ts-expect-error` below stops erroring,
 * i.e. when the typing silently degrades to `string`.
 */
describe('translation typing', () => {
  it('offers only existing namespaces', () => {
    expectTypeOf<'common'>().toExtend<Namespace>();
    expectTypeOf<'common.actions'>().toExtend<Namespace>();
    expectTypeOf<'health.proxy'>().toExtend<Namespace>();
    // @ts-expect-error unknown namespace
    expectTypeOf<'nope'>().toExtend<Namespace>();
    // @ts-expect-error a leaf is not a namespace
    expectTypeOf<'common.actions.retry'>().toExtend<Namespace>();
  });

  it('offers only keys of the chosen namespace', () => {
    expectTypeOf<TranslationKey<'common.actions'>>().toEqualTypeOf<
      'retry' | 'refresh' | 'back' | 'backHome' | 'copy' | 'copied'
    >();
    expectTypeOf<TranslationKey>().toExtend<string>();
    expectTypeOf<'common.actions.retry'>().toExtend<TranslationKey>();
  });

  it('rejects unknown keys', () => {
    const t = (() => '') as unknown as Translator<'common.actions'>;

    t('retry');
    // @ts-expect-error key does not exist in the namespace
    t('missing');
    // @ts-expect-error key of another namespace
    t('title');
  });
});
