import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { existsSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { deflateSync } from 'zlib'

const __dirname = dirname(fileURLToPath(import.meta.url))

function generatePNG(width, height, r, g, b) {
  const sig = Buffer.from([137,80,78,71,13,10,26,10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width,0); ihdr.writeUInt32BE(height,4)
  ihdr[8]=8; ihdr[9]=2; ihdr[10]=0; ihdr[11]=0; ihdr[12]=0

  const rowSize = width*3+1
  const raw = Buffer.alloc(height*rowSize)
  for(let y=0;y<height;y++){
    raw[y*rowSize]=0
    for(let x=0;x<width;x++){
      const o=y*rowSize+1+x*3
      raw[o]=r; raw[o+1]=g; raw[o+2]=b
    }
  }

  const table=new Uint32Array(256)
  for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=(c&1)?0xEDB88320^(c>>>1):(c>>>1);table[n]=c}
  const crc32=(buf)=>{let c=0xFFFFFFFF;for(let i=0;i<buf.length;i++)c=(c>>>8)^table[(c^buf[i])&0xFF];return(c^0xFFFFFFFF)>>>0}
  const chunk=(type,data)=>{const t=Buffer.from(type,'ascii');const l=Buffer.alloc(4);l.writeUInt32BE(data.length);const cr=Buffer.alloc(4);cr.writeUInt32BE(crc32(Buffer.concat([t,data])));return Buffer.concat([l,t,data,cr])}

  return Buffer.concat([sig, chunk('IHDR',ihdr), chunk('IDAT',deflateSync(raw)), chunk('IEND',Buffer.alloc(0))])
}

function iconsPlugin() {
  return {
    name: 'generate-icons', enforce: 'pre',
    buildStart() {
      const pub = join(__dirname,'public')
      if(!existsSync(pub)) mkdirSync(pub,{recursive:true})
      // #7C6CF8 = rgb(124,108,248)
      if(!existsSync(join(pub,'icon-192.png'))) writeFileSync(join(pub,'icon-192.png'),generatePNG(192,192,124,108,248))
      if(!existsSync(join(pub,'icon-512.png'))) writeFileSync(join(pub,'icon-512.png'),generatePNG(512,512,124,108,248))
    }
  }
}

export default defineConfig({
  plugins: [
    iconsPlugin(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'] },
      manifest: {
        name: 'HabitForge',
        short_name: 'HabitForge',
        description: 'Daily habit & goal tracker with XP and streaks',
        theme_color: '#06080F',
        background_color: '#06080F',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      }
    })
  ]
})
