# HandsOn-5 — Cleanup and Push to Remote

Final exercise — syncing everything up with the remote GitLab repository and verifying the project is clean.

## What I did

- Verified master had nothing uncommitted (clean state)
- Listed all branches — only master remained, no feature branches
- Pulled from origin/master to ensure local is in sync
- Pushed the 3 commits that were pending from HandsOn-4
- Verified the remote tracking branch matches local head
- Used git ls-files to see every tracked file in the repository
- Ran git status --ignored to confirm ignored files are still ignored
- Checked the full log with --all flag to see complete history

## Final repository contents

- .gitignore
- welcome.txt
- feature.txt
- branch-notes.txt
- hello.xml (conflict resolved)

## Commands used

```bash
git status
git branch
git branch -a
git pull origin master
git log --oneline --graph --decorate --all
git diff origin/master..HEAD
git push origin master
git log --oneline --graph --decorate --all
git fetch origin
git status
git ls-files
git status --ignored
```

## Screenshots

| File | What it shows |
|------|--------------|
| CleanState.png | Clean master status |
| Branches.png | Branch list (only master) |
| PullRemote.png | git pull from remote |
| FullLog.png | Full log before push |
| Graph.png | Branch graph |
| PushFinal.png | Final push output |
| Synced.png | Synced status |
| AllFiles.png | git ls-files output |
| Final.png | Verified complete log |
