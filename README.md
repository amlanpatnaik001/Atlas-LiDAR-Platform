# Atlas LiDAR Platform

Client-facing frontend prototype for a LiDAR and roadway asset management platform.

## Stack
Next.js 16, React 19, TypeScript, Tailwind CSS, Lucide React, Framer Motion-ready, Zustand-ready.

## Run on Windows
1. Open PowerShell in this folder.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000`.

## Prototype routes
- `/dashboard`
- `/upload`
- `/projects`
- `/processing`
- `/viewer`
- `/exports`
- `/settings`

## Planned backend integration
- FastAPI for APIs
- PDAL for point-cloud processing and validation
- GDAL for raster/GIS processing and exports
- Local HDD first; S3-compatible storage later
- PostgreSQL/PostGIS later for metadata and spatial indexing
- Gemma 4 later for natural-language assistance
