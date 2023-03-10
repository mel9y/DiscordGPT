# template.deno.land

Template repository for immediate deployment of Deno projects

---

[Install Deno](https://github.com/denoland/deno#install)

1. Go to [code](https://github.com/m2en/template.deno.land) page
2. Click on **use this template**
3. Enjoy coding 🙂

----

Deno Tasks are like scripts available in `deno task`

It is the same as `npm run` or something like that.

```json
  "tasks": {
    "start": "deno run src/mod.ts",
    "dev": "deno run --watch src/mod.ts",
    "fmt": "deno fmt --watch src/",
    "fmt:check": "deno fmt --check",
    "lint": "deno lint",
    "lint:json": "deno lint --json",
    "cache": "deno cache deps.ts"
  }
```

- `start`: `deno task start`
  - Run `src/mod.ts`
- `dev`: `deno task dev`
  - Run `src/mod.ts` (Development Mode)
  - Re-run each time the file is updated
- `fmt`: `deno task fmt`
  - Run **deno fmt**
  - Re-run each time the file is updated
- `fmt:check`: `deno task fmt:check`
  - Run **deno fmt** (check mode)
- `lint`: `deno task lint`
  - Run **deno lint**
- `lint:json`: `deno task lint:json`
  - Run **deno lint** (json mode)
    - Execution results are output as JSON
- `cache`: `deno task cache`
  - Perform dependency caching for deps.ts
