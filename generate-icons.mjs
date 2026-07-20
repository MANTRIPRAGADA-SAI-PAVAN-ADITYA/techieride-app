// Generates simple SVG-based PWA icons as PNG using canvas via node
// Run: node generate-icons.mjs
import { createCanvas } from 'canvas'
import { writeFileSync } from 'fs'

function makeIcon(size) {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, size, size)
  grad.addColorStop(0, '#14a1af')
  grad.addColorStop(1, '#0d3c55')
  ctx.fillStyle = grad
  // Rounded rect
  const r = size * 0.22
  ctx.beginPath()
  ctx.moveTo(r, 0); ctx.lineTo(size-r, 0)
  ctx.quadraticCurveTo(size, 0, size, r)
  ctx.lineTo(size, size-r)
  ctx.quadraticCurveTo(size, size, size-r, size)
  ctx.lineTo(r, size); ctx.quadraticCurveTo(0, size, 0, size-r)
  ctx.lineTo(0, r); ctx.quadraticCurveTo(0, 0, r, 0)
  ctx.closePath()
  ctx.fill()

  // Car emoji text
  const fontSize = size * 0.48
  ctx.font = `${fontSize}px serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('🚗', size/2, size/2)

  return canvas.toBuffer('image/png')
}

writeFileSync('public/icons/icon-192.png', makeIcon(192))
writeFileSync('public/icons/icon-512.png', makeIcon(512))
console.log('Icons generated: 192x192 and 512x512')
