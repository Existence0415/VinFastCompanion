import type { IncomingMessage, ServerResponse } from 'node:http';
import { handleChatApiRequest } from '../src/server/chatHandler';

/**
 * Serverless API handler for /api/chat
 * Compatible with Vercel, Netlify, and standard Node.js server environments.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  return handleChatApiRequest(req, res);
}
