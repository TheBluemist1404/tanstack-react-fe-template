# Recommended GitHub Ruleset

Use this setup after creating a repository from this template.

The goal is to keep the default branch stable while allowing contributors to push normally to feature branches.

## Create the ruleset

Open:

`Settings → Rules → Rulesets → New ruleset → New branch ruleset`

Set:

- **Ruleset name:** `Protect main`
- **Enforcement status:** `Active`

## Target branches

Under **Target branches**, choose:

`Add target → Include default branch`

Do **not** choose `Include all branches`.

This protects only the repository's default branch, normally `main`, while branches such as `feat/*`, `fix/*`, and `chore/*` remain directly writable by contributors.

## Recommended rules

Enable the following:

### Require a pull request before merging

- Require **1 approving review**
- Enable **Dismiss stale pull request approvals when new commits are pushed**

This keeps `main` review-gated without requiring a large review process for a small team.

### Require status checks to pass

Require the status check:

`quality`

This is the job produced by `.github/workflows/ci.yml`.

The CI job verifies:

- frozen pnpm dependency installation;
- Biome;
- TypeScript;
- Vitest;
- the production Vite build.

If `quality` does not appear when configuring the ruleset, let the CI workflow run successfully once, then return to the ruleset settings.

### Require conversation resolution before merging

Enable this so unresolved review discussions cannot be silently merged.

### Block destructive updates

Keep these protections enabled:

- block force pushes;
- prevent deletion of the default branch.

## Recommended settings to leave off initially

### Require branches to be up to date before merging

Leave this **off initially**.

CI must still pass, but contributors do not need to rebase and rerun CI every time another pull request reaches `main`. Turn it on later if integration conflicts become common.

### Restrict updates

Do not restrict all updates to `main` beyond the pull-request rules above. The PR gate already provides the intended protection.

### Require signed commits

Optional. Do not require this unless every contributor has signing configured.

## Bypass

Keep an administrator/maintainer bypass available for repository recovery.

The bypass should be used only for exceptional cases such as repairing a broken CI/ruleset configuration, not as a normal way to skip review or failing checks.

## Expected workflow

```text
issue
  ↓
feat/... or fix/... branch
  ↓
local Husky + Biome + TypeScript checks
  ↓
pull request
  ↓
review + quality CI
  ↓
main
```

Feature branches should remain lightweight working branches. The ruleset belongs on the default branch, where integration quality needs to be enforced.
