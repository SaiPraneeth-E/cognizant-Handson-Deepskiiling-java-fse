# HandsOn-4 — Merge Conflict Resolution

The hardest one — both master and a branch modified the same file, causing a conflict that had to be resolved manually.

## What I did

- Verified master was clean
- Created a branch called GitWork
- Added hello.xml with branch-specific content, committed it
- Switched back to master
- Created hello.xml on master too, but with completely different content
- Committed to master
- Tried to merge GitWork into master — Git threw a CONFLICT error
- Saw the conflict markers in hello.xml (<<<<<<< HEAD, =======, >>>>>>>)
- Edited the file manually to combine both versions
- Staged the resolved file and committed to finish the merge
- Added *.orig to .gitignore (leftover from merge tool)
- Deleted GitWork branch
- Pushed everything to remote

## Conflict markers looked like this

```xml
<<<<<<< HEAD
    <message>Hello from Master Branch</message>
=======
    <message>Hello from GitWork Branch</message>
>>>>>>> GitWork
```

## Resolved version

```xml
    <message>Hello from Both - Conflict Resolved</message>
```

## Commands used

```bash
git status
git branch GitWork
git checkout GitWork
# created hello.xml with branch content
git add hello.xml
git commit -m "Add hello.xml on GitWork"
git checkout master
# created hello.xml with master content
git add hello.xml
git commit -m "Add hello.xml on master"
git log --oneline --graph --decorate --all
git diff master..GitWork
git merge GitWork
# CONFLICT — edit hello.xml
git add hello.xml
git commit -m "Resolve merge conflict in hello.xml"
echo "*.orig" >> .gitignore
git add .gitignore
git commit -m "Update gitignore with orig files"
git branch -d GitWork
git log --oneline --graph --decorate
git push origin master
```

## Screenshots

| File | What it shows |
|------|--------------|
| Start.png | Clean master state |
| BranchXml.png | hello.xml on GitWork branch |
| ConflictStatus.png | Status showing conflict |
| MasterXml.png | hello.xml on master |
| Diverged.png | Diverged branch log |
| GitDiff.png | Diff between branches |
| Conflict.png | Merge conflict markers |
| Fix.png | Resolved hello.xml |
| Resolve.png | Staging resolved file |
| ResolveLog.png | Final branch graph |
| Done.png | Deleted branch + push |
