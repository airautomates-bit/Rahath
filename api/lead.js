// Receives a call request from the Contact page form, posts it to the team's
// Telegram group and saves it as a row in the Google Sheet.
//
// Settings (Vercel → Project → Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN   the key BotFather gives you
//   TELEGRAM_CHAT_ID     the group's id, e.g. -1001234567890
//   SHEET_WEBHOOK_URL    the Google Apps Script web app address
//   SHEET_SECRET         any long password, the same one set in the script
//
// If neither Telegram nor the Sheet accepts the request, this answers with an
// error and the page falls back to sending it on WhatsApp, so nothing is lost.

const PACKAGES = new Set(["Standard Package - LKR 385,000", "Premium Package - LKR 600,000", "Not sure yet"]);
const CALL_TIMES = new Set(["10:00 AM", "12:00 PM", "4:00 PM", "8:00 PM", "Any time"]);
const TRAVELLERS = new Set(["1", "2", "3", "4", "5", "6+"]);
const ALLOWED_HOSTS = new Set(["www.rahathtours.com", "rahathtours.com"]);

const oneLine = (value, max) =>
  String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

const note = (value) =>
  String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 500);

const escapeHTML = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Today's date in Sri Lanka, as YYYY-MM-DD.
const colomboDate = (date = new Date()) => date.toLocaleDateString("en-CA", { timeZone: "Asia/Colombo" });

const dayLabel = (isoDate) => {
  if (isoDate === "Flexible") return "Whenever suits them";
  const today = colomboDate();
  const tomorrow = colomboDate(new Date(Date.now() + 864e5));
  const pretty = new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  if (isoDate === today) return `Today, ${pretty}`;
  if (isoDate === tomorrow) return `Tomorrow, ${pretty}`;
  return pretty;
};

// A Sri Lankan number written as 07X... becomes 947X... so the WhatsApp link works.
const whatsappDigits = (phone) => {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 10 && digits.startsWith("0")) digits = `94${digits.slice(1)}`;
  return digits;
};

const isAllowedOrigin = (req) => {
  const origin = req.headers.origin;
  if (!origin) return false;
  try {
    const { hostname, host } = new URL(origin);
    return ALLOWED_HOSTS.has(hostname) || host === req.headers.host;
  } catch {
    return false;
  }
};

function readLead(body) {
  const lead = {
    fullName: oneLine(body.fullName, 80),
    phoneNumber: oneLine(body.phoneNumber, 20),
    packageType: oneLine(body.packageType, 60),
    travellerCount: oneLine(body.travellerCount, 3),
    callDate: oneLine(body.callDate, 10),
    callTime: oneLine(body.callTime, 10),
    message: note(body.message),
  };

  const validDate =
    lead.callDate === "Flexible" ||
    (/^\d{4}-\d{2}-\d{2}$/.test(lead.callDate) && lead.callDate >= colomboDate(new Date(Date.now() - 864e5)));

  const valid =
    lead.fullName.length >= 2 &&
    /^[0-9+() -]{7,20}$/.test(lead.phoneNumber) &&
    PACKAGES.has(lead.packageType) &&
    TRAVELLERS.has(lead.travellerCount) &&
    CALL_TIMES.has(lead.callTime) &&
    validDate;

  return valid ? lead : null;
}

function telegramMessage(lead) {
  const pack = lead.packageType.replace(" Package - ", " (") + (lead.packageType.includes("LKR") ? ")" : "");
  const lines = [
    "🕋 <b>New call request</b>",
    "",
    `<b>Name:</b> ${escapeHTML(lead.fullName)}`,
    `<b>Phone:</b> ${escapeHTML(lead.phoneNumber)}`,
    `<b>Package:</b> ${escapeHTML(pack)}`,
    `<b>People:</b> ${escapeHTML(lead.travellerCount)}`,
    `<b>Call:</b> ${escapeHTML(dayLabel(lead.callDate))}, ${escapeHTML(lead.callTime === "Any time" ? "any time" : lead.callTime)}`,
  ];
  if (lead.message) lines.push(`<b>Note:</b> ${escapeHTML(lead.message)}`);
  lines.push("", `<a href="https://wa.me/${whatsappDigits(lead.phoneNumber)}">Message them on WhatsApp</a>`);
  return lines.join("\n");
}

async function sendToTelegram(lead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error("Telegram is not set up");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramMessage(lead),
      parse_mode: "HTML",
      link_preview_options: { is_disabled: true },
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Telegram answered ${response.status}`);
}

async function saveToSheet(lead) {
  const url = process.env.SHEET_WEBHOOK_URL;
  const secret = process.env.SHEET_SECRET;
  if (!url || !secret) throw new Error("The Sheet is not set up");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      received: new Date().toLocaleString("en-GB", { timeZone: "Asia/Colombo" }),
      ...lead,
      callDay: dayLabel(lead.callDate),
    }),
    redirect: "follow",
    signal: AbortSignal.timeout(8000),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.ok !== true) throw new Error("The Sheet did not save the row");
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ ok: false });
  }

  const body = req.body && typeof req.body === "object" ? req.body : {};

  // Real visitors never see or fill the "website" box; bots fill everything.
  // They get a normal answer so they don't learn they were caught.
  if (oneLine(body.website, 200)) {
    return res.status(200).json({ ok: true });
  }

  const lead = readLead(body);
  if (!lead) {
    return res.status(400).json({ ok: false });
  }

  const [telegram, sheet] = await Promise.allSettled([sendToTelegram(lead), saveToSheet(lead)]);
  for (const [name, result] of [["telegram", telegram], ["sheet", sheet]]) {
    if (result.status === "rejected") console.error(`lead ${name}: ${result.reason?.message}`);
  }

  if (telegram.status === "fulfilled" || sheet.status === "fulfilled") {
    return res.status(200).json({ ok: true });
  }
  return res.status(502).json({ ok: false });
};
