import { useEffect, EffectCallback } from 'react';

const useMountEffect = (fn: EffectCallback): void => useEffect(fn, []);

export default useMountEffect;
