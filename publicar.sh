#!/bin/bash
# Publica el sitio en alejodirector.com: marca una versión nueva (para que ningún
# navegador se quede con archivos viejos), sube los cambios y espera a que estén en línea.
# Uso: ./publicar.sh "qué cambió"
set -e
cd "$(dirname "$0")"

V=$(date +%Y%m%d%H%M%S)
sed -i '' -E "s#(styles\.css|projects\.js|main\.js)\?v=[0-9]+#\1?v=$V#g" index.html
sed -i '' -E "s#(hero(-m)?\.jpg)\?v=[0-9]+#\1?v=$V#g" styles.css

git add -A
git commit -q -m "${1:-Actualiza el sitio}"
git pull -q --rebase
git push -q

echo "Subido. Esperando a que aparezca en alejodirector.com..."
for _ in $(seq 1 15); do
  sleep 15
  if curl -s "https://alejodirector.com/?$V" | grep -q "main.js?v=$V"; then
    echo "En línea (versión $V)."
    exit 0
  fi
done
echo "Se subió, pero aún no aparece en línea; puede tardar un par de minutos más."
exit 1
