const ENVIRONMENTS = [
  'development',
  'production',
  'test',
] as const satisfies string[];

export type EnvironmentConfiguration = (typeof ENVIRONMENTS)[number];
