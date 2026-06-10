{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 CourierNewPSMT;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # AGENTS.md \'97 Antigravity 2.0 Autonomous Workspace Framework\
\
This is the canonical operating model for Antigravity 2.0 subagents. The workspace is optimized for a non-technical builder focused on design, product architecture, and vibe coding. Agents must shoulder the technical execution, complex git workflows, and error-resolution loops entirely autonomously to allow the builder to focus on product velocity.\
\
## I. Core Directives & Autonomy\
\
* **Full Autonomous Execution:** Subagents are authorized to execute multi-step tasks, refactor code, and manage file operations without intermediate approval gates. \
* **Self-Healing Loops:** Background compilation, type-checking, and test runs must occur continuously. If a build or test fails, subagents must enter an autonomous self-correction loop to diagnose and fix the error before surfacing the final result.\
* **Behavior-Preserving Refactors:** Land refactoring changes entirely independently from feature changes. Ensure the application behaves identically (verified via autonomous smoke-tests) before layering on new functionality.\
* **Zero Sensitive Data:** Never hardcode or auto-fill real API keys, passwords, financial data, or PII. Stub these out and pause the loop to allow the builder to input them manually.\
\
## II. Skill Mesh Protocol\
\
Before executing any plan, the Lead Orchestrator must intercept the request and apply the Skill Mesh Protocol:\
1. Scan the `/skills` directory.\
2. Read the `SKILL.md` and any `/references` of matching skill folders.\
3. Seamlessly inject these specialized parameters, context, and structural constraints into the current task's execution plan.\
4. Execute the enriched plan across the necessary subagents without requiring manual confirmation.\
\
## III. Architectural & Structural Invariants\
\
* **Feature-Scoped Co-location:** Flatten directories. Group files by feature (`lib`, `components`, `app/page`), not by technical kind. Keep the test file exactly one cursor-jump away from its source code.\
* **File Size Thresholds:** Top-level views and route handlers trigger autonomous extraction routines at ~700 lines. Library files and helpers should be extracted at ~400 lines.\
* **Stable Landmarks:** Every extracted component or module must begin with a boxed, top-of-file comment summarizing its purpose, owned interactions, and non-obvious behavior. Use inline section dividers (e.g., `// \uc0\u9472 \u9472 \u9472 \u9472  Mutations \u9472 \u9472 \u9472 \u9472 `) to provide stable regex targets for targeted subagent edits.\
* **Value-Driven Verification:** Prioritize unit tests for pure functions, component tests for state machines, and E2E tests for critical paths. Skip snapshot tests, arbitrary 100% coverage targets, and pure mock-verifications.\
\
## IV. Data Migration & Cross-System Safety\
\
* **Immutable Snapshots:** Before executing destructive schema migrations, agents must autonomously create an in-database snapshot table (e.g., `CREATE TABLE foo_snapshot AS SELECT * FROM foo`).\
* **Strict CTE Dry-Runs:** Dry-run SQL queries must utilize the exact same CTE chain as the final merge query. Swap only the terminal clause (e.g., `SELECT count(*)` instead of `INSERT`).\
* **Pooled Connection Safety:** Avoid `TEMP` tables in pooled SQL environments. Utilize persistent tables in a temporary schema and autonomously drop them post-migration.\
* **Conflict Path Resolution:** Any feature introducing a `UNIQUE` constraint must be accompanied by explicit, coded runtime conflict-handling (e.g., `ON CONFLICT DO UPDATE` or logical merges).\
\
## V. Stack Paradigms & Known Gotchas\
\
* **Mobile Viewport Overlay Safety:** For fixed-position modals or bottom sheets, `vh` and `dvh` units are strictly prohibited due to mobile browser URL-bar recalculation bugs. Agents must reserve a top buffer on a fixed backdrop (e.g., `inset: 0`) and constrain the sheet using `max-height: 100%` of that parent container.\
* **Desktop / Menubar Constraints:** When scaffolding macOS menubar apps, target SwiftUI + `MenuBarExtra` for macOS 13+ as the primary path. If utilizing Electron fallbacks, ensure `node-schedule` handlers survive sleep states via explicit `powerMonitor.on('resume')` triggers.\
* **Dependency Currency:** Subagents must autonomously verify package maintenance dates (npm, cargo, pip) in the background before locking them into the project configuration. CLI scaffold flags must be strictly sanitized to prevent flag-eating bugs during project generation.\
\
# AGENTS.md \'97 Antigravity 2.0 Autonomous Workspace Framework\
\
This is the canonical operating model for Antigravity 2.0 subagents. The workspace operates strictly on a **Hands-Off Autopilot** protocol. It is engineered to maximize product velocity for a non-technical builder focused on design, architecture, and vibe coding by fully abstracting technical execution, complex Git workflows, and error loops.\
\
## I. Extreme Autonomy & Self-Healing Loops\
\
* **Zero Intermediate Gates:** Subagents are fully authorized to execute multi-step tasks, implement behavior-preserving refactors, and manage file operations end-to-end. Do not halt for line-by-line file edits, step-by-step manual approvals, or syntax explanations.\
* **Autonomous Verification:** Compilers, type-checkers, linters, and test runner suites must run continuously in the background. \
* **Self-Correction Protocol:** If a build breaks or a command returns a non-zero exit code, subagents must automatically parse the terminal logs, refactor the code, and retry the build entirely in the background. Do not surface the error to the builder unless the self-healing loop exhausts reasonable retry limits.\
\
## II. Streamlined Approval Boundary\
\
Subagents must operate silently in the background and may only halt execution and prompt the builder under two explicit conditions:\
1. **Major Milestone Completion:** A primary feature, sub-module, or workflow is entirely complete, fully tested, and ready for high-level human validation.\
2. **Ambiguous Product Blocker:** A missing core product requirement prevents execution, and making an assumption would fundamentally alter the product's design or user experience. \
\
When halting for completion, present the final output as a cohesive deliverable rather than granular code diffs. (Note: The only other exception is pausing to allow the manual input of real API keys or PII, which must never be auto-filled or hardcoded).\
\
## III. Context Optimization & Execution Efficiency\
\
* **Compact Architecture:** Utilize concise, modular architectural patterns to preserve the token context window during deep, parallel building sessions. \
* **Flat Command Sequences:** Execute chained, non-hanging terminal sequences (e.g., `npm run lint && npm run build && npm run test:run`). Strictly avoid interactive CLI prompts that can hang the background process.\
* **Silent Execution:** Minimize internal monologue and chat output during task execution. Focus token usage strictly on code generation and tool execution.\
\
## IV. Skill Mesh Protocol\
\
Before executing any complex plan, the Lead Orchestrator must silently apply the Skill Mesh Protocol:\
1. Scan the `/skills` directory autonomously.\
2. Ingest `SKILL.md` and any `/references` of relevant skill folders.\
3. Seamlessly inject these specialized parameters and structural constraints into the task's execution plan.\
4. Execute the enriched plan immediately without requiring manual confirmation.\
\
## V. Architectural & Safety Invariants\
\
* **Feature-Scoped Co-location:** Flatten directories. Group logic, components, and views by feature. Keep test files exactly one cursor-jump away from their source code.\
* **Targeted File Boundaries:** Top-level views trigger autonomous extraction at ~700 lines; library files at ~400 lines. All extracted modules must feature boxed, top-of-file summary comments and inline section dividers (e.g., `// \uc0\u9472 \u9472 \u9472 \u9472  Mutations \u9472 \u9472 \u9472 \u9472 `) to act as stable regex targets for rapid subagent edits.\
* **Migration Safety:** Destructive schema migrations require an autonomous in-database snapshot (`CREATE TABLE foo_snapshot AS SELECT * FROM foo`). Dry-run SQL queries must strictly reuse the merge query's CTE chain. Any new `UNIQUE` constraint must include explicit, coded runtime conflict-handling (e.g., `ON CONFLICT DO UPDATE`).\
* **UI/Desktop Constraints:** For mobile viewports, `vh` and `dvh` units are strictly prohibited for fixed-position overlays; agents must use a fixed backdrop with `max-height: 100%`. For macOS menubar apps, prioritize SwiftUI + `MenuBarExtra` (macOS 13+); if utilizing Electron fallbacks, silently ensure `powerMonitor.on('resume')` triggers are implemented.\
* **Dependency Verification:** Subagents must autonomously verify package maintenance dates in the background before locking them into the project, ensuring CLI scaffold flags are strictly sanitized to prevent flag-eating bugs.}