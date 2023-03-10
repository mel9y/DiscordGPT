import 'https://deno.land/std@0.179.0/dotenv/load.ts';

export function getEnv(key: string) {
  const value = Deno.env.get(key);
  if (value == undefined) {
    throw new Error(`Key ${key} must set`);
  }
  return value;
}
