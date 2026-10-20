# Get started with Claude Design | Claude Help Center
URL: https://support.claude.com/en/articles/14604416-get-started-with-claude-design

Get started with Claude Design | Claude Help Center

# Get started with Claude Design

 Updated over a week ago

Claude Design lets you create designs, interactive prototypes, one-pagers, and other visual work by chatting with Claude. It's one of the templates you can start an artifact from, so you can use it in any chat, in Claude Code, and from the Artifacts tab, with on-canvas editing and your design system included. This guide walks you through creating your first design, iterating on it, and getting the most out of it. Learn more about what artifacts are and how to use them.

Claude Design is available on Free, Pro, Max, Team, and Enterprise plans, and it's on by default. On Enterprise plans, it turns on by default on October 15, 2026, and owners can turn it on before then in Organization settings > Artifacts. The standalone version at claude.ai/design closes on December 14, 2026. Learn more in Migrate from standalone Claude Design to Claude.

This guide assumes your organization’s design system has already been set up, so everything you create will automatically use your brand’s colors, typography, and component patterns. If you’re a design lead who needs to set up or modify the design system itself, see Set up your design system in Claude Design.

## Where you can use Claude Design

- In a conversation: Ask Claude for a design, like "Make a one-pager from this proposal" or "Mock up the onboarding flow we just discussed." Claude builds it beside your conversation, and you refine it there. You can also select Output > Design in the message box.
- In the Artifacts tab: Go to the Artifacts tab and pick a Design template.
- In Claude Code: Ask Claude to turn your idea into a design, or use /design to create, edit, and sync designs, on desktop or in the terminal.
- In the Claude app for iOS and Android: Ask for a design in any conversation and check back later for the result, then view it full screen in the Artifacts tab. You can also edit a design. To change sharing settings, use Claude on web or desktop.
- At claude.ai/design: The standalone version keeps working until it closes on December 14, 2026, and your existing projects stay there until then. Migrate your design systems to Claude before it closes. Learn more in Migrate from standalone Claude Design to Claude.

## How Claude Design works

Claude Design pairs a conversation with a canvas. You describe what you want, and Claude generates a working design on the canvas beside the conversation. From there, you iterate—refining through conversation, inline comments, and directly on the canvas until it’s right.

The typical flow is:

1. Start a design from a conversation or the "Artifacts" tab.
2. Attach or import the design system you want Claude to build with.
3. Add any relevant context (screenshots, a codebase).
4. Describe what you want to build.
5. Review what Claude generates on the canvas.
6. Refine through chat, edit directly on the canvas, or leave inline comments.
7. Export or share when you’re happy with the result.

### Move between Claude Design and Claude Code

You can move between working in Claude Design and Claude Code while keeping your work synced. Use /design-sync to pull in your design system, so everything you build in Claude Design starts from your existing components. When a design is ready to become software, you can hand it off to Claude Code, which continues from your existing work instead of starting over from a screenshot.

From Claude Code, use /design to import a design into your codebase, export your code as a live prototype, or let Claude build the whole thing from start to finish.

## Create a new project

When you create a project, it automatically inherits your organization’s design system. You don’t need to upload brand assets or configure anything—your brand colors, fonts, and components are already in place.

### Attach or import your design system

Bring in one or several design systems from a GitHub repo, design files, raw uploads, or your local codebase using the /design-sync command in Claude Code. Claude builds with your real design system components, checks its own output against your design system, and makes corrections before you see them.

On Enterprise plans, admins can reserve publishing, setting the default, and deleting design systems for specific users. Learn more in the Artifacts admin guide for Team and Enterprise plans.

### Bring over a design system from claude.ai/design

Design systems you made in the standalone version at claude.ai/design can move over, so Claude can use them in any chat, including in Claude Code. Migrate them before the standalone version closes on December 14, 2026. Learn more in Migrate from standalone Claude Design to Claude.

### Add context to your project

The more context you give Claude, the better your output will be. You can attach reference material at any point during a project.

- Screenshots, images, or existing assets: Upload screenshots of existing designs, competitor products, wireframes, or visual inspiration. You can also attach an existing slide deck or document with a design style you want to replicate. Useful for “make it look like this” requests.
- Codebases and existing design files: Link a code repository so Claude understands your existing components, architecture, and styling patterns. This makes prototypes more production-ready from the start. Import also supports multiple ways to upload existing product design work.

### Write effective prompts

You don’t need to be a designer to get great results. Be specific about what you’re building, who it’s for, and what matters most.

A good prompt includes the goal (what you’re building), the layout (how things should be arranged), the content (what information to display), and the audience (who will use it). Claude will also ask clarifying questions if it needs more information.

Here are some examples of prompts that work well:

- “Create a dashboard showing monthly revenue with filters for region and product line.”
- “Design a mobile app onboarding flow with 4 screens that walks users through our core features.”
- “Build a landing page for our new API product with a hero section, code examples, and pricing.”
- “Create a form for collecting customer feedback with conditional questions based on category.”
- “Design an internal tool for our ops team to review and approve content submissions.”

## Refine your design

The first generation is a starting point. The real value comes from iterating.

### Using chat

Chat is best for broad changes that affect the overall design:

- “Make the color scheme darker and more minimal.”
- “Rearrange the dashboard so metrics are in the top row and the chart is below.”
- “Add a settings panel on the right side.”
- “Show me 2–3 alternative layouts for this page.”

You can also ask Claude to explain its design decisions, suggest improvements, or review the design for accessibility.

### Using inline comments

Inline comments let you click directly on a specific part of the canvas and request a targeted change. This is faster than describing the location in chat.

Examples of good inline comments:

- “Make this button padding larger.”
- “Change this to a dropdown instead of radio buttons.”
- “Use the primary brand color here.”
- “Make this section collapsible.”

Note: If your comments aren’t being picked up, paste the feedback directly into the chat instead. This is a known workaround for an intermittent issue where comments can disappear before Claude reads them.

### Edit directly on the canvas

Use rich layout controls for quick visual and aesthetic shifts, specifically to drag, resize, and align elements directly.

### When to use chat vs. comments vs. edit directly

Use comments for targeted, component-level changes (“fix this button,” “adjust this spacing”). Use chat for structural changes, new sections, or anything that requires explanation or context. Edit directly for quick visual and aesthetic changes.

## Use Claude Design with a keyboard

To get into and out of the artifact panel, and to comment from the panel's header, see Use artifacts with a keyboard or screen reader. That article also explains what focus means, what to do on a Mac laptop or in Safari, and how the tables show keys.

A design is a canvas of artboards. Each artboard holds layers, such as text, shapes, and images, and a layer can hold other layers inside it.

### Move between the editor's areas

Press F6 to move to the next area and Shift+F6 to move to the previous one. Cmd+F6 (Ctrl+F6 on Windows) works in place of F6, with or without Shift. The areas are the top bar, the canvas, and the properties panel. When something is selected and the properties panel is closed, F6 also stops at the toolbar that floats over the selection.

Note: Finish editing text before you press F6. Press Escape or Tab to end the edit first. F6 moves you out of a text edit without ending it.

### Work inside an artboard

Press Tab until you reach an artboard's title. Its name includes its position, such as artboard 1 of 7. From the title, Space selects the artboard, and Return goes inside it, to its layers. Once inside:

- Tab and Shift+Tab move between layers. Home and End move to the first and last layer.
- Return on a layer that holds other layers moves inside it. On a text layer, Return starts editing.
- Shift+Return goes up one level.
- Escape leaves the artboard, and the artboard stays selected. Escape again clears the selection.

When you're editing a text layer, press Escape or Tab when you're done. As you move, the editor tells screen readers what's selected and its position, such as 1 of 5.

### Move, duplicate, and delete

To move an artboard, select it (Space on its title) and press the arrow keys. It moves one pixel at a time, or 10 with Shift. Inside an artboard, the arrow keys do something else: with or without Shift, they move you to the next or previous layer and never move the layer itself. To move the layer you're on, hold Option (Alt on Windows) and press an arrow key. A freely placed layer moves one pixel, or 10 with Shift. A layer that's part of a row, column, or grid swaps places with its neighbor instead: Up or Left moves it earlier, and Down or Right moves it later. The editor sends a short confirmation of the move to screen readers. 

With an artboard or layer selected, press Cmd+D (Ctrl+D on Windows) to duplicate it, and Delete or Backspace to delete it. Press Cmd+Z (Ctrl+Z on Windows) to undo. The editor sends a short confirmation of each of these to screen readers.

### Use the toolbar over a selection

The toolbar that floats over a selection is there only while the properties panel is closed, and F6 reaches it. In it, the arrow keys move between its controls, Home and End move to the first and last, and Escape goes back to the canvas with your selection kept. You can also reach each control with Tab.

### Use the properties panel and the list of layers

Cmd+\ (Ctrl+\ on Windows) opens the properties panel and moves focus into it. Pressing it again closes the panel, and focus returns to the "Properties" button in the top bar. Color, font, and other pop-ups in the panel take focus when they open, and Escape closes them. When you choose a text color, the color picker tells you whether its contrast against the background is good or poor.

In the properties panel's list of layers: the Up arrow and Down arrow keys move between rows, the Right arrow key expands a row and then moves inside it, the Left arrow key collapses it and then moves out, Return or Space selects that layer on the canvas, and Return again on a text layer edits it.

Warning: In the list of layers, Delete, Backspace, and Cmd+X (Ctrl+X on Windows) act on whatever is selected on the canvas, which might not be the row you moved to. Press Return on the row first.

### Claude Design keyboard shortcuts

Action

Mac

Windows

Next area

F6 or Cmd+F6

F6 or Ctrl+F6

Previous area

Shift+F6 or Cmd+Shift+F6

Shift+F6 or Ctrl+Shift+F6

Move to an artboard's title

Tab

Tab

Select the artboard (on its title)

Space

Space

Go into the artboard, move inside a layer, or edit text

Return

Enter

Next layer, previous layer (inside an artboard)

Tab, Shift+Tab, or the arrow keys

Tab, Shift+Tab, or the arrow keys

First layer, last layer

Home, End

Home, End

Up one level (inside an artboard)

Shift+Return

Shift+Enter

Leave the artboard

Escape

Move the selected artboard (on its title)

Arrow keys (Shift for 10 pixels)

Arrow keys (Shift for 10 pixels)

Move or reorder the layer you're on (inside an artboard)

Option+arrow keys

Alt+arrow keys

Duplicate

Cmd+D

Delete or Backspace

Delete or Backspace

Cmd+C, Cmd+V

Ctrl+C, Ctrl+V

Cut (a layer)

Group, ungroup (layers)

Cmd+G, Cmd+Shift+G

Ctrl+G, Ctrl+Shift+G

Flip horizontally, flip vertically

Shift+H, Shift+V

Shift+H, Shift+V

Cmd+Z, Cmd+Shift+Z

Ctrl+Z, Ctrl+Shift+Z

Open or close the properties panel

Cmd+\

Ctrl+\

Zoom in, zoom out, fit to the window

Cmd+Plus, Cmd+Minus, Cmd+0

Ctrl+Plus, Ctrl+Minus, Ctrl+0

Shift+G

## Manage versions and revisions

If you want to explore a different direction without losing your current work, tell Claude: “Save what we have and try a completely different approach.” Claude will save your current project and confirm where it’s saved, so you can reference earlier iterations in the conversation easily.

## Export and share

Once your design is ready, you can share it with colleagues or export it for use elsewhere. The right format depends on your use case—whether you’re getting stakeholder feedback, handing off to engineering, or presenting to a group.

Use the “Export” button in the upper right corner when viewing your project to choose from the following export formats.

- Download as .zip
- Export as PDF
- Export as PPTX
- Export to Google Slides
- Export as standalone HTML
- Send to the tools you already use: Adobe Experience Manager, Adobe for Creativity, Adobe Journey Optimizer, Base44, Canva, Gamma, HubSpot, Hyperframes, Lovable, Miro, Netlify, Replit, v0, Vercel, and Wix
- Handoff to Claude Code

- Send to local coding agent
- Send to Claude Code Web 

Designs start private to you. To share one, click "Share" and choose who can open it and what they can do. People you share a design with can view, comment on, or edit it. Learn more about sharing artifacts.

## Usage and pricing

Claude Design counts toward the same usage limits as the rest of Claude. Design activity draws from the same pool as the rest of your work with Claude, including Claude Code, so there's no separate Claude Design allowance to track. Complex projects with large codebases or many iterations consume more usage.

If you reach your usage limits, Claude Design is unavailable until your limits reset. If you've enabled usage credits, you can keep working after reaching your included limits. Learn more about how usage and length limits work.

Note: Claude Design previously had its own weekly allowance, separate from your other usage limits. All Claude Design activity now counts toward your plan's shared limits.

## Tips for best results

- Import a complete design system. Import a complete design system that includes your styles, fonts, and components.
- Start simple, then layer in complexity. Begin with the core layout and content, then add interactions, edge cases, and polish. Claude responds well to incremental requests.
- Be specific in your feedback. “This doesn’t look right” is hard to act on. “Tighten the spacing between form fields to 8px” gives Claude exactly what it needs.
- Reference your design system. If you know a component exists in your brand’s system, mention it by name: “Use the Primary Button component” or “Apply the Card layout pattern.”
- Think about responsiveness early. Mention whether your design needs to work on mobile, tablet, and desktop, or just one of those.
- Ask for variations. If you’re unsure about a direction, ask Claude to show you 2–3 options. Comparing alternatives is much faster than guessing.
- Ask Claude for feedback. Claude can review your design for accessibility, contrast ratios, information hierarchy, and general usability. Treat it as a design collaborator, not just a generator.

## Known limitations

A few things to be aware of:

- Comment persistence: Inline comments occasionally don't appear on the page, but you can still see them by opening the comments view.
- Large codebases: Consider linking very large repositories from Claude Code to avoid lag or browser issues. To sync a design system, use /design-sync from Claude Code.
- Chat errors: If you hit a "chat upstream error," try starting a new chat tab within the same project.
- Mobile: It's not possible to change sharing settings on the Claude app for iOS and Android, so you'll need to use Claude on web or desktop for this.
- Multi-person editing: Two or more people editing a design project at the same time is still basic and may not work reliably.
- Design system import: Design system import is only as good as its source. A messy codebase or an incomplete file will show up in the output.
- Version history: Claude Design doesn't have version history yet.
- Deleting from the list of layers: In the properties panel's list of layers, Delete, Backspace, and cut act on what's selected on the canvas, not the row you moved to. Press Return on the row first.
- Adding to a design with a keyboard: Placing a new text layer, artboard, shape, or note on the canvas needs a mouse or trackpad. Ask Claude to add it.

# Create and edit files with Claude | Claude Help Center
URL: https://support.claude.com/en/articles/12111783-create-and-edit-files-with-claude
Published: 2026-08-06

Create and edit files with Claude | Claude Help Center

# Create and edit files with Claude

 August 6, 2026

Claude can execute code to create and work with files directly in your conversations. Prompt Claude using natural language to generate Excel spreadsheets, PowerPoint presentations, Word documents, and PDF files that you can download and use immediately.

Code execution and file creation is available to all Claude users (Free, Pro, Max, Team, and Enterprise) on the web, Claude Desktop, and Claude Mobile.

These capabilities make it easy to produce professional documents by simply chatting with Claude. You can create financial models in Excel with working formulas, perform advanced analyses on uploaded data, produce reports with charts and visualizations, and generate presentations from your documents—all without specialized software skills.

## Availability

Free, Pro, and Max plans:

- Code execution and file creation is enabled by default
- Network access is enabled, allowing Claude to install packages from approved sources

Team plan:

- Code execution and file creation is enabled by default for Team plan organizations
- Organization owners can disable it in organization settings
- Network access is disabled by default; owners can enable it in organization settings

Enterprise plan:

- Code execution and file creation is enabled by default for new Enterprise plan organizations
- Organization owners can disable it in organization settings
- Network access is disabled by default; owners can enable it in organization settings
- Owners can configure network access controls, including domain whitelisting 

### Enabling on web and desktop

Enterprise plans: This capability is enabled by default at the organization level with Allow network egress toggled off for new Enterprise organizations. Owners can adjust this in Organization settings > Capabilities using the Code execution and file creation toggle.

Team plans: This capability is enabled by default at the organization level with Allow network egress toggled on with access to package managers only. An organization owner can manually disable this for the organization in Organization settings > Capabilities if needed.

Free, Pro, and Max plans: Enable file creation from Settings > Capabilities by toggling Code execution and file creation on.

To give Claude access to external data sources, toggle Allow network egress on:

### Enabling on Claude Mobile

To enable or disable this feature on Claude for iOS or Android, tap your initials or name in the left sidebar to open Settings. Select "Capabilities" and toggle Code execution and file creation on or off.

## Configuring network access (Team and Enterprise plans)

Team and Enterprise organization owners can control network access settings in Organization settings > Capabilities. After enabling code execution and file creation, choose from the following options to configure network access for your team:

- Allow network egress toggled off: Claude operates with pre-installed packages only, with no internet access. This provides maximum security for sensitive environments.
- Allow network egress to package managers only (default): Claude can access approved package managers (npm, PyPI, GitHub, etc.) to install necessary software packages. This balances functionality with security, but some advanced features may be limited.
- Allow network egress to package managers and specific domains: Claude can access package managers plus additional domains you specify. Add domains individually to whitelist specific resources your organization needs:

All domains: Claude has full internet access except for domains on Anthropic's legal blocklist. While this provides maximum flexibility for file creation and analysis tasks, it’s also the riskiest option. Please review the security considerations below before enabling “All domains”:

## How does disabling network access address security concerns with code execution and file creation?

Disabling network access prevents data from leaving Claude's sandboxed environment—even if something goes wrong.

### How it works

When Claude executes code or creates files, it operates within an isolated, sandboxed container. This means the work happens in a controlled environment separate from your systems. However, if network access is enabled, there's a potential risk: through prompt injection or other attacks, Claude could theoretically be tricked into sending data to external servers.

Disabling network access eliminates this risk entirely. Your team still gets Claude's full code execution and file creation capabilities - building Excel models, creating presentations, analyzing data—but with the assurance that nothing can be transmitted outside the sandbox.

### A phased approach to network access

Claude is most powerful with network access enabled, allowing it to install new packages and dependencies, pull in real-time data, and interact with web services. For organizations comfortable with that risk profile, enabling access to vetted, trusted domains unlocks the full potential of code execution and file creation. For those taking a more cautious approach, we recommend starting with network access disabled and adjusting as your team builds confidence:

1. Start with network access off. This is the most secure configuration. Claude can execute code and create files, but cannot communicate externally.
2. Enable package managers. Unlocks pip, npm, and other package managers to install dependencies - significantly expands what Claude can build.
3. Expand network access as needed. Add specific domains to an allowlist based on business requirements, maintaining visibility into what's permitted.

This approach gives you defense in depth—even if there were vulnerabilities in the sandbox or a successful prompt injection, disabled network access acts as a final barrier preventing data from leaving Anthropic's infrastructure.

Note: If MCP (Model Context Protocol) integrations are enabled, network communication remains possible through those connections regardless of the network egress setting. Organizations should evaluate MCP configurations separately.

## Using code execution and file creation

When enabled, simply describe what you need in your message. For example, you might say "Create an Excel spreadsheet to track monthly expenses" or "Convert this document into a PowerPoint presentation." Claude will generate the file, which you can then download directly from the conversation.

Start with simple tasks to familiarize yourself with Claude's capabilities, then progress to more complex workflows. Be specific in your requests—describe the structure, content, and formatting you want. You may need to review and refine Claude's outputs to meet your exact requirements.

### Supported file types

Claude can create Excel spreadsheets (.xlsx), PowerPoint presentations (.pptx), Word documents (.docx), and PDF files. You can download the files Claude creates or save them directly to Google Drive.

With this feature, Claude can also do more advanced data analysis and data science work. Claude can create Python scripts for data analysis. Claude can create data visualizations in image files like PNG. You can also upload CSV, TSV, and other files for data analysis and visualization.

The maximum file size is 30MB per file for both uploads and downloads.

### Direct file creation and editing

Claude creates Excel spreadsheets (.xlsx), PowerPoint presentations (.pptx), Word documents (.docx), and PDF files. You can download the files Claude creates or save them directly to Google Drive.

The maximum file size is 30MB per file for both uploads and downloads. For PDFs larger than 30MB, Claude can process them through its computing environment without loading them into the context window.

### Advanced data analysis

Claude can perform sophisticated data analysis and data science work, including:

- Creating Python scripts for data analysis
- Generating data visualizations as image files (PNG)
- Processing CSV, TSV, and other data files
- Building machine learning models

### Project files integration

Files in your projects are now accessible through Claude's computing environment while remaining in context. This enables seamless reference and workflow integration across your project files.

### Extended context window

The context window has been expanded to support more complex multi-step workflows, particularly for conversations that use code execution and file creation extensively.

### Language support

Claude provides full support for multiple languages in both the user interface and generated files, with proper formatting and regional standards.

### How it works

Code execution and file creation gives Claude a sandboxed computing environment. Claude’s internet access will vary based on your network egress settings.

Network access allows Claude to:

- Download and install packages from approved package managers (npm, PyPI, etc.)
- Access resources needed for file creation and analysis

## Security considerations

It is possible for a bad actor to inconspicuously add instructions via external files or websites that trick Claude into:

1. Downloading and running untrusted code in the sandbox environment for malicious purposes
2. Reading sensitive data from a connected knowledge source (for example, Remote MCP, projects) and using the sandbox environment to make an external network request to leak the data

This means Claude can be tricked into sending information from its context (for example, prompts, projects, data via MCP, Google integrations) to malicious third parties. To mitigate these risks, we recommend you monitor Claude while using the feature and stop it if you see it using or accessing data unexpectedly. You can report issues to us using the thumbs down function directly in Claude.

In line with our safe and trustworthy agents framework, we have applied the following mitigations:

- Given you full control of the feature. You can turn it on or off at any time.
- Designed Claude to give you user-friendly summaries of its actions so you can see what it is doing. You can stop Claude's actions at any time and we recommend monitoring Claude's work while using the feature.
- Given you the ability to review and audit actions taken by Claude within the sandbox environment.
- Disabled public sharing of conversations that include any file artifacts from the code execution and file creation feature for free, Pro, and Max users.
- Limited the duration of tasks that can be completed by Claude and the length of time you can use a single sandbox container to avoid loops of malicious activity.
- Implemented sandbox isolation such that no sandbox environments are ever shared between users.
- Intentionally limited the network, container, and storage resources.
- Implemented a prompt injection classifier to detect malicious prompt manipulation and stop execution if detected.

We have performed red-teaming and security testing on this feature. We have a continuous process for ongoing security testing and red-teaming. We encourage organizations to evaluate these protections against their specific security requirements when deciding whether to enable this feature.

### For Team and Enterprise owners

Team and Enterprise owners have full control over this feature, including:

- Enabling or disabling the feature organization-wide
- Controlling network access settings
- Configuring domain whitelisting to allow access only to specific approved domains

Note: Claude can only be tricked into leaking data it has access to in a conversation via an individual user's prompt, project, or activated connections.

## Approved network domains

When network access is enabled, Claude can access the following approved domains:

- Anthropic Services (Explicit): api.anthropic.com, statsig.anthropic.com
- ​ GitHub: github.com
- NPM: registry.npmjs.org, npmjs.com, npmjs.org
- ​ Python: pypi.org, files.pythonhosted.org, pythonhosted.org
- Rust: crates.io, index.crates.io, static.crates.io
- Ubuntu: archive.ubuntu.com, security.ubuntu.com
- Yarn: yarnpkg.com, registry.yarnpkg.com

## Common workflows

Note: Refer to Create and edit files with Claude to eliminate hours of busy work for use cases and demo videos, and Financial analysis workflows with Claude for guidelines specific to Claude for Financial Services customers.

### Build a financial model in Excel

Generate spreadsheets with working formulas and calculations by describing your needs. Try:

```
Create a monthly budget tracker with income, expenses categories, and automatic calculations for savings.
```

Claude will produce an Excel file with proper formulas, formatting, and even charts to visualize your data.

### Generate a professional report

Combine data analysis with document creation by providing your information and requirements. Try:

```
Create a quarterly sales report using this CSV data, including trend analysis and recommendations.
```

Claude will analyze your data and produce a formatted Word document or PDF with charts, insights, and professional formatting.

### Convert between file formats

Change any document from one format to another while preserving or enhancing the content. Try:

```
Convert this Word document to a presentation.
```

```
Explain this Excel spreadsheet in a Word report with commentary.
```

Claude can even support workflows requiring multiple file format conversions. For instance, you could upload a CSV file and prompt Claude to create a financial model, write a memo summarizing it, and generate a PowerPoint to share the results. 

### Extract and analyze PDF data

Upload a PDF containing tables or forms and ask Claude to extract the information. Try:

```
Extract all the data from this PDF into an Excel spreadsheet and create a summary chart.
```

Claude will pull the data, organize it in spreadsheet format, and add visualizations for quick insights.

### Perform complex analyses

Upload a CSV with data and ask Claude to build a machine learning model to predict a particular outcome. Have Claude output a report summarizing what it did and the results. Claude will use python to train a model on your data, and provide an explanation of what it did, including the quality of the model, and the results.

### How does file creation work?

We have given Claude a private computing environment directly in claude.ai. This allows Claude to write and run code (for example Python or Javascript). It uses common code packages to create documents, spreadsheets, and slides. Users can also have Claude use its computing environment for other things like data analysis, debugging code snippets, and fun tasks like gif-creation.

### How do Claude’s file creation capabilities impact usage limits?

Use of this capability draws from the same usage limits offered by your plan. Note that creating files will use more of your limit compared to normal chats with Claude.

### Can Claude work with more than one file at a time?

Claude can handle multiple files in a single chat, allowing you to create comprehensive multi-file reports and analyses. Files remain available for download throughout your conversation.

### Is file creation supported on Claude for iOS or Android?

File creation is supported on Claude for iOS and Android. Note that when you tap "Download" on Claude Mobile, the file will open in either the system preview or a separate app (for example, the Word app for .docx files).

### Do artifacts work with file creation? 

Yes you are still able to create artifacts (e.g., HTML or react apps, markdown documents, mermaid diagrams, SVGs) with file creation on. Claude now uses the computing environment to create artifacts so the user experience may look slightly different than users are used to. Please report any issues or feedback using the thumbs up/down functionality when chatting with Claude.
