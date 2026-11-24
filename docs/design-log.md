# Design log

How the design changed and why. Each entry is a decision that is visible in the commit history and in the prototype.

## Direction
- **Light iOS style tried, then reverted.** I explored a light, iOS-native look first. The product is about money and trust, and the dark UI with soft surfaces felt calmer and more premium, so I went back to dark.

## Visual language
- **Borders removed everywhere.** Separation now comes from surface tone and spacing only. Lists use very low-contrast separators.
- **Primary actions are white, not blue.** One white button per screen is the obvious next step. Blue is reserved for *selected* and *active* (Buy/Sell state, chosen payment method, checkboxes), so it keeps a single meaning.
- **Selected payment method** gets a filled blue check instead of a highlighted border.
- **Secondary buttons lost their background and arrows** on the dashboard to reduce noise; filled icons are used consistently.
- **3D illustrations** (coin, chain, lock, thumbs-up, bolt) replace flat icons on onboarding and key states. Their size is normalised across slides so the rhythm stays even.

## Layout (Telegram Mini App)
- Fixed full-height viewport, safe-area spacing, and a bottom action area that sits in the same place on every screen.
- Header and bottom navigation stay fixed while content scrolls inside.
- Buy and Sell fit one screen without scrolling.
- Page titles are truly centred, independent of the Back button width.
- Bottom sheets close on an outside tap.

## Flows
- **Send → Transfer.** One entry point opens a sheet with Withdraw and Receive, instead of two competing top-level buttons.
- **Review before every money action.** Buy, Sell and Withdraw all end in a review screen with a single Confirm button.
- **Discard confirmation.** Leaving a half-filled order or withdrawal opens a sheet ("Discard transaction?") instead of silently losing input.
- **Withdraw.** Network selector, inline address validation ("TRC-20 address must start with 'T'"), recent addresses, fee and "you will receive" breakdown, and a disabled Proceed until the form is valid.
- **Receive.** Large QR code, wrong-network warning, Copy Address pinned to the bottom.

## Onboarding
- Three story-style slides (privacy, live rate, escrow) → "Lock it down" (Face ID / PIN) with "Set up later" as a quiet exit.
- Copy tightened: no trailing dots in titles, no forced line breaks, plain verbs.

## Open questions
- Does "Dolar Blue in your pocket" read clearly to people outside Argentina?
- Are white-on-dark contrast and the 11–13 px labels comfortable for older users?
- Should the escrow explanation appear again at the moment of payment, not only in onboarding?
