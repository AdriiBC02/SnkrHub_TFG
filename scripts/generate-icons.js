// Script para generar diferentes tamaños de iconos
// Este script toma el favicon.png original y genera múltiples tamaños
// para diferentes dispositivos y navegadores

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Tamaños de iconos que necesitamos generar
const iconSizes = [
  { size: 16, name: 'icon-16x16.png' },
  { size: 32, name: 'icon-32x32.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 512, name: 'icon-512x512.png' },
  { size: 180, name: 'apple-icon.png' },
];

// Función para generar iconos
async function generateIcons() {
  const inputPath = path.join(__dirname, '../app/favicon.png');
  const outputDir = path.join(__dirname, '../public');

  // Crear directorio public si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🔄 Generando iconos...');

  try {
    for (const icon of iconSizes) {
      const outputPath = path.join(outputDir, icon.name);
      
      await sharp(inputPath)
        .resize(icon.size, icon.size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generado: ${icon.name} (${icon.size}x${icon.size})`);
    }

    // Copiar el favicon original a public
    const faviconOutputPath = path.join(outputDir, 'favicon.png');
    fs.copyFileSync(inputPath, faviconOutputPath);
    console.log('✅ Copiado: favicon.png');

    console.log('🎉 ¡Todos los iconos han sido generados exitosamente!');
    console.log('📁 Los iconos se encuentran en la carpeta /public');

  } catch (error) {
    console.error('❌ Error generando iconos:', error);
    process.exit(1);
  }
}

// Ejecutar el script
generateIcons(); 