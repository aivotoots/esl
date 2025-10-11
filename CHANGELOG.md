# Changelog

## 11. oktoober 2025

**2025. aasta advendikontsertid** - struktuur ja noodid

- Refaktooritud andmestruktuur, jagades sisu eraldi hallatavateks väljadeks (`kontserdi_kava`, `registreerimisinfo`, `ajakava`).
- Eemaldatud dubleeritud sisu, kasutades YAML ankrute ja viidete funktsionaalsust, mis lihtsustab tulevikus muudatuste tegemist.
- Värskendatud lehe malli (`source/syndmused/index.pug`) uue andmestruktuuri toetamiseks.
- Parandatud kontserdikava tabeli kasutatavust: laulude pealkirjad on nüüd lingid nootidele.

## 10. oktoober 2025

**2021 KOORIVISIOON** - Parandatud vigane allalaadimislink (ull_albums → full_albums)

**2025 advendikontserdi kava** - Uuendatud 3-veeru tabeliga + kestustega

**Linkide loetavus** - Parandatud sisu linkide nähtavus (sinine, bold, allajoonitud) + link ikoon (ainult sisu linkidel, mitte navigatsioonil)

**package-lock.json** - Uuendatud uuema npm-iga

**.gitignore** - Build kaust ignoreeritud

**Emoji puhastus** - Eemaldatud liigne ℹ️ emoji advendikontserdi lehtedelt

**Eve Paapi foto** - Lisatud puuduv foto juhatuse lehele (juhatus_eve_paap.jpg)

**Juhatuse piltide ühtlustamine** - Kõik pildid sama suurusega (200x200px), ovaalne kuju (57% 43% 57% 43%) ja -3° kallutus

**Turvanõrkuste parandamine** - Uuendatud entu-ssg 5.2.0 → 5.6.15, parandatud 25 turvanõrkust (27 → 2), muudetud build/serve skriptid (build.js/serve.js → index.js)

**Tuljaku juhend** - Lisatud täielik konkursi juhend Tuljaku põhilehele (märkus: vabakategooria ja seeniorid avatud ka nais- ja meeskooridele)

**Hooaja lehe link** - Parandatud Tuljaku link /tuljak/2026/ → /tuljak/

**Markdown renderdamine** - Õpitud, et entu-ssg renderab MD läbi self.md() funktsiooni YAML failist (mitte eraldi .md failist)
