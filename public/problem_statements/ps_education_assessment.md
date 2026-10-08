# Problem Statement 03

## Problem Title

Assessments in Higher Education That Test Memorisation Rather Than Understanding, Due to the Absence of Curriculum-Aligned, Reasoning-Focused Evaluation Tools

## Sector / Domain

**Primary:** EdTech
**Secondary:** AI & ML

## Problem Summary / Elevator Pitch

Academic assessments in Indian higher education overwhelmingly test recall and reproduction of facts, while the actual learning outcomes listed in curricula (application, analysis, synthesis) go unmeasured. Educators lack practical tools to generate assessments aligned with higher-order thinking levels of Bloom's Taxonomy from their own course materials. The result is a systemic disconnect between what curricula intend students to learn and what examinations actually evaluate.

## Background & Context

India's higher education system serves a massive student population across thousands of institutions. Most universities follow outcome-based education (OBE) frameworks that specify learning outcomes at various cognitive levels. Yet the dominant assessment formats (university exams, internal tests, assignments) still lean heavily on questions that test factual recall and direct reproduction from textbooks.

A significant proportion of examination questions in Indian university systems sit at the lowest cognitive levels of Bloom's Taxonomy (Remember and Understand), while higher-order levels (Apply, Analyse, Evaluate, Create) are poorly represented. Tamil Nadu's engineering education ecosystem, with its large number of affiliated colleges and centralised examination patterns, is directly affected by this. Faculty who want to create higher-order assessments face two barriers: the sheer time needed to design such questions manually, and the absence of tools that can systematically map content to cognitive levels.

## Problem Definition

At its core, the problem is that educators do not have practical, accessible tools to generate assessments explicitly aligned with specific Bloom's Taxonomy levels from their own teaching materials. Without such tools, assessment design defaults to recall-type questions because they are the fastest to write and easiest to grade.

This persists because:
- Manually creating higher-order assessment items takes significantly more time and effort than writing recall-type questions.
- Existing question bank tools offer randomisation but do not tag or map questions to cognitive taxonomy levels.
- Generic AI tools can produce questions, but without curriculum-specific grounding and explicit cognitive level targeting, the output tends to fall back to surface-level items.
- Faculty in teaching-intensive institutions, which make up the bulk of Indian higher education, have very limited time for assessment design innovation.

The consequences are significant: students optimise for memorisation, employability outcomes suffer because higher-order skills are never formally developed or measured, and the stated learning outcomes of OBE curricula remain aspirational rather than assessed.

## Key Challenges / Pain Points

- **Content-to-taxonomy mapping:** Automatically figuring out which sections of academic content can support questions at specific Bloom's levels requires genuine semantic understanding, not just keyword matching.
- **Source material diversity:** Academic materials arrive in multiple formats (PDFs, slides, handwritten notes, textbooks) with varying structure and quality.
- **Assessment quality assurance:** Generated questions need to be pedagogically sound. They should test the intended cognitive level, not just look complex.
- **Feedback gap:** Students rarely get reasoning-based feedback that explains why their understanding is incomplete. They get marks, not learning guidance.
- **Vernacular requirements:** In Tamil Nadu and many Indian states, course materials and assessments may need to work in regional languages alongside English.
- **Faculty adoption:** Any tool must fit into existing workflows without demanding technical AI expertise or complicated setup procedures.

## Stakeholders Affected

- Higher education faculty responsible for assessment design
- University examination departments and academic quality cells
- Students whose learning is shaped by assessment formats
- Employers who depend on education systems to develop application-oriented skills
- Accreditation bodies (NBA, NAAC) evaluating outcome-based education implementation
- State higher education departments overseeing curriculum standards

## Justification / Need for Solution

India's National Education Policy (NEP) 2020 explicitly emphasises competency-based and outcome-based assessment, pushing away from rote memorisation. Accreditation frameworks require evidence that assessments align with stated learning outcomes at multiple cognitive levels. Despite these mandates, the tools needed to implement this shift at scale simply do not exist for most educators.

The growing concern about engineering employability in India ties directly to this assessment gap. Graduates trained to pass recall-based exams often lack the analytical and problem-solving skills employers need. Addressing the assessment design bottleneck by giving educators tools that generate curriculum-aligned, higher-order questions from their own materials would produce measurable improvements in learning outcomes without requiring structural changes to the education system.

The technology for content ingestion, semantic chunking, and targeted question generation has matured through advances in retrieval-augmented generation, making this problem technically addressable right now.

## Existing Solutions & Gaps

**University question banks:** Static pools of pre-written questions. They are not tagged by Bloom's level and are not derived from the specific materials used by a particular instructor.

**LMS platforms (Moodle, Google Classroom):** Allow faculty to create and randomise quizzes but require all questions to be written manually. There is no generation from course materials or cognitive level targeting.

**Generic AI writing assistants:** Can produce questions on a topic when prompted, but without structured retrieval from the actual course materials (RAG), the output may be factually inaccurate, misaligned with the syllabus, or default to recall-level items. They also lack systematic Bloom's level targeting and reasoning-based feedback generation.

The specific gap is that no tool exists which ingests an educator's own course materials, maps content to cognitive taxonomy levels, and generates assessments explicitly targeting application, analysis, and synthesis, along with grading rubrics that provide reasoning-based feedback rather than just marking correct or incorrect.

## Type of Innovation

- Product
- Service

## SDG Alignment

- **SDG 4, Quality Education:** Directly tackles the gap between curriculum learning outcomes and actual assessment practices, raising the quality of educational evaluation.
- **SDG 8, Decent Work and Economic Growth:** Better assessment of higher-order skills improves graduate employability, contributing to productive workforce development.
- **SDG 10, Reduced Inequalities:** Making assessment tools accessible to faculty across all institution types (not just elite universities) helps close the quality gap in education.

## Target Beneficiaries

Higher education faculty in engineering, science, and technology disciplines; university examination and quality assurance departments; students in affiliated colleges and autonomous institutions; accreditation evaluators assessing OBE implementation.

## Source of Problem

This problem was identified through the development of a learning companion system that ingests academic PDFs, maps content to Bloom's Taxonomy levels, and generates assessments targeting higher-order thinking using a multi-agent architecture with specialised agents for content planning, explanation generation, assessment creation, and rubric-based grading with reasoning feedback. The development process showed that automated Bloom's-aligned assessment generation using RAG is technically feasible, while also revealing the complete absence of such tools in the existing educational technology landscape available to Indian educators.

## Geographic Relevance

State, Tamil Nadu (with National applicability)

## Expected Outcome

- Higher proportion of assessment items targeting Application, Analysis, and Synthesis levels
- Less time needed for faculty to create curriculum-aligned, higher-order assessments
- Better alignment between stated course learning outcomes and what assessments actually measure
- Students receiving reasoning-based feedback rather than just binary correct/incorrect grades
- Stronger evidence generation for OBE accreditation processes
- Improved graduate readiness for application-oriented professional roles
