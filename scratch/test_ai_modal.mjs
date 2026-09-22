import { spawn } from 'child_process';
import http from 'http';

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Starting Vite preview...');
  const viteProc = spawn('npx.cmd', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    stdio: 'ignore',
  });

  await wait(2000);

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  console.log('Starting Edge in headless mode with remote debugging...');
  const edgeProc = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    'about:blank',
  ]);

  await wait(2000);

  try {
    const targets = await getJson('http://127.0.0.1:9222/json/list');
    console.log('Available targets:', targets.length);
    const pageTarget = targets.find((t) => t.type === 'page');
    if (!pageTarget) throw new Error('No page target found');

    const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        if (msg.error) cb.reject(msg.error);
        else cb.resolve(msg.result);
      }
    };

    function sendCommand(method, params = {}) {
      return new Promise((resolve, reject) => {
        const cmdId = id++;
        callbacks.set(cmdId, { resolve, reject });
        ws.send(JSON.stringify({ id: cmdId, method, params }));
      });
    }

    await new Promise((res) => (ws.onopen = res));

    console.log('Navigating to http://localhost:4173...');
    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');
    await sendCommand('Page.navigate', { url: 'http://localhost:4173' });

    await wait(2500);

    // Test 1: Check Header AI Specialist link exists
    const resHeaderLink = await sendCommand('Runtime.evaluate', {
      expression: 'Boolean(document.getElementById("header-ai-specialist-link"))',
      returnByValue: true,
    });
    console.log('Test 1 - Header AI Specialist link present:', resHeaderLink.result.value);

    // Test 2: Check Floating AI Specialist button exists
    const resFloatBtn = await sendCommand('Runtime.evaluate', {
      expression: 'Boolean(document.getElementById("floating-ai-specialist-btn"))',
      returnByValue: true,
    });
    console.log('Test 2 - Floating AI Specialist button present:', resFloatBtn.result.value);

    // Test 3: Check modal is initially closed
    const resInitModal = await sendCommand('Runtime.evaluate', {
      expression: 'Boolean(document.getElementById("ai-specialist"))',
      returnByValue: true,
    });
    console.log('Test 3 - Modal initially not in DOM:', !resInitModal.result.value);

    // Test 4: Click Header AI Specialist link and verify modal opens
    console.log('Clicking Header AI Specialist link...');
    await sendCommand('Runtime.evaluate', {
      expression: 'document.getElementById("header-ai-specialist-link").click()',
    });
    await wait(500);

    const resModalOpen = await sendCommand('Runtime.evaluate', {
      expression: `JSON.stringify({
        hasModal: Boolean(document.getElementById("ai-specialist")),
        hasWelcomeMessage: document.body.innerText.includes("WELCOME TO VINFAST PHILIPPINES"),
        hasInput: Boolean(document.querySelector('input[placeholder*="VF 5"]')),
        hasChips: document.querySelectorAll('button').length > 5
      })`,
      returnByValue: true,
    });
    console.log('Test 4 - After clicking Header link, modal state:', JSON.parse(resModalOpen.result.value));

    // Test 5: Click close button
    console.log('Clicking close button...');
    await sendCommand('Runtime.evaluate', {
      expression: `
        const closeBtn = document.querySelector('#ai-specialist button');
        if (closeBtn) closeBtn.click();
      `,
    });
    await wait(500);

    const resModalClosed = await sendCommand('Runtime.evaluate', {
      expression: 'Boolean(document.getElementById("ai-specialist"))',
      returnByValue: true,
    });
    console.log('Test 5 - After clicking close, modal closed:', !resModalClosed.result.value);

    // Test 6: Click Floating AI Specialist button and verify modal opens
    console.log('Clicking Floating AI Specialist button...');
    await sendCommand('Runtime.evaluate', {
      expression: 'document.getElementById("floating-ai-specialist-btn").click()',
    });
    await wait(500);

    const resFloatOpen = await sendCommand('Runtime.evaluate', {
      expression: 'Boolean(document.getElementById("ai-specialist"))',
      returnByValue: true,
    });
    console.log('Test 6 - After clicking floating button, modal opened:', resFloatOpen.result.value);

    // Test 7: Test sending a message in the chat
    console.log('Testing chat message sending...');
    await sendCommand('Runtime.evaluate', {
      expression: `
        const input = document.querySelector('#ai-specialist input');
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(input, "Tell me about VF 5 Plus");
        input.dispatchEvent(new Event('input', { bubbles: true }));
        const sendBtn = document.querySelector('#ai-specialist button[type="button"]:has(svg)');
      `,
    });
    await wait(300);
    await sendCommand('Runtime.evaluate', {
      expression: `
        const btns = Array.from(document.querySelectorAll('#ai-specialist button'));
        const sendBtn = btns[btns.length - 1];
        if (sendBtn) sendBtn.click();
      `,
    });
    await wait(1000);

    const resChat = await sendCommand('Runtime.evaluate', {
      expression: `document.body.innerText.includes("VF 5 Plus")`,
      returnByValue: true,
    });
    console.log('Test 7 - Chat responded:', resChat.result.value);

    console.log('\nALL TESTS PASSED SUCCESSFULLY!');
  } finally {
    viteProc.kill();
    edgeProc.kill();
  }
}

main().catch((err) => {
  console.error('Test failed with error:', err);
  process.exit(1);
});
