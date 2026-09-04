# Contributing

## Requirements and installation

This repository is a Node.js/npm workspace containing the Next.js frontend and Sanity Studio.

1. Install Node.js with npm.
2. Clone the repository and enter it:

```shell
git clone https://github.com/mahis1067/nextjs-clean-website-sanity-template.git
cd nextjs-clean-website-sanity-template
```

3. Install all workspace dependencies:

```shell
npm install
```

4. Verify the tools and checks:

```shell
node --version
npm --version
npm run lint
npm run type-check
```

`requirements.txt` is included as a quick prerequisite reference. It is not a Python dependency file; use `npm install` for this project.

## Start development

Run both the frontend and Studio:

```shell
npm run dev
```

Or run them separately:

```shell
npm run dev:next
npm run dev:studio
```

## Sync your local branch

Check your current branch and worktree before pulling:

```shell
git status
git branch --show-current
```

Pull the latest `main` branch:

```shell
git switch main
git pull --ff-only origin main
```

Update an existing feature branch with the latest `main`:

```shell
git switch <your-branch>
git fetch origin
git merge origin/main
```

## Create a change

Create a focused branch from the updated `main` branch:

```shell
git switch main
git pull --ff-only origin main
git switch -c <type>/<short-description>
```

Useful branch prefixes include `feature/`, `fix/`, `docs/`, and `chore/`.

## Stage and commit

Review changes, stage only the files belonging to the change, and inspect the staged diff:

```shell
git status
git add path/to/file path/to/another-file
git diff --cached
```

Commit with a short imperative message:

```shell
git commit -m "Add issue and contribution templates"
```

Push the branch and set its upstream tracking branch:

```shell
git push --set-upstream origin <your-branch>
```

## Open a pull request

### GitHub CLI

After installing and authenticating the GitHub CLI:

```shell
gh auth login
gh pr create --base main --head <your-branch> --title "Short change title" --body-file .github/PULL_REQUEST_TEMPLATE.md
```

Review the pull request and checks:

```shell
gh pr view --web
gh pr checks
```

### GitHub website

1. Open the repository on GitHub after pushing your branch.
2. Select **Compare & pull request**.
3. Set the base branch to `main`.
4. Describe the change, testing, and any follow-up work.
5. Submit the pull request for review.

## Before requesting review

Run the checks from the repository root:

```shell
npm run lint
npm run type-check
```

Do not commit `.env` files, API tokens, Sanity tokens, or other secrets.
