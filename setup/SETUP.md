# Call requests → Telegram group + Google Sheet

When someone presses **Request my call** on the Contact page, the request is:

1. posted to your Telegram group as a message, and
2. saved as a new row in a Google Sheet.

Until the steps below are done, the form still works: visitors are asked to send
the request on WhatsApp instead, as before. This takes about 10 minutes.

You will end up with four values to paste into Vercel:

| Name in Vercel       | What it is                                  |
| -------------------- | ------------------------------------------- |
| `TELEGRAM_BOT_TOKEN` | The bot's key (from BotFather)              |
| `TELEGRAM_CHAT_ID`   | Your group's id, a number starting with `-` |
| `SHEET_WEBHOOK_URL`  | The Apps Script web app address             |
| `SHEET_SECRET`       | A long password you make up                 |

Keep all four private. Don't post them in a chat or a group.

---

## 1. Make the password

Make up a long password with letters and numbers only, about 30 characters, for
example from a password manager. This is `SHEET_SECRET`. You'll paste it in two
places: the Google script and Vercel.

## 2. Create the Telegram bot

1. In Telegram, search for **@BotFather** (blue tick) and open it.
2. Send `/newbot`.
3. Give it a name, like `Rahath Requests`.
4. Give it a username ending in `bot`, like `rahath_requests_bot`.
5. BotFather replies with a token like `7123456789:AAH...`. This is `TELEGRAM_BOT_TOKEN`.

## 3. Add the bot to your group and find the group id

1. Open your group (you, your uncle and the employee), tap the group name, then **Add members**, and add the bot.
2. In the group, send: `/start@rahath_requests_bot` (use your bot's username).
3. On a computer, open this address in a browser, with your token in place of `TOKEN`:
   `https://api.telegram.org/botTOKEN/getUpdates`
4. Look for `"chat":{"id":-100...`. That number, including the minus sign, is `TELEGRAM_CHAT_ID`.

If the page shows `"result":[]`, send the `/start@...` message again and refresh.

## 4. Create the Google Sheet

1. Go to sheets.google.com and create a blank sheet. Name it `Rahath call requests`.
2. Click **Extensions → Apps Script**.
3. Delete what's there, then paste in everything from `google-sheet-script.gs` (in this folder).
4. On the line `const SECRET = "PASTE-THE-SAME-PASSWORD-AS-VERCEL";` put your password from step 1 between the quotes.
5. Click the save icon.
6. Click **Deploy → New deployment**. Click the gear next to "Select type" and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Click **Deploy**, then **Authorize access**, and choose your Google account.
   Google warns that the app isn't verified, because you wrote it yourself. Click **Advanced → Go to (project name)**, then **Allow**.
8. Copy the **Web app URL**, which ends in `/exec`. This is `SHEET_WEBHOOK_URL`.

"Anyone" only means the website's server can reach the script. Without the
password it refuses everything, and the Sheet itself stays private to you.
Share the Sheet with your uncle and the employee if they should see it.

## 5. Add the four values to Vercel

1. Open the project on vercel.com, then go to **Settings → Environment Variables**.
2. Add each of the four names and values from the table above, for **Production**.
3. **Redeploy** the site. Vercel only picks up new values on a fresh deployment.

## 6. Test it

On www.rahathtours.com/contact, fill in the form with your own name and number
and press **Request my call**. Within a few seconds you should see:

- the message in the Telegram group, and
- a new row in the Sheet with the status `New`.

If only one of them arrives, the visitor still sees "Request received". In
Vercel, go to **Logs** and search for `lead` to see which one failed.

### Tips

- Change the **Status** column as you go (`Called`, `Booked`, `Not interested`) to keep track.
- If you ever change the script, use **Deploy → Manage deployments → Edit → New version**, so the `/exec` address stays the same.
- If the bot token leaks, send `/revoke` to BotFather, then update `TELEGRAM_BOT_TOKEN` in Vercel and redeploy.
