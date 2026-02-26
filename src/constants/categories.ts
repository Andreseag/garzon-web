// El Enum para lógica de programación
export enum Category {
  ULTIMA_HORA = 'ultima-hora',
  PODER_PUBLICO = 'poder-publico',
  INTERNACIONAL = 'internacional',
  TECNOLOGIA = 'tecnologia',
  DEPORTES = 'deportes',
  ECONOMIA = 'economia',
  CIENCIA_SALUD = 'ciencia-salud',
  SERVICIO_SOCIAL = 'servicio-social',
  DENUNCIA_CIUDADANA = 'denuncia-ciudadana',
  ANALISIS = 'analisis',
  OPINION = 'opinion',
}

// Mapa para obtener el Nombre Real (Label) a partir del Value
export const CategoryLabels: Record<string, string> = {
  [Category.ULTIMA_HORA]: 'Última hora',
  [Category.PODER_PUBLICO]: 'Poder público',
  [Category.INTERNACIONAL]: 'Internacional',
  [Category.TECNOLOGIA]: 'Tecnología',
  [Category.DEPORTES]: 'Deportes',
  [Category.ECONOMIA]: 'Economía',
  [Category.CIENCIA_SALUD]: 'Ciencia y Salud',
  [Category.SERVICIO_SOCIAL]: 'Servicio Social',
  [Category.DENUNCIA_CIUDADANA]: 'Denuncia Ciudadana',
  [Category.ANALISIS]: 'Análisis',
  [Category.OPINION]: 'Opinión',
}
