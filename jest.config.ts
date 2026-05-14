import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  coverageProvider: 'v8' as const,
  testEnvironment: 'jsdom' as const,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
 collectCoverageFrom: [
  "src/app/components/**/*.{js,jsx,ts,tsx}",
  "src/app/services/patient.service.ts",
  "!src/app/components/print/medical-record-print.{js,jsx,ts,tsx}",
  "!src/app/components/dashboard/patient-chart.{js,jsx,ts,tsx}"
],
};

export default createJestConfig(config);
