import type { INodeProperties } from 'n8n-workflow';
import { startEmailVerificationDescription } from "./startEmailVerification";
import { getEmailVerificationResultDescription } from "./getEmailVerificationResult";

export const emailVerifierDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: { resource: ['emailVerifier'] },
    },
    options: [
      {
        name: 'Start Email Verification',
        value: 'startEmailVerification',
        action: 'Start email verification',
      },
      {
        name: 'Get Email Verification Result',
        value: 'getEmailVerificationResult',
        action: 'Get email verification result',
      },
    ],
    default: 'startEmailVerification',
  },
  ...startEmailVerificationDescription,
  ...getEmailVerificationResultDescription,
];
