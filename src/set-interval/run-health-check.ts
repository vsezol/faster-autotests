export function runHealthCheck(): () => void {
  const intervalId = setInterval(async () => {
    try {
      await fetch(`my-test-api/health-check`);
      console.log('Alive :)');
    } catch {
      console.log('Dead :(');
    }
  }, 5000);

  return () => clearInterval(intervalId);
}
