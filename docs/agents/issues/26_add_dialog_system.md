# Issue: Add Dialog System

## Description

The game engine needs a dialog system to display character conversations. Dialogs appear at the bottom of the page, showing one message at a time with navigation controls to move forward and backward through the conversation.

## Problem

- There is no dialog system in the engine
- NPCs and the Player have no shared abstraction for representing a speaking character
- There is no way to display a sequence of character messages in the UI
- The example games have no NPC-to-player dialog to demonstrate the feature

## Expected Behavior

- A `Dialog` class holds an ordered list of `Message` objects
- Each `Message` can be linked to a `Character` (NPC or Player) via a `getName()` interface
- `NPC` and `Player` both implement a common `Character` interface exposing `getName()`
- The `Game` exposes a method to trigger a dialog; dialogs can also be associated with a player choice
- `Dialog` has an optional `onEnd` callback (a function) executed when the dialog closes; this allows a choice to trigger navigation or any side-effect after the dialog ends
- The `Character` interface includes a portrait URL attribute; both `NPC` and `Player` must implement it; the silhouette image is used as a fallback when no URL is set
- When a dialog is active, a dialog box appears at the bottom of the page showing the current message
- The dialog box layout:
  - **Left side:** square portrait image (character's portrait URL, or silhouette placeholder as fallback) with the character name below it
  - **Right side:** the message text
  - If the message has no associated character, only the message text is displayed (no portrait or name)
- "Next" and "Previous" navigation controls allow the player to move between messages
- The "Previous" button is hidden on the first message
- Pressing "Next" on the last message closes the dialog box and fires `onEnd` if defined
- While a dialog is active, scene choices are blocked and hidden
- At least one example game includes a dialog between an NPC and the player, with portrait URLs set on all characters

## Solution

- Define a `Character` interface with `getName()` and a portrait URL attribute
- Refactor `NPC` and `Player` to implement `Character` (including the portrait URL)
- Implement a `Message` class that holds text and an optional `Character` speaker
- Implement a `Dialog` class that holds an ordered list of `Message` objects and an optional `onEnd` callback
- Add a `displayDialog(dialog)` method to `Game`
- Create a `DialogBox` React component rendered at the bottom of the page:
  - Left column: square portrait image (placeholder silhouette asset) + character name below
  - Right column: message text
  - If no character is associated with the message, render only the message text
  - "Previous" button hidden on the first message; "Next" on the last message closes the dialog
  - Scene choices are hidden while the dialog is open
- Add a silhouette placeholder image to serve as the default character portrait
- Update the example games to include an NPC-player dialog triggered both on scene entry and via a player choice, with portrait URLs configured for all characters; the player-choice dialog should use `onEnd` to navigate to the next scene after closing

## Benefits

- Enables narrative storytelling and NPC interactions in games built with Edwin
- Establishes a `Character` abstraction that can be extended for future features
- Provides a reference implementation in the example games

---
See issue for details: https://github.com/darthjee/edwin/issues/26
