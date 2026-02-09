import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'StellaOS',
    short_name: 'Stella',
    description: 'Level 60 ENTP Life Management System',
    start_url: '/',
    display: 'standalone',
    background_color: '#050b14',
    theme_color: '#0f172a',
    orientation: 'portrait-primary',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}