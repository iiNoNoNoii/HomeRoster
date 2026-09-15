# Third-party notices

HomeRoster itself is licensed under AGPL-3.0-or-later (see [LICENSE](LICENSE)).
It also uses the following third-party software.

## Bundled into the Lovelace card (`custom_components/homeroster/www/homeroster-card.js`)

**[Lit](https://lit.dev/)** (`lit`, `lit-element`, `lit-html`, `@lit/reactive-element`)
is bundled directly into the built card file — its BSD-3-Clause license notices
are preserved at the end of that file (see `frontend/build.mjs`'s
`legalComments: "eof"` setting) rather than reproduced here, since they travel
with the actual distributed artifact either way.

```
BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

Every other frontend `import` is either this project's own source or a
type-only reference to Home Assistant's own already-loaded frontend
(`ha-icon`, `ha-form`, `ha-entity-picker`, theme CSS variables, …) — none of
that is bundled or redistributed by this project; it's simply used at
runtime from the Home Assistant instance the card is running inside, the
same way any Lovelace card relies on it.

Build/test/lint-only tooling (esbuild, TypeScript, ESLint, Vitest) is never
bundled into the shipped card and isn't listed here for that reason.

## Backend runtime dependency (installed separately by Home Assistant, not bundled)

**[python-dateutil](https://github.com/dateutil/dateutil)** — declared in
`manifest.json`'s `requirements` and installed by Home Assistant's own
dependency installer at startup, like any other integration's Python
dependencies; this repository does not vendor or redistribute its source.
Dual-licensed; this project's use falls under either license at the
recipient's choice:

- Apache License 2.0 (contributions since 2017-12-01), or
- BSD 3-Clause License (earlier contributions).

Full text: [python-dateutil's LICENSE](https://github.com/dateutil/dateutil/blob/master/LICENSE).

## MDI icons

Icon names (e.g. `mdi:calendar`) reference Home Assistant's own bundled
[Material Design Icons](https://pictogrammers.com/library/mdi/) font/set;
no icon assets are bundled or redistributed by this project.
