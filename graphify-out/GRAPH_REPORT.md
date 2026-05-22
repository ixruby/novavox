# Graph Report - novavox  (2026-05-16)

## Corpus Check
- 101 files · ~57,978 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 213 nodes · 236 edges · 10 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `16583c9d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 11|Community 11]]

## God Nodes (most connected - your core abstractions)
1. `DotGrid()` - 15 edges
2. `getSiteData()` - 13 edges
3. `verifySessionToken()` - 11 edges
4. `POST()` - 10 edges
5. `cn()` - 10 edges
6. `getStoredFile()` - 9 edges
7. `SpatialHUD()` - 8 edges
8. `useSiteConfig()` - 7 edges
9. `readUsers()` - 7 edges
10. `writeStoredFile()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `verifySessionToken()`  [INFERRED]
  app/api/ai/route.ts → lib/auth.ts
- `POST()` --calls--> `verifySessionToken()`  [INFERRED]
  app/api/auth/route.ts → lib/auth.ts
- `GET()` --calls--> `verifySessionToken()`  [INFERRED]
  app/api/auth/route.ts → lib/auth.ts
- `generateMetadata()` --calls--> `getSiteData()`  [INFERRED]
  app/artists/[slug]/page.tsx → lib/get-data.ts
- `Player()` --calls--> `useSiteConfig()`  [INFERRED]
  components/Player.tsx → context/SiteConfigContext.tsx

## Communities (56 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (5): Player(), CartProvider(), useCart(), useSiteConfig(), cn()

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (19): POST(), NotFound(), GET(), POST(), WorkPage(), verifySessionToken(), getSiteData(), getStoredFile() (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (3): DotGrid(), SpatialHUD(), StatusIndicator()

### Community 3 - "Community 3"
Cohesion: 0.16
Nodes (6): easeOutQuad(), getNoteForLine(), InteractiveCanvas(), createLines(), renderLine(), updateLinePhysics()

### Community 4 - "Community 4"
Cohesion: 0.46
Nodes (11): GET(), POST(), addUser(), changePassword(), createSessionToken(), getUsers(), readUsers(), removeUser() (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.32
Nodes (3): fetchUsers(), handleAddUser(), handleRemoveUser()

### Community 8 - "Community 8"
Cohesion: 0.83
Nodes (3): clamp(), GET(), isValidUsername()

## Knowledge Gaps
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getSiteData()` connect `Community 1` to `Community 2`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `DotGrid()` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Why does `verifySessionToken()` connect `Community 1` to `Community 4`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `getSiteData()` (e.g. with `GET()` and `generateMetadata()`) actually correct?**
  _`getSiteData()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `verifySessionToken()` (e.g. with `POST()` and `POST()`) actually correct?**
  _`verifySessionToken()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 8 inferred relationships involving `POST()` (e.g. with `validateLogin()` and `createSessionToken()`) actually correct?**
  _`POST()` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._