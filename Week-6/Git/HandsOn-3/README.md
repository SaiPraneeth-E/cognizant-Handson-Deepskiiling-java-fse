# HandsOn-3 — Branching and Merging

Practiced creating feature branches, making commits on them, and merging back into master.

## What I did

- Verified master was clean
- Created a new branch called `GitNewBranch`
- Listed all branches — the * shows the active one
- Switched to GitNewBranch using git checkout
- Added feature.txt and branch-notes.txt, staged and committed
- Switched back to master
- Viewed the diff between master and the branch
- Merged GitNewBranch into master using --no-ff to keep a merge commit
- Looked at the branch graph with --graph --oneline --decorate
- Deleted GitNewBranch since it was merged
- Pushed the final master to remote

## Commands used

```bash
git status
git branch GitNewBranch
git branch
git branch -a
git checkout GitNewBranch
echo "Feature content" > feature.txt
echo "Notes from branch" > branch-notes.txt
git add feature.txt branch-notes.txt
git commit -m "Add feature files on GitNewBranch"
git status
git checkout master
git diff master..GitNewBranch
git diff --stat master..GitNewBranch
git merge GitNewBranch --no-ff -m "Merge GitNewBranch into master"
git log --oneline --graph --decorate
git branch -d GitNewBranch
git branch
git push origin master
```

## Screenshots

| File | What it shows |
|------|--------------|
| StartState.png | Clean master state |
| Branch.png | Creating branch + branch list |
| BranchFile.png | Adding files on the branch |
| BranchStatus.png | Status on branch |
| BranchAdd.png | Staging on branch |
| BranchCommit.png | Commit on branch |
| Diff.png | git diff between branches |
| Merge.png | Merge output |
| MergeLog.png | Branch graph after merge |
| DeleteBranch.png | Branch deleted |
