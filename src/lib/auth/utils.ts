import * as fs from "node:fs";
import { createServerFn } from "@tanstack/solid-start";

const filePath = "email-log.txt";

// メール送信のモック
export const sendEmail = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { to: string; subject?: string; body?: string }) => data,
  )
  .handler(async ({ data }) => {
    const now = new Date().toISOString();
    const logEntry = `---
to: ${data.to}
subject: ${data.subject}
time: ${now}
---

${data.body}

---\n\n`;

    try {
      await fs.promises.appendFile(filePath, logEntry);
    } catch (e) {
      console.error("Failed to log email:", e);
    }
  });

export const MIN_PASSWORD_LENGTH = 3; // テストプロジェクトのため短めに設定
