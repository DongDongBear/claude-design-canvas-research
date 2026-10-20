# What are artifacts and how do I use them? | Claude Help Center
URL: https://support.claude.com/en/articles/17153992-what-are-artifacts-and-how-do-i-use-them

What are artifacts and how do I use them? | Claude Help Center

# What are artifacts and how do I use them?

 Updated over a week ago

An artifact is anything Claude makes for you that you'd put in front of someone: a design, a deck, a document, a dashboard, or a small interactive tool. It opens beside your conversation, and you can edit it, come back to it, and share it with others. Ask for one in any conversation with Claude, including in Claude Code, or start from a template in the “Artifacts” tab.

Artifacts are available on Free, Pro, Max, Team, and Enterprise plans, and in Claude Code on every plan that includes Claude Code. The Docs, Slides, and Design templates are available on all plans and are on by default. On Enterprise plans, they turn on by default on October 15, 2026, and owners can turn them on before then.

The Dashboards template is in beta on Pro, Max, Team, and Enterprise plans. On Enterprise plans, it's off by default until an owner turns it on. The Motion template is in beta on Team and Enterprise plans. It's on by default on Team plans and off on Enterprise plans until an owner turns it on.

Feature

Free

Pro

Max

Team

Enterprise

Create artifacts in a chat

Start from a Docs, Slides, or Design template

Start from a Dashboards template (beta)

Start from a Claude Motion template (beta)

Connect your apps to an artifact

Store data in an artifact

Important: Artifacts require Cloud code execution and file creation to be turned on in Settings > Capabilities (Free, Pro, Max) or Organization settings > Capabilities (Team, Enterprise).

## What is an artifact?

Note: Legacy artifacts are artifacts made in a chat before September 16, 2026. They keep working, and you can still publish and share them, but you can't make new ones.

Claude creates an artifact when the content it's sharing meets these criteria:

- It's significant and self-contained, typically over 15 lines.
- It's something you're likely to want to edit, iterate on, or reuse outside the conversation.
- It stands on its own without needing extra context from the conversation.
- It's content you're likely to refer back to or use later.

Claude can make an artifact out of almost anything, including documents, code snippets, single-page websites, images, diagrams and flowcharts, dashboards, and small interactive tools.

## Where you can use artifacts

- Claude on the web and Claude Desktop: Create, edit, and share artifacts, and start from a template.
- Claude Code: Publish session output as an artifact, or make designs and docs. See Artifacts in Claude Code below.
- Claude for iOS and Claude for Android: Ask for a design, deck, or doc in any chat, view the result in the Artifacts tab, and edit the artifact. To change sharing settings, use Claude on the web or Claude Desktop.

## Start from a template

Templates are starting points for work you'll share with others. Ask for one in any chat, select "Output" in the message box and choose a template, or pick one in the Artifacts tab.

- Docs: Living documents you write with Claude and your team in real time. Learn more in Get started with Claude Docs.
- Slides: Presentations built from your notes, reports, or the work already in your chat. Edit any slide directly, present without leaving Claude, and export to PowerPoint or PDF. To edit and present with a keyboard or screen reader, see Use Claude Slides with a keyboard below.
- Design: Visuals, mockups, prototypes, one-pagers, and landing pages, built with your design system. Learn more in Get started with Claude Design.
- Dashboards (beta): Dashboards built from your data platforms or connected apps, like Salesforce. Claude writes the queries, and each chart shows its query and when it was last refreshed. Learn more in Get started with Claude Dashboards.
- Motion (beta): Animated explainers, charts, and walkthroughs built from your content. Ask Claude to change any detail, like a word, a number, or the timing, and the rest stays as it was. Export the result as an MP4 video. Available on Team and Enterprise plans. Learn more in Get started with Claude Motion.

Whichever template you start from, the artifact works the same way: edit it by talking to Claude or directly in the artifact, and it updates live as you work. When it's ready, share it or export it.

Designs and decks can use a design system, so new work picks up your colors, fonts, and components. Learn more about setting up your design system.

## Find your artifacts

Everything you make is saved to the Artifacts tab in your Claude sidebar, so you can find it again from any conversation. From there you can view all your artifacts in one place, start a new one from a template, and organize what you've made.

## Work with artifacts

An artifact opens in its own window beside your conversation. Artifacts made from a template open on a canvas or page you can work in directly.

## Edit and iterate

- Ask Claude to change the artifact.
- In an artifact made from a template, edit directly: type in a doc, edit a slide, or move elements on a design canvas.
- In a doc or Markdown document, highlight the text you want changed, click "Edit with Claude," and type your request. Claude makes the edit where you marked it, so you don't have to describe which section you mean.
- Edit an earlier message to create a different version of the chat, with its own artifacts, so you can explore another direction without losing previous work.

Note: When Claude drafts content across multiple Markdown files, such as a skill or plugin, you can leave edit requests in several files before submitting. Each request is added to your next message, and the file list shows how many are waiting in each file. Send the message and Claude applies the whole batch in one pass.

## View and export

- Artifacts made from a template: Click "Export." Docs export to Word, PDF, Markdown, and Google Docs. Decks export to PowerPoint and PDF, or go straight to Google Slides as editable files. Designs export as a .zip, PDF, PowerPoint, or standalone HTML, or go straight to another tool. Animations export as MP4 video.
- Legacy artifacts: Use the controls at the top of the artifact panel to view the code, copy the content, or download it.

## Build on a published artifact

Available on Free, Pro, and Max plans, for legacy artifacts published from a chat.

If someone publishes an artifact you like, you can use it as a starting point for your own version. Your version is separate, so nothing you do affects the original.

Important: Only do this with artifacts from people you trust. You're bringing someone else's code and content into your own chat, so treat it the way you'd treat a file from an unknown sender.

1. Open the published artifact and click "Copy" to copy its code.
2. Start a new chat, paste the code, and describe the changes you want. For example: "Here's the code for a quiz game. Change the questions to be about movies and add a timer."
3. Refine the new artifact the same way you would any artifact you made yourself.

## Fix errors

If an artifact generates an error, look for the "Try fixing with Claude" button near the error message. Click it to copy the error details into a new message, then send it to Claude to diagnose the issue and suggest a fix. Claude will attempt to fix the error, but success isn't guaranteed. Some errors need more troubleshooting.

## Use Claude Slides with a keyboard

To get into and out of the artifact panel, and to comment from the panel's header, see Use artifacts with a keyboard or screen reader. That article also explains what focus means, what to do on a Mac laptop or in Safari, and how the tables show keys.

The editor is divided into areas: the toolbar at the top, the slide you're editing, a formatting toolbar that floats over whatever is selected, the list of slide thumbnails, and the properties panel.

### Move between the editor's areas

Press F6 to move to the next area and Shift+F6 to move to the previous one. Cmd+F6 (Ctrl+F6 on Windows) works in place of F6, with or without Shift. Each area remembers where you last were in it. F6 is paused while a menu, pop-up, or dialog is open, and while you're presenting.

### Edit a slide

The slide is a single stop when you press Tab. The objects on it are inside the slide: you go into the slide to reach them, and a group has its own objects inside it in the same way.

1. Press Tab until you reach the slide.
2. Press Return to go into the slide.
3. Press Tab or Shift+Tab to move between the objects on the slide. Tab doesn't leave the slide.
4. Press Return on a text box to start editing it. The cursor starts at the end of the text. On a group, Return moves inside the group.
5. Type your changes.
6. Press Escape or Tab to finish editing. Your change is kept.
7. Press Escape again to go back out to the slide. From inside a group, Shift+Return goes up one level instead.

In a table, Tab and Return move between cells. Press Escape or Cmd+Return (Ctrl+Enter on Windows) to finish.

With a free-standing object selected, the arrow keys move it (an object that's part of the slide's layout stays where the layout puts it), and F6 takes you to its formatting toolbar. With a screen reader, the slide and each object tell you which key goes in and which comes back.

### Move between slides

With nothing selected on the slide, press the Left arrow or Right arrow key, or Page Up or Page Down, to change slides. With a screen reader, you hear the new slide's number and title. If an object is selected, the arrow keys move the object instead, so press Escape first.

You can also press F6 until you reach the list of thumbnails. There, the Left arrow and Right arrow keys move between slides, showing each one in the editor as you go, and Return moves you onto that slide.

Important: Delete or Backspace on a thumbnail deletes that slide right away. Cmd+Z (Ctrl+Z on Windows) brings it back.

### Present a deck

1. Press Tab until you reach "Present" in the toolbar.
2. Press Return to open its menu.
3. Press Return on "Present" to start.

While you're presenting, press the Right arrow key or Space for the next slide, the Left arrow key for the previous one, and Escape to end. With a screen reader, you hear each slide's number and title as it appears. When you end the presentation, focus returns to "Present."

### Comment on a slide

To comment on a slide or on something on it, see "Comment on a deck or a design" in Use artifacts with a keyboard or screen reader.

### Get an overview of a deck

The "Canvas" view, which shows every slide at once, doesn't give a screen reader anything to read. Use the list of thumbnails instead.

### Claude Slides keyboard shortcuts

Action

Mac

Windows

Next area

F6 or Cmd+F6

F6 or Ctrl+F6

Previous area

Shift+F6 or Cmd+Shift+F6

Shift+F6 or Ctrl+Shift+F6

Go into the slide, a group, or a text box

Next object, previous object

Tab, Shift+Tab

Tab, Shift+Tab

First object, last object

Home, End

Home, End

Up one level

Shift+Return

Shift+Enter

Escape or Tab

Escape or Tab

Next cell (while editing a table)

Tab or Return

Tab or Enter

Finish editing a table

Escape or Cmd+Return

Escape or Ctrl+Enter

Move the selected object (free-standing objects only)

Arrow keys (Shift for smaller steps)

Arrow keys (Shift for smaller steps)

Bring to front, send to back (free-standing objects only)

], [

], [

Duplicate the object, or the slide when focus is in the list of thumbnails

Cmd+D

Ctrl+D

Delete

Delete or Backspace

Delete or Backspace

Bold, italic, underline (on a text box)

Cmd+B, Cmd+I, Cmd+U

Ctrl+B, Ctrl+I, Ctrl+U

Undo, redo

Cmd+Z, Cmd+Shift+Z

Ctrl+Z, Ctrl+Shift+Z or Ctrl+Y

Add a text box

Add a rectangle, rounded rectangle, oval, or diamond

R, Shift+R, O, D

R, Shift+R, O, D

Add a line or a connector

L, Shift+L

L, Shift+L

Previous slide, next slide (nothing selected)

Left arrow or Page Up, Right arrow or Page Down

Left arrow or Page Up, Right arrow or Page Down

Zoom in, zoom out, fit to the window

Cmd+Plus, Cmd+Minus, Cmd+0

Ctrl+Plus, Ctrl+Minus, Ctrl+0

If the arrow keys don't move an object, it's part of the slide's layout, which positions it for you. Ask Claude to move it. The single-letter shortcuts work when you're not typing and focus isn't on the formatting toolbar or in the properties panel. The new object appears on the slide, selected, and a new text box opens for typing. Cmd+Z (Ctrl+Z on Windows) removes it. For a new text box, press Escape first to finish typing.

In the formatting toolbar: the Left arrow and Right arrow keys move between buttons, Home and End move to the first and last, Return or Space uses a button, and Tab or Escape goes back to the object.

In the list of thumbnails (the Menu key is the key some Windows keyboards have between the right Alt and Ctrl keys; it opens the menu you'd get with a right-click):

Previous slide, next slide (the editor shows it as you go)

Move onto that slide in the editor

Shift+F10

Shift+F10 or the Menu key

Delete the slide (a deck keeps at least one)

Delete or Backspace

Delete or Backspace

The slide's menu includes "Duplicate slide," "Add slide after," "Move left," "Move right," "Skip slide," and "Delete slide." "Move left" and "Move right" are how you reorder slides from the keyboard.

While presenting:

Right arrow, Down arrow, Page Down, or Space

Home or End

Jump to that slide, if the deck has that many

1 to 9

Full screen on or off

End the presentation

Escape

Note: In Chrome versions 150 to 152, and in Claude Desktop, VoiceOver doesn't read text as you type or move through it in a text box on a slide. Use Chrome 153 or later.

## Artifacts that use Claude

You can build artifacts that call Claude directly, turning them into small apps. People using your artifact can ask questions, generate content, get coaching, play games, and solve problems, with Claude adapting to what they enter.

Describe what you want, Claude writes the code, and the app runs on Anthropic's infrastructure. People using it sign in with their Claude account and interact with their own instance.

No API keys are required, and there's no cost to you. Whether your artifact helps 10 people or 10,000, sharing is free, and usage counts against each person's own plan limits rather than yours. On Team and Enterprise plans, people in your organization can use what you share without adding cost for you.

For legacy artifacts, you can turn this off with the AI-powered artifacts setting in Settings > Capabilities. New artifacts ask you for permission the first time they want to use Claude.

## Connect your apps to an artifact

Available on Pro, Max, Team, and Enterprise plans, on Claude on web and desktop.

Artifacts can connect to the apps you've connected to Claude, so they can read from and write to tools like Asana, Google Calendar, and Slack. They can also connect to any custom connectors you've set up.

The first time an artifact needs a connected app, Claude shows which apps and tools it will use and asks you to approve them. You can turn individual tools off, and your choice carries over to later uses of that artifact. Connector tools that need approval for each action aren't available to artifacts.

Important: Everyone connects their own apps, even when using a shared or published artifact. On Team and Enterprise plans, an owner can turn this off for your whole organization. Learn more in the Artifacts admin guide for Team and Enterprise plans.

## Store data in an artifact

Available on Pro, Max, Team, and Enterprise plans, on Claude on the web and Claude Desktop.

Artifacts can store data between sessions, so you can build things like journals, trackers, and collaborative tools. Storage is either personal or shared:

- Personal storage: Everyone keeps their own private data. In a journal artifact, your entries stay visible only to you.
- Shared storage: Everyone sees and works with the same data. In a game leaderboard, everyone sees the same s

# Share artifacts | Claude Help Center
URL: https://support.claude.com/en/articles/9547008-share-artifacts

Share artifacts | Claude Help Center

# Share artifacts

 Updated over 3 weeks ago

This article explains how to share an artifact, who can open it, and what people see when they do. It covers every plan and every place you make artifacts: in a chat, from a template, and in Claude Code.

Artifacts start private to you. Nothing is shared until you share it.

Sharing option

Free

Pro

Max

Team

Enterprise

Share with anyone who has the link

Share with everyone, or with specific people, in your organization

Share with groups

Invite specific people by email (beta)

Publish a legacy artifact (made in a chat)

Share a legacy artifact with "Share & copy link"

On Team and Enterprise plans, artifacts stay inside your organization by default. An owner decides whether users can share outside it. Learn more in the Artifacts admin guide for Team and Enterprise plans.

Note: Live artifacts, which are Cowork artifacts made before August 19, 2026, have their own sharing rules. Learn more about using live artifacts in Claude Cowork.

Note: Legacy artifacts show "Publish" or "Share & copy link" instead of "Share." To share those, see Publish or share a legacy artifact.

## Share an artifact

1. Open the artifact and click "Share."
2. On Team and Enterprise plans, add people from your organization, and choose each one's access level. Enterprise plans can also add groups.
3. Under Who has access, choose who else can open the artifact.
4. Copy the link and send it.

Note: You can't change sharing settings in Claude for iOS or Claude for Android. Use Claude on the web or Claude Desktop.

### Choose who has access

- Pro and Max plans: "Only you" or "Anyone with the link." To give specific people access, invite them by email.
- Team and Enterprise plans: "Only people invited," "Anyone at [your organization's name]," or "Anyone with the link." "Only you" shows when you haven't added anyone. "Anyone with the link" is available only when an Owner has turned on External sharing or has allowed that artifact individually. If it's grayed out, ask an Owner or Primary Owner.

### Choose an access level

Access

What people can do

Can view

Open the artifact and read its comments.

Commenter

Everything in Can view, plus add comments and download any files the artifact offers.

Can edit

Everything in Commenter, plus make changes.

The levels you can choose depend on the artifact. Can view or Can edit. Every other type of artifact offers all three levels.

## Invite people by email

Available in beta on Pro, Max, Team, and Enterprise plans.

You can invite specific people by email to access an artifact. They sign in to Claude with the email address you used and open the artifact with the access you give them. Unlike "Anyone with the link," an invitation works only for the person you invite.

### Before you invite someone

- Who can invite: The artifact's owner. On Team and Enterprise plans, anyone in your organization who can edit the artifact can also invite people. The owner gets an email when someone else sends an invitation.
- Team and Enterprise plans: Email invitations outside your organization needs to be on in Organization settings > Artifacts. It's on by default on Team plans and off on Enterprise plans. If you don't see the option, ask an Owner or Primary Owner.
- The invitee needs a Claude account with the email address you invited. If they don't have one, they need to create one with that address before they can open the artifact. Claude doesn't tell you whether or not they have an account.
- Some artifacts can't be shared this way. The "Share" menu tells you when this applies:

- Documents made with Claude Docs
- Artifacts that connect to other websites
- Artifacts with an uploaded file that's still being checked or didn't pass the check

### Send an invitation

1. Open the artifact and click "Share."
2. In the field at the top of the Share menu (Add people, or Invite people by email on Pro and Max plans), type the person's email address.
3. Select the Invite option that shows their address.
4. Under Their access, choose "Can view," "Commenter," or "Can edit."
5. Click "Invite."

On Team and Enterprise plans, if you type the address of someone in your organization, they're added to the artifact directly instead of getting an invitation.

### What people you invite can do

People you invite from outside your organization can't invite others or change sharing settings. Parts of the artifact that use Claude or your connectors don't work for them. People with “Can edit” access can't delete the artifact, and they can upload only images and videos to it.

People you invite with “Commenter” or “Can edit” access can comment, but they can't mention people or ask Claude in a comment, and they don't get email notifications about comments. They can't comment on an artifact that's also shared with "Anyone with the link."

If the artifact is also shared with "Anyone with the link," the people you invited have the same access as anyone with the link, whatever level you gave them.

### Manage people you've invited

In the artifact's Share menu, people you've invited appear under Invited from outside your organization, and pending invitations show when they expire. From there, you can change someone's access or remove them. Removing someone takes away their access right away.

If someone didn't get an invitation email because they didn't have a Claude account yet, ask them to create one with that address. Then remove the invitation and invite them again.

### When access changes

- Pending invitations expire after 30 days. Accepted invitations don't expire.
- If you change who can open the artifact to "Only you": On Team and Enterprise plans, everyone you invited from outside your organization loses access, and their invitations are removed. On Pro and Max plans, people you invited keep their access.
- If you delete the artifact: Everyone you invited loses access.
- If the person who sent an invitation leaves your organization or loses edit access: Their pending invitations stop working. People who already accepted keep access until someone removes them.
- If an owner turns off email invitations: People you invited can't open the artifact until the setting is turned back on. Accepted invitations aren't deleted, and pending ones still expire 30 days after they were sent.

### Limits

- You can invite up to 50 people from outside your organization per artifact, counting pending and accepted invitations.
- Invitation emails are in English.

## Who can open a shared artifact

- Everyone needs a Claude account. People without one can't open a shared artifact, even with the link. The only exception is a legacy artifact published from a chat.
- Everyone in your organization: Only people signed in to your organization can open it.
- Anyone with the link: Anyone signed in to Claude who has the link can open it. On Team and Enterprise plans, if an owner turns off External sharing, these links stop working until it's turned back on, unless an owner has allowed that artifact individually.

### Artifacts that can't be shared outside your organization

- By link: Artifacts that connect to your apps or use Claude can't use "Anyone with the link." On Team and Enterprise plans, docs can't use it yet either.
- By email invitation: See the list in Before you invite someone.

### What people see when they open your artifact

- Viewers use their own access. An artifact that pulls from connected apps uses the viewer's connections, not yours. If a viewer can't access a data source, that part of the artifact shows an error instead of your data.
- Stored information can be shared. Some artifacts save information that everyone who opens them can see, like items in a shared tracker. Before you enter sensitive information, check whether the artifact uses shared storage.

Important: Only open shared artifacts from people you trust. Treat someone else's artifact the way you'd treat a file from an unknown sender.

## Stop sharing an artifact

To stop sharing an artifact, open it, click "Share," and under Who has access, choose "Only you" (Pro and Max) or "Only people invited" (Team and Enterprise). To remove someone you added, open their access level and select "Remove."

On Team and Enterprise plans, owners can also remove outside access to individual artifacts. Learn more in the Artifacts admin guide for Team and Enterprise plans.

## Open an artifact you were invited to

1. Open the email from Claude (no-reply-claude@mail.anthropic.com). It shows the email address of the person who invited you and what access you'll have.
2. Click "View invitation" and sign in to Claude in a web browser with the address the invitation was sent to.
3. Click "Accept and open."

To come back to the artifact later, open the link in the invitation email again or bookmark the artifact.

### Report an invitation you didn't expect

Click "Report this invitation" in the email, or "Didn't expect this? Report this invitation" on the invitation page. Reporting declines the invitation, and the person who sent it isn't notified. After you report an invitation, that person can't invite you by email again.

## Publish or share a legacy artifact

Legacy artifacts show "Publish" (Free, Pro, and Max plans) or "Share & copy link" (Team and Enterprise plans) instead of "Share." Use the steps in this section for those artifacts.

### Publish a legacy artifact on Free, Pro, and Max plans

1. Open the artifact you want to publish.
2. Click "Publish."
3. Copy the public link and send it.

Publishing adds the artifact to Artifacts in your sidebar, so you can find it again outside the original chat.

Who can open a published chat artifact:

- Anyone with the link can view and use it without a Claude account. They're asked to sign up only for features that use Claude.
- People signed in on Free, Pro, or Max plans can also copy and save it. Features that use Claude count toward their own usage limits.

### Embed a published chat artifact

After you publish, click "Get embed code" to get code you can paste into another website. In the Allowed domains field, enter the websites that can embed your artifact, separated by commas.

### Unpublish a chat artifact

Click "Unpublish" to revoke access to a published artifact.

Important: You can't publish an artifact again after you unpublish it. To share it later, you'll need to create a new artifact. Unpublishing also permanently deletes any personal and shared storage data the artifact used.

### Share a chat artifact on Team and Enterprise plans

1. Open the artifact you want to share.
2. Click "Share."
3. Click "Share & copy link."

Who can open it:

- Users in your organization, signed in with their Team or Enterprise account.
- Anyone with the link, if an owner has turned on External sharing and you chose "Anyone with the link." They need a Claude account.
- If the artifact was made in a project, viewers also need access to that project.

Important: When you share an artifact made in a chat, viewers also get access to the attachments and files in that chat. Check for sensitive documents before you share.

To unshare a chat artifact:

1. Click "Share" in the upper right corner of the artifact.
2. In the Artifact shared modal, click "Unshare."
