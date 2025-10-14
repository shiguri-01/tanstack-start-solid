import * as fs from "node:fs";

const filePath = "email-log.txt";

// メール送信のモック
export const sendEmail = async ({
  to,
  subject,
  body,
}: {
  to: string;
  subject?: string;
  body?: string;
}) => {
  const now = new Date().toISOString();
  const logEntry = `---
to: ${to}
subject: ${subject}
time: ${now}
---

${body}

---\n\n`;

  try {
    await fs.promises.appendFile(filePath, logEntry);
  } catch (e) {
    console.error("Failed to log email:", e);
  }
};

export const MIN_PASSWORD_LENGTH = 3; // テストプロジェクトのため短めに設定
