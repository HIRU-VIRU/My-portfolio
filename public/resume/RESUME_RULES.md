# Resume Generation Rules

## 1. Never Change the Template Layout
- Always use `template.txt` as the base structure.
- Do not add, remove, or reorder sections (Summary, Education, Technical Skills, Experience, Projects, Achievements).
- Do not add new sections (e.g. no "Coursework", "Why This Role", "Research Summary", "Certifications" sections).
- Do not modify any LaTeX preamble, macros, or formatting commands.

## 2. Stick to the Same Layout as the Template
- Header: name, city, phone, email, LinkedIn, GitHub, Portfolio — exact same order and format.
- Section order must be: Summary → Education → Technical Skills → Experience → Projects → Achievements.
- Use the exact same LaTeX commands: `\resumeSubheading`, `\resumeProjectHeading`, `\resumeItemListStart`, etc.
- Do not change spacing, margins, font sizes, or titlerule formatting.

## 3. Always Select the Best 3 Projects from `projects-md/`
- Read every `.md` file in `public/projects-md/` before picking.
- Score each project against the target JD across all four axes: ML methods used, domain relevance, technical stack alignment, impact/outcome clarity.
- Pick the top 3 highest-scoring projects.
- Rewrite the bullet points to connect each project to the JD's specific requirements.
- Always use the real GitHub URL from `src/config.ts` for the project link.

## 4. Resume Must Fit on One Page
- Three projects maximum — never four or more.
- Each project: exactly 3 bullet points.
- Each bullet point: one line (one-liner) — no wrapping sentences, no multi-clause bullets.
- Summary: max 3 lines of text.
- Technical Skills: keep each category to a single line; trim tools not relevant to the JD.
- If content overflows, shorten bullet points first, then trim Technical Skills, never cut sections.

## 5. Project Bullet Points Must Be One-Liners
- Each bullet is a single concise sentence — one action, one outcome.
- Format: `[Strong verb] + [what was built/done] + [measurable result or relevance]`.
- No conjunctions chaining two separate ideas ("...and also...", "...as well as...").
- No parenthetical asides longer than 3 words.
- No phrases like "directly applicable to..." or "analogous to..." — let the work speak for itself.

---

## Quick Checklist Before Saving Any Resume

- [ ] Layout matches `template.txt` exactly
- [ ] Exactly 3 projects selected from `projects-md/`
- [ ] Each project has exactly 3 one-liner bullets
- [ ] No new sections added
- [ ] GitHub URLs verified against `src/config.ts`
- [ ] Summary is ≤ 3 lines
- [ ] File compiles to one page
