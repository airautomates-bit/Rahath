# Rahath: December + January Umrah ad (Meta)

One campaign, one ad set, one ad. The ad promotes both groups at once:
**16 December 2026** (seats filling) and **10 January 2027** (seats open).

## Why one ad for both dates

- **The budget is small.** At Rs 250–350 a day, Meta needs to put all of it in one place to learn
  who calls. Splitting into a December ad set and a January ad set gives each about Rs 150 a day,
  and neither one gets enough results to learn from.
- **It's the same buyer.** Both dates suit the same person with the same need. The only question
  is *when* they can travel, and the ad answers that by showing both dates.
- **The two dates help each other.** "Few seats left" in December pushes people to act now. Anyone
  who can't make December still has January, so they call instead of scrolling past.

When December is full, change the December card to **"Full"** and keep the ad running for January.
A sold-out group is good social proof. Re-render with `node ads/2026-12-umrah/render.mjs` after
editing `creative.html`.

## Campaign settings

| Setting | Value |
|---|---|
| Objective | **Leads** |
| Conversion location | **Calls** (optimise for calls) |
| Budget | **Rs 350 / day** campaign budget (Meta first flagged 350 as too small; on a retry it showed no error. If Publish is blocked, use Rs 500) |
| Schedule | Start now; review on 10 Dec, then switch to January-only messaging |
| Location | Sri Lanka → **Western Province** (Colombo, Gampaha, Kalutara), "People living in this location" |
| Age | 23–45 as a suggestion with Advantage+ audience on (Meta may go a little wider if it finds callers) |
| Gender | All |
| Detailed targeting | Leave to Advantage+ audience; you can add "Umrah" / "Hajj" / "Mecca" interests as suggestions |
| Placements | Advantage+ placements |
| Ad format | Single image, using **Flexible** media so Meta tests both images itself |
| Call button | "Call now" → +94 72 532 9242 |

**Don't change anything for the first 5–7 days.** Each edit restarts Meta's learning, and on this
budget, learning is slow.

## Images

| File | Use |
|---|---|
| `rahath-dec-jan-a-feed.png` (1080×1350) | Feed: Kaaba through the arches |
| `rahath-dec-jan-a-story.png` (1080×1920) | Stories / Reels: same |
| `rahath-dec-jan-b-feed.png` (1080×1350) | Feed: Arshad Moulavi guiding the group |
| `rahath-dec-jan-b-story.png` (1080×1920) | Stories / Reels: same |

## Copy

Note: Meta rejects ads that say or imply they know the viewer's religion ("As a Muslim…",
"Your Umrah…"). This copy talks about the trip and the group, not about the viewer.

### Primary text (add all 3; Meta picks the best)

**1. Dates + urgency**
> Umrah from Sri Lanka, two group departures:
>
> - 16 December 2026 (few seats left)
> - 10 January 2027 (seats open)
>
> Included:
> - Visa, return flights and transport
> - Hotels close to the Haram and Masjid an-Nabawi
> - Sri Lankan meals and Ziyarat tours
> - An experienced guide with the group the whole trip
>
> From LKR 385,000 per person. Paying in parts is fine.
>
> Call or WhatsApp 072 532 9242 for a free call. We'll answer every question.

**2. First-timer reassurance**
> Going for Umrah for the first time can feel like a lot to manage: the visa, the flights, the hotels, and knowing each ritual properly.
>
> With Rahath, all of it is arranged. Arshad Moulavi travels with the group, explains each step and why we do it, and stays until everyone is back home.
>
> Next groups: 16 December 2026 and 10 January 2027.
> Rated 5.0 on Google by 21 pilgrims.
>
> Tap "Call now" for a free call.

**3. Switching agency / social proof**
> "Everything was very well planned. There was no rush at all, and all the rituals were completed in a calm and pleasant manner." (Shamik Mohamed, Google review)
>
> 190+ pilgrims and 20+ groups so far, rated 5.0 on Google.
>
> Groups leave 16 December 2026 (few seats left) and 10 January 2027.
> Standard LKR 385,000. Premium (5-star) LKR 600,000.
>
> Call 072 532 9242

### Headlines (add all 3)
- Umrah: 16 Dec & 10 Jan groups
- Visa, flights & hotels included
- Rated 5.0 by 21 pilgrims

### Call description
- You'll speak with the Rahath Tours team about the 16 December and 10 January Umrah groups. The call is free.

No emojis in any ad text (client preference).

## Before or soon after launch

- [ ] Deploy the site update (next group now shows 16 December 2026).
- [ ] Add the **10 January 2027** group to the site, so people who look it up after the ad find it.
- [ ] Install the **Meta Pixel** and track `/requested` as a Lead. Right now Meta can't see website
      form leads. Note: the site's Content-Security-Policy in `vercel.json` must allow
      `connect.facebook.net` and `www.facebook.com` for the pixel to load.
- [ ] Make sure someone answers 072 532 9242 quickly during the day. Missed calls waste ad money.
