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

## 6. Show Diversity in Project Selection

**IMPORTANT:** Avoid repeatedly selecting the same projects. Aim for variety across resumes.

### CareerForge Unified Platform
The following projects were **unified into CareerForge** (AWS-based career acceleration platform):
- **SkillSync** (AI resume screening)
- **Job Scraper** (LinkedIn automation)
- **LaTeX Agent** (resume generation)
- **LearnWeave** (learning companion)

**Selection Rule:**
- If you select CareerForge, mention it as the unified platform
- Avoid selecting 2+ CareerForge components in the same resume
- Prioritize showing diverse problem domains (CV, EdTech, Cybersecurity, Finance, etc.)

### Project Categories for Diversity
- **Computer Vision:** SafeSight AI, SmartVision, LoomGuard AI
- **EdTech:** LearnWeave, Chandas AI, Chandas Game
- **HR Tech:** SkillSync
- **Career Tools:** LaTeX Agent, Job Scraper, CareerForge
- **Cybersecurity:** Sticky-Net, Mind Link (PhishGuard)
- **Finance:** M&A RAG Agent
- **AI Ethics:** Neutralis-AI

**Best Practice:** Select 3 projects from different categories when possible.

### Incomplete Projects (DO NOT USE)
- **VerifyX AI** - Project not completed, never include in resumes

---

## Project Model Reference

- All personal vision models use **YOLO26m** (not YOLOv8 or other variants).
- Always write `YOLO26m` in project headings, bullet points, and Technical Skills — never `YOLOv8`, `YOLOv11`, or plain `YOLO`.

## Quick Checklist Before Saving Any Resume

- [ ] Layout matches `template.txt` exactly
- [ ] Exactly 3 projects selected from `projects-md/`
- [ ] Projects show diversity (avoid selecting multiple CareerForge components)
- [ ] Each project has exactly 3 one-liner bullets
- [ ] No new sections added
- [ ] GitHub URLs verified against `src/config.ts`
- [ ] Vision model references use `YOLO26m` throughout
- [ ] Summary is ≤ 3 lines
- [ ] File compiles to one page
