import { execSync } from 'node:child_process';
import { writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

execSync('npm run build', { stdio: 'inherit' });
writeFileSync(join('dist', '.nojekyll'), '');
execSync('git init -b gh-pages', { cwd: 'dist', stdio: 'inherit' });
execSync('git config user.name "Sudais"', { cwd: 'dist', stdio: 'inherit' });
execSync('git config user.email "sudaisaccnt2-svg@users.noreply.github.com"', { cwd: 'dist', stdio: 'inherit' });
execSync('git add -A', { cwd: 'dist', stdio: 'inherit' });
execSync('git commit -m "Deploy AI Atlas"', { cwd: 'dist', stdio: 'inherit' });
execSync('git remote add origin https://github.com/sudaisaccnt2-svg/ai-atlas-hub.git', { cwd: 'dist', stdio: 'inherit' });
execSync('git push -f origin gh-pages', { cwd: 'dist', stdio: 'inherit' });
rmSync(join('dist', '.git'), { recursive: true, force: true });
console.log('Published to https://sudaisaccnt2-svg.github.io/ai-atlas-hub/');
