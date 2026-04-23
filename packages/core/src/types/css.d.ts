declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

// Plain CSS imports ke liye (tokens.css etc.)
declare module '*.css' {
  const content: string
  export default content
}