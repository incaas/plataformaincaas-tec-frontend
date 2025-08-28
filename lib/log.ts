export const logServer = (message: string, meta?: Record<string, unknown>) => {
  try {
    const entry = { level: 'info', message, meta }
    console.log(JSON.stringify(entry))
  } catch {
    console.log(message)
  }
}

export const logErrorServer = (message: string, error?: unknown, meta?: Record<string, unknown>) => {
  try {
    const entry = { level: 'error', message, error: error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error, meta }
    console.error(JSON.stringify(entry))
  } catch {
    console.error(message)
  }
}


