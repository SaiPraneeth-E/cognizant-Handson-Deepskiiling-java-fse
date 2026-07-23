# HandsOn-2 — Git Ignore

This one was about learning to exclude files from being tracked using .gitignore.

## What I did

- Started from the GitDemo repo from HandsOn-1
- Created some log files (app.log, error.log), a logs/ folder, and .bak backup files
- Checked git status — all of them showed up as untracked
- Created a .gitignore file with patterns to exclude them
- Ran git status again — only .gitignore showed up now
- Used git check-ignore -v to confirm each file was being ignored
- Committed and pushed .gitignore to the remote

## .gitignore content

```
# Log files
*.log

# Log directory
logs/

# Backup files
*.bak
```

## Commands used

```bash
echo "App log" > app.log
echo "Error log" > error.log
mkdir logs
echo "Server log" > logs/access.log
echo "Backup" > data.bak
git status
touch .gitignore
# added patterns to .gitignore
cat .gitignore
git status
git check-ignore -v app.log
git check-ignore -v logs/access.log
git check-ignore -v data.bak
git add .gitignore
git commit -m "Add .gitignore to ignore logs and backups"
git push origin master
```

## Screenshots

| File | What it shows |
|------|--------------|
| RepoState.png | Clean repo state |
| LogFiles.png | Creating log/bak files |
| StatusBefore.png | Status without .gitignore |
| Ignore.png | .gitignore content |
| IgnoreCommit.png | Committing .gitignore |
| LogAfter.png | Status after .gitignore |
| CheckIgnored.png | git check-ignore output |
| PushIgnore.png | Push to remote |
| FinalStatus.png | Final clean status |
