import { app } from './app.js';
import { config } from './config/env.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`✨ VedicPanditji Backend Foundation Service`);
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`📡 Supabase Status: ${config.supabase.isConfigured ? 'CONNECTED' : 'PENDING_CREDENTIALS (Running in Safe Dev Fixture Mode)'}`);
  console.log(`=======================================================`);
});

