# Prompt to Generate Initial Changelog

Generate a `CHANGELOG.md` file for a project called "Future of Work Encyclopedia". The file must follow the "Keep a Changelog" format (keepachangelog.com).

Use the following project history to create the version entries:

1.  **Project Inception (v0.1.0):**
    * The project started on **[REPLACE WITH THE TIMESTAMP OF YOUR EARLIEST FILE, e.g., 2025-06-10]**.
    * The initial work involved setting up the repository and conducting foundational research. The original topic of interest was "Support & Product Operations Research."

2.  **MVP Launch (v1.0.0):**
    * The project officially launched as an MVP on **[REPLACE WITH TODAY'S DATE, e.g., 2025-08-30]**.
    * Before launch, the project's focus was refactored from "Support & Product Operations" to the broader topic of "Future of Work." This should be noted as a significant change.
    * The MVP includes initial encyclopedia sections on key topics like remote work, asynchronous communication, digital wellbeing, and the gig economy.

The final output should be a single, complete Markdown file starting with a main `# Changelog` heading and including an `[Unreleased]` section at the top for future updates.

---

# Cursor Rules File Snippet

{
  "rules": [
    {
      "name": "Update Changelog",
      "description": "Adds a new entry to the [Unreleased] section of CHANGELOG.md. Just type @changelog and describe your change.",
      "prompt": "The user wants to update the project's changelog. Their request is: '{{selection}}'. \n\n1. First, determine the single most appropriate change category from this list: Added, Changed, Fixed, Removed, Security. \n2. Second, rephrase the user's request into a concise, past-tense bullet point suitable for a changelog. For example, 'I added a new section on AI tools' becomes '- Added new section on AI tools.'\n3. Third, generate the code to insert this bullet point into the `CHANGELOG.md` file. The new line must be placed under the correct category heading (e.g., `### Added`) within the `## [Unreleased]` section. If the category heading doesn't exist yet under `[Unreleased]`, you must create it first.",
      "trigger": "prompt",
      "shortcut": "@changelog"
    }
  ]
}