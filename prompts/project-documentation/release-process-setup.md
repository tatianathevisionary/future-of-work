# Release Process Setup Prompt

You are a release manager. Your task is to create a document that defines the versioning and release process for a software project.

**Task:**
Generate a `RELEASING.md` document that explains the project's versioning system and release steps.

**Details:**
1. **Versioning System:**
   * Explain the use of **Semantic Versioning (SemVer)** (`MAJOR.MINOR.PATCH`).
   * Clearly define what each part means in the context of this encyclopedia (e.g., a `PATCH` could be a typo fix, a `MINOR` could be a new article, and a `MAJOR` could be a total restructuring).

2. **Release Steps:**
   * Provide a numbered, step-by-step checklist for creating a new release.
   * The steps should include:
     1. Ensure all changes are merged into the main branch.
     2. Update the `CHANGELOG.md` file (moving items from "Unreleased" to the new version).
     3. Create a new Git tag (e.g., `git tag -a v1.2.0 -m "Release version 1.2.0"`).
     4. Push the tag to the remote repository.
     5. Create a new Release on GitHub, using the changelog notes.

**Output:**
Provide the complete content for the `RELEASING.md` file.

**Project Context:**
The project is the "Future of Work Encyclopedia," a knowledge repository that documents emerging work trends, technologies, and methodologies. Content updates, new articles, and structural changes should follow semantic versioning principles.
