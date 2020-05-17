import { useEffect, EffectCallback } from 'react';

const useMountEffect = (fn: EffectCallback) => useEffect(fn, []);

export default useMountEffect;
