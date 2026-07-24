# HandsOn-1 — Git Setup and First Commit

This hands-on covered setting up Git on Windows 11 and making the first commit to a local repository, then pushing it to GitLab.

## What I did

- Installed Git Bash and verified using `git --version`
- Set my name and email using `git config --global`
- Set VS Code as the default Git editor
- Created a new folder called `GitDemo` and ran `git init`
- Created `welcome.txt` and staged it with `git add`
- Committed with a message using `git commit -m`
- Added the GitLab remote with `git remote add origin`
- Pushed to the remote with `git push -u origin master`

## Commands used

```bash
git --version
git config --global user.name "sanjana123-dot"
git config --global user.email "sanjanapasam410@gmail.com"
git config --global core.editor "code --wait"
git config --list
mkdir GitDemo && cd GitDemo
git init
echo "Welcome to Git Version Control" > welcome.txt
git status
git add welcome.txt
git commit -m "Initial commit: Add welcome.txt"
git log --oneline
git remote add origin https://github.com/sanjana123-dot/Deepskilling-java-fse.git
git push -u origin master
```

## Screenshots

| File | What it shows |
|------|--------------|
| Version.png | git --version output |
| Setup.png | git config commands |
| Editor.png | Setting default editor |
| Init.png | git init + ls -la |
| FileCreate.png | Creating welcome.txt |
| Status.png | git status (untracked) |
| Stage.png | git add + staged status |
| Commit.png | First commit output |
| Log.png | git log --oneline |
| Push.png | git push to GitLab |
