# Product Requirements Document (PRD)

## Product Title
**Startup Simulator: An AI-Powered Slack Game**

---

## Summary
A browser-based, turn-based game where the player (CEO) manages a fictional startup through interactions with AI-generated teammates via a Slack-like interface. Each character has a unique personality and role, and responds based on the company’s evolving strategy doc. Gameplay unfolds in "turns," where players trigger company activity and observe how their team reacts.

---

## Goals
- Create a humorous, emergent simulation of a startup team
- Give players tools to shape company direction and culture
- Deliver fun, LLM-powered team dynamics through a familiar chat UI
- Keep costs predictable and performance fast by batching interactions per turn

---

## Game Loop

1. **Setup**
   - Player names the company
   - Writes the initial vision/strategy (editable doc)
   - Hires 2–3 employees via a simple persona generator (role + personality sliders or presets)

2. **Turn Cycle**
   - Player clicks "Advance Turn"
   - System sends one prompt to OpenAI with context:
     - Strategy doc
     - Recent messages (last N per channel)
     - Employee list (with traits)
   - AI returns messages from each employee in public/private channels
   - Messages appear with realistic timing and "typing" indicators
   - Player can read and react (but not reply directly)
   - Optional: player may “highlight” part of a message to pin or note

3. **Player Actions Between Turns**
   - Edit the company strategy document
   - Hire or fire employees
   - Change team structure or roles
   - Trigger internal events (optional, e.g. “Board Meeting” or “Layoffs”)

---

## Key Features

### Channels
- `#general`, `#product`, `#random` (default)
- Public messages from employees appear here
- Add context with reactions, pins, hover details

### DMs
- Each employee has a private channel
- Can include sensitive opinions, gossip, personal goals

### Strategy Doc
- Shared editable document (markdown or rich text)
- All employees “read” this each turn
- Player can update it at any time

### Employee Personas
- Each employee has:
  - Name
  - Role (e.g. CTO, Head of Marketing)
  - Personality traits (e.g. cynical, enthusiastic, anxious)
  - Agenda (optional hidden goal or trigger)
- Personalities affect tone, initiative, alignment

### Hiring
- Choose role, traits, randomize appearance
- Onboarded in next turn

---

## Feel & Tone

- **Narrative voice:** Emergent, slightly absurd, but grounded in startup tropes
- **Design tone:** Slack-meets-The Sims
- **Humor:** Think *The Office* or *Silicon Valley* — believable dysfunction
- **Emotional dynamics:** Employees may argue, suck up, go quiet, flirt with quitting

---

## Technical Architecture

### Frontend
- Framework: Next.js
- Slack-like UI with:
  - Message threads per channel
  - Rich text editor for strategy doc
  - Modal for hiring flow
  - Turn control + loading indicator

### Backend
- Vercel API route or Edge Function
  - Accepts full game state
  - Calls OpenAI GPT-4o (JSON mode) with one prompt per turn
  - Parses returned JSON of employee messages
  - Writes results to DB

### LLM Prompting
- Shared system prompt with persona info
- User message includes:
  - Strategy doc
  - Turn number
  - Last 5 messages per channel
  - List of employees (roles + traits)

### LLM Output
- JSON like:
```json
{
  "messages": [
    {
      "sender": "Lola (CTO)",
      "channel": "#product",
      "content": "We should rebuild the backend in Rust. Thoughts?",
      "private": false
    },
    {
      "sender": "Lola (CTO)",
      "channel": "DM to CEO",
      "content": "Marketing is out of touch again. Can we talk about real priorities?",
      "private": true
    }
  ]
}
```

## Game mechanics

### Lurker mode
The CEO player can toggle on Lurker mode and view employee chat threads without the employees "knowing" the CEO can see their discussion. This boolean flag will need to passed in turn context and the employee agents will need to act accordingly.

### Hiring employees
When the CEO decides to hire a new employee, they are able to target certain attributes (TBD), pick a job role, and write a job description. When the employee is "hired" (created in the DB), assign random values along all personal attributes (TBD).

## Data Persistence
User Vercel infrastructure

Schema includes:

* Users
* Employees (name, role, traits, game_id)
* Messages (turn, employee_id, channel, content, private)
* Documents
* Turns (number, timestamp, strategy doc snapshot)

## Out of Scope (MVP)
* Real-time interaction (all comms are turn-based)
* Player replies in chat
* Long-term memory per employee (initial context only)
* Advanced game events (e.g. fundraising, revenue, competition)

## Stretch Ideas
* Add “events” (e.g. press crisis, VC pitch, feature launch)
* Employees quit or promote based on morale
* Time pressure (e.g. funding runway)
* Metrics dashboard showing startup KPIs
* Org chart
* Burn-rate/funding runway

