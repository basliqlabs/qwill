export function getBasePath() {
  return process.argv.includes('dev') ? '' : '/experiences'
}
