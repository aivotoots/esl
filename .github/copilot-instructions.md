# Copilot Instructions: ESL Website

Static site for Eesti Segakooride Liit (Estonian Mixed Choirs Association). Built with entu-ssg static site generator, bilingual (Estonian/English), deployed via git submodule.

## Repository Structure

This is a **git submodule** of `mitselek/ESL` repository (owner: aivotoots/esl). Lives at `/home/michelek/Documents/github/ESL/esl-www/`.

## Architecture (Entu-SSG)

Content-data separation pattern where templates (Pug) and data (YAML) are separate:

```
source/
  _templates/         # Reusable Pug templates
    layout.pug        # Base layout (header, footer, navigation)
    header.pug
    footer.pug
    menyy.pug
  syndmused/          # Events section
    index.pug         # Template for all event pages
    2025/
      data.yaml       # Array of event objects
      index.pug       # Inherits from parent index.pug
  data.{et,en}.yaml   # Page-level data mappings
  global.{et,en}.yaml # Site-wide strings (navigation, labels)
```

**Key pattern**: `index.pug` templates are inherited by year subdirectories. Event data lives in `data.yaml` as array of objects with `path`, `pealkiri` (title), `asukoht` (location), `sisu` (content) fields.

## Commands

```bash
npm run build   # Generate static site → build/ (copies assets/)
npm run dev     # Dev server on localhost:4000
```

**Critical**: After build, assets are copied manually: `cp -r ./assets ./build` (see package.json).

## Content Management Workflows

### Adding New Event (Sündmus)

1. Open `source/syndmused/YYYY/data.yaml` (create year folder if needed)
2. Add object to array:

```yaml
- path: /syndmused/2025/event-slug
  pealkiri: Event Title
  asukoht: Location and datetime
  sisu: |
    <a href="/assets/event_imgs/2025/poster.png" data-lightbox="poster.png">
        <img src="/assets/event_imgs/2025/poster.png" style="width:480px">
    </a>

    Event description in Estonian markdown.
```

3. Upload images to `assets/event_imgs/YYYY/`
4. Reference in data file
5. Run `npm run build`

**Structured content** (concerts with program): Use `kontserdi_kava`, `registreerimisinfo`, `ajakava` instead of `sisu` (see CHANGELOG 2025-10-11).

### Bilingual Content

- Estonian content in `source/*/data.et.yaml` and `global.et.yaml`
- English content in `source/*/data.en.yaml` and `global.en.yaml`
- Templates access via `self.pealkiri`, `self.sisu`, etc. (language-agnostic)

### Navigation Updates

Edit `source/global.et.yaml` → `menyy.lingid` array:

```yaml
menyy:
  lingid:
    - tekst: Link Text
      url: /path/to/page/
```

## File Naming Conventions

- Templates: lowercase, `.pug` extension
- Data files: `data.yaml` (no locale) or `data.{et,en}.yaml` (localized)
- Assets: descriptive names, organized by year in `assets/event_imgs/YYYY/`
- Images in `assets/img/juhatus/` for board member photos (200x200px)

## Template Patterns

**Markdown rendering**: Use `self.md(field)` in Pug templates to render YAML content as markdown:

```pug
if self.sisu
    p !{ self.md(self.sisu) }
```

**Lightbox images**: Wrap `<img>` in `<a data-lightbox="filename">` for gallery popup.

**Layout blocks**: Override `block peasisu` (main content) and optionally `block header`, `block menyy`.

## Common Tasks

**Board member photo** (juhatus):

- Add 200x200px image to `assets/img/juhatus/juhatus_name.jpg`
- Update `source/juhatus/data.et.yaml` with member info and photo path

**Document upload**:

- Add to `assets/doc/YYYY/filename.pdf`
- Link in relevant YAML: `[Link text]​(../assets/doc/YYYY/filename.pdf)`

**Calendar update** (hooaeg):

- Edit `source/hooaeg/data.et.yaml` for season calendar events

## Build Output

Generated files in `build/`:

- `index.html`, `script.js`, `style.css` (compiled from Stylus)
- `assets/` (copied from source)
- Subdirectories mirror `source/` structure

**Protected from cleanup**: `assets/`, `index.html` (see `entu-ssg.yaml` → `protectedFromCleanup`)

## Recent Changes (from CHANGELOG)

- **Oct 11, 2025**: Structured event content (kava/info/ajakava fields) + YAML anchors
- **Oct 10, 2025**: Security updates (entu-ssg 5.2.0 → 5.6.15), image standardization (board photos 200x200px oval)
- **Link styling**: Content links are blue, bold, underlined with icon (navigation excluded)

## Integration with Parent Repo

Parent repo `mitselek/ESL` includes:

- **Lihula laulupäev/** - Event planning docs (KAVA-JA-NOODID.md, kirjavahetus/, noodivihik/)
- **Haapsalu 2026/** - Summer school planning

When website updates relate to these events, sync dates/info from parent repo docs.
