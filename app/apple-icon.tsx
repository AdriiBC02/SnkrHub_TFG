// Archivo de configuración del icono de Apple para Next.js 14
// Este archivo genera el icono que aparece en dispositivos Apple (iPhone, iPad)
// Tamaño recomendado: 180x180 píxeles

import { ImageResponse } from 'next/og';

// Tamaño del icono de Apple (180x180 es el estándar)
export const size = {
  width: 180,
  height: 180,
};

// Tipo de contenido
export const contentType = 'image/png';

// Función que genera el icono de Apple
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '20px',
        }}
      >
        SH
      </div>
    ),
    {
      ...size,
    }
  );
} 