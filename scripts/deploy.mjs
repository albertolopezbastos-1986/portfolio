import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('../', import.meta.url)));
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const messageIndex = args.indexOf('-m');
if (messageIndex !== -1 && !args[messageIndex + 1]) {
  console.error('Usá -m "Descripción del cambio".');
  process.exit(1);
}
const message = messageIndex === -1 ? 'Update portfolio' : args[messageIndex + 1];
const paths = ['dist', 'scripts', '.github', 'package.json', 'package-lock.json', 'README.md', '.gitignore'].filter(existsSync);

function run(command, commandArgs, capture = false) {
  const result = spawnSync(command, commandArgs, {
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    encoding: 'utf8',
    shell: false
  });
  if (result.error || result.status !== 0) {
    if (capture && result.stderr) console.error(result.stderr.trim());
    console.error(result.error?.message || `Falló: ${command} ${commandArgs.join(' ')}`);
    process.exit(result.status || 1);
  }
  return capture ? result.stdout.trim() : '';
}

if (run('git', ['branch', '--show-current'], true) !== 'main') {
  console.error('Ejecutá el despliegue desde main. No se modificó la rama actual.');
  process.exit(1);
}
const remote = run('git', ['remote', 'get-url', 'origin'], true);
console.log(`Destino: ${remote}`);
for (const file of ['dist/app.js', 'scripts/serve.mjs', 'scripts/deploy.mjs']) {
  run(process.execPath, ['--check', file]);
}
for (const file of ['dist/index.html', 'dist/style.css']) {
  if (!existsSync(file)) { console.error(`Falta ${file}`); process.exit(1); }
}

const staged = run('git', ['diff', '--cached', '--name-only', '-z'], true).split('\0').filter(Boolean);
const outside = staged.filter(file => !paths.some(p => file === p || file.startsWith(p + '/')));
if (outside.length) {
  console.error('Hay archivos preparados fuera del sitio. Revisalos antes de publicar:', outside.join(', '));
  process.exit(1);
}
console.log(run('git', ['status', '--short'], true) || 'Sin cambios locales.');
if (dryRun) {
  console.log('Verificación OK. No se creó un commit ni se hizo push.');
  process.exit(0);
}
run('git', ['add', '--', ...paths]);
if (run('git', ['diff', '--cached', '--name-only'], true)) {
  run('git', ['commit', '-m', message]);
} else {
  console.log('Sin cambios nuevos para guardar; se subirán los commits pendientes.');
}
run('git', ['push', '-u', 'origin', 'main']);
console.log('Push completado. GitHub Actions publicará dist/ en Pages.');
console.log('Seguí el despliegue en https://github.com/albertolopezbastos-1986/portfolio/actions');
