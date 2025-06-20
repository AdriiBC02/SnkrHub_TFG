// Archivo de configuración del favicon para Next.js 14
// Este archivo permite generar el favicon de manera programática
// También se puede usar para generar diferentes tamaños automáticamente

import { ImageResponse } from 'next/og';

// Tamaño del favicon (32x32 es el estándar)
export const size = {
  width: 32,
  height: 32,
};

// Tipo de contenido
export const contentType = 'image/png';

// Función que genera el favicon
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '6px',
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