## INTRODUCTION
You have to create a small Meteor app using Svelte (preferably), Vue or React on frontend. Use MongoDB and vanilla CSS. If you have no prior experience with Meteor, just check out the tutorials or the guide - the knowledge required for this task is minimal.

Some implementation details are intentionally omitted to simulate a real-life situation where you are collaborating with non-programmers and have to make decisions on your own.

Download your solution to GitHub and share it with the following user: github@crs.org.pl.


## PREPARATION
1. [Install Meteor](https://www.meteor.com/developers/install).
2. Clone this repository. All required packages have been already added, you can start coding.


## ESSENTIAL TASKS
**Game map**
- Game map is a grid with a random number of rows and columns (2 < N <= 20).
- Each tile is one of 3 types, chosen randomly: Forest, Wasteland or City.
- Each tile has a background image; take it from `tiles.json`.
- When the app is launched for the 1st time, the map is generated automatically.
- User can remove the old map and generate a new one by clicking the "Reset" button.

**Pollution**
- There is no pollution in the beginning.
- Each City emits `P_emit` units of pollution every `T_emit` seconds.
- Pollution is distributed randomly between adjacent tiles according to the following rules:
  1. Wasteland and City can hold unlimited amount of pollution.
  2. Forest can hold `P_forest` units of pollution. If this limit is exceeded, Forest becomes a Wasteland.

**User input**
- User can click the "Reset" button to generate a new map.
- User can manipulate the parameters mentioned in the **Pollution** section. You (developer) should set some sensible defaults and limits.
- New values are applied immediately. Existing timers are not affected.

**UI**
- The header contains:
  - amount of groundwater pollution,
  - "Reset" button,
  - parameters inputs.
- The map is located below the header. It always fits the width of the container. It may have a vertical scrollbar if necessary.
- Each tile has a background image and a number of pollution.
- Tile's aspect ratio is defined by its background image aspect ratio (the same for all tiles).
- The layout must be responsive.


## BONUS TASKS
- The map always covers all available space below the header. It fits either width or height, depending on its aspect ratio. The other side may have a scrollbar if necessary.
- Add some nice styling for the header.
