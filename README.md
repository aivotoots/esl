# Eesti Segakooride Liit

Official website for the Estonian Mixed Choirs Association.

**Live site**: [esl.ee](https://esl.ee) (or wherever deployed)

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Dev server → http://localhost:4000
npm run build      # Generate static site → build/
```

## Technology Stack

- **[Entu-SSG](https://github.com/entu/ssg)** - Static site generator
- **Pug** - Template engine
- **Stylus** - CSS preprocessor
- **YAML** - Content and data management

## Project Structure

```
source/
├── _templates/           # Reusable Pug layouts
│   ├── layout.pug        # Base template
│   ├── header.pug
│   ├── footer.pug
│   └── menyy.pug         # Navigation menu
├── _styles/
│   └── style.styl        # Main stylesheet
├── syndmused/            # Events section
│   ├── index.pug         # Event template
│   └── 2025/data.yaml    # Event data by year
├── data.{et,en}.yaml     # Page-level data
└── global.{et,en}.yaml   # Site-wide strings
assets/
├── event_imgs/           # Event posters by year
├── img/juhatus/          # Board member photos
├── doc/                  # Documents (PDFs, etc.)
└── fonts/, js/, css/     # Static assets
build/                    # Generated output (gitignored)
```

## Content Management

### Adding an Event

1. Edit `source/syndmused/YYYY/data.yaml`:

```yaml
-
    path: /syndmused/2025/my-event
    pealkiri: Event Title
    asukoht: Date and Location
    sisu: |
        <a href="/assets/event_imgs/2025/poster.jpg" data-lightbox="poster">
            <img src="/assets/event_imgs/2025/poster.jpg" style="width:480px">
        </a>
        
        Event description in markdown format.
```

2. Add poster to `assets/event_imgs/YYYY/`
3. Run `npm run build`

### Bilingual Content

- Estonian: `*.et.yaml` files (default locale)
- English: `*.en.yaml` files
- Templates use `self.fieldname` for language-agnostic access

### Navigation

Edit `source/global.et.yaml` → `menyy.lingid` array.

## Template Patterns

**Markdown in YAML**: Use `self.md(field)` in Pug to render:

```pug
p !{ self.md(self.sisu) }
```

**Lightbox gallery**: Wrap images in `<a data-lightbox="group-name">`.

**Template inheritance**: Year directories inherit from parent `index.pug`.

## Configuration

See [entu-ssg.yaml](entu-ssg.yaml):

- `locales: [en, et]` - Supported languages
- `defaultLocale: et` - Estonian as default
- `server.port: 4000` - Dev server port
- `protectedFromCleanup: [assets, index.html]` - Preserved during build

## Repository Info

This repository is maintained by [@aivotoots](https://github.com/aivotoots) and included as a git submodule in [mitselek/ESL](https://github.com/mitselek/ESL).

## See Also

- [CHANGELOG.md](CHANGELOG.md) - Recent updates
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - AI coding assistant context
