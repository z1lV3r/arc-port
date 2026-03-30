# Git Flow
[//]: https://mermaid.ai/open-source/syntax/gitgraph.html

## main branch

Public version (with docs)

- Will tag every commit with the public version number.
```mermaid
---
config:
  theme: 'base'
  gitGraph:
    showCommitLabel: false
---
gitGraph
    checkout main
    commit id: "m1" tag: "0.0.0"
```

- Won't be merged to any branch.

```mermaid
---
config:
  theme: 'base'
  gitGraph:
    showCommitLabel: false
---
gitGraph
    checkout main
    commit id: "m1" tag: "0.0.0"
    branch any
    checkout main
    commit id: "m2" tag: "1.0.0"
    checkout any
    commit id: "x1" 
    commit id: "x2" 
    checkout any
    commit id: "x3"
    merge main type:REVERSE 
```

- Will merge only [beta branch](#beta-branch).

```mermaid
---
config:
  theme: 'base'
---
gitGraph
    commit id: "m1"
    branch beta
    commit id: "b1" tag: "1.0.0-beta"
    checkout main
    merge beta tag: "1.0.0"
```


## beta branch
Candidate public version

- Will tag every commit comming from [feature/\<name>](#featurename), [improvement/\<name>](#improvementname), [fix/\<name>](#fixname) branches with the beta version number.

```mermaid
---
config:
  theme: 'base'
  gitGraph:
    showCommitLabel: false
    mainBranchName: 'beta'
---
gitGraph
    commit id: "b1" tag: "1.0.0-beta"
```

- Can merge:
  - [feature/\<name>](#featurename) - Updates the version to `a+1.0.0`
  - [improvement/\<name>](#improvementname) - Updates the version to `a.b+1.0`
  - [fix/\<name>](#fixname) - Updates the version to `a.b.c+1`
  - [docs/\<name>](#docsname)

```mermaid
---
config:
  theme: 'base'
  gitGraph:
    showCommitLabel: false
    mainBranchName: 'beta'
---
gitGraph
    commit id: "b1" tag: "1.0.0-beta"
    branch feature/a
    checkout feature/a
    commit id: "f1"
    commit id: "f2"
    checkout beta
    merge feature/a tag: "2.0.0-beta"
    branch improvement/a
    checkout improvement/a
    commit id: "i1"
    commit id: "i2"
    checkout beta
    merge improvement/a tag: "2.1.0-beta"
    branch fix/a
    checkout fix/a
    commit id: "fi1"
    commit id: "fi2"
    checkout beta
    merge fix/a tag: "2.1.1-beta"
    branch docs/2.1.1
    commit id: "d1"
    checkout beta
    merge docs/2.1.1
```

## feature/\<name> branches
New feature
- Can merge [improvement/\<name>](#improvementname) or [fix/\<name>](#fixname) branches

```mermaid
---
config:
  theme: 'base'
  gitGraph:
    showCommitLabel: false
    mainBranchName: 'feature/a'
---
gitGraph
    commit id: "a1"
    branch improvement/a
    branch fix/a
    checkout improvement/a
    commit id: "i1"
    checkout feature/a
    commit id: "f2"
    checkout improvement/a
    commit id: "i2"
    checkout fix/a
    commit id: "fi1"
    commit id: "fi2"
    checkout feature/a
    merge improvement/a
    merge fix/a
```

## improvement/\<name> branches
Current code improvements
- Can merge [fix/\<name>](#fixname) branches.
```mermaid
---
config:
  theme: 'base'
  gitGraph:
    showCommitLabel: false
    mainBranchName: 'improvement/a'
---
gitGraph
    commit id: "i1"
    branch fix/a
    commit id: "fi1"
    commit id: "fi2"
    checkout improvement/a
    merge fix/a
```

## fix/\<name> branches
Fix current code
- Won't merge any branch
```mermaid
---
config:
  theme: 'base'
  gitGraph:
    showCommitLabel: false
    mainBranchName: 'fix/a'
---
gitGraph
    commit id: "i1"
    branch any
    commit id: "a1"
    commit id: "a2"
    checkout fix/a
    merge any type:REVERSE
```

## dev branch
Code that should be released in the next beta doesn't matter which branch will be merged
- Will be merged by feature/<name>, improvement/<name>, fix/<name> branches before beta merge

```mermaid
---
config:
  theme: 'base'
  gitGraph:
    showCommitLabel: false
    mainBranchName: 'dev'
---
gitGraph
    commit id: "d1"
    branch feature/a
    commit id: "f1"
    commit id: "f2"
    commit id: "f3"
    checkout dev
    branch improvement/a
    commit id: "i1"
    commit id: "i2"
    checkout dev
    branch fix/a
    commit id: "fi1"
    commit id: "fi2"
```

## docs/\<name>
Update documentation and social media
- Will have beta as base branch with the version as branch name

```mermaid
---
config:
  theme: 'base'
  gitGraph:
    showCommitLabel: false
    mainBranchName: 'beta'
---
gitGraph
    commit id: "b1" tag: "1.0.0-beta"
    branch docs/1.0.0
    commit id: "d1"
    checkout beta
    merge docs/1.0.0
```

- Won't merge any branch

```mermaid
---
config:
  theme: 'base'
  gitGraph:
    showCommitLabel: false
    mainBranchName: 'docs/a'
---
gitGraph
    commit id: "d1"
    branch any
    commit id: "a1"
    commit id: "a2"
    checkout docs/a
    merge any type:REVERSE
```