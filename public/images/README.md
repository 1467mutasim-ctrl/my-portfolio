# Image assets

Drop your own files here — the site references them by path from `src/data/portfolio.ts`.
Every image on the site renders inside a fixed frame that centre-crops whatever aspect
ratio you supply, so photos shot at 3:2, 4:3, 16:9, or vertical 4:5 all sit correctly
without letterboxing or distortion. If a file is missing, the frame draws an elegant
placeholder instead of a broken image.

```
images/
├── profile/                  profile.jpg          — portrait / headshot
├── projects/
│   ├── robosoccer/           cover.jpg, 01.jpg, 02.jpg
│   ├── lfr/                  cover.jpg, 01.jpg, 02.jpg
│   └── aqua-guard/           cover.jpg, 01.jpg, 02.jpg
└── photography/              photography-01.jpg … photography-06.jpg
```

Recommended: JPG or WebP, longest edge ~1600–2000px, compressed to roughly 200–400 KB.
