# 📤 Comandos para Upload no GitHub

## Opção 1: Script Automático (Recomendado)

Execute o script PowerShell:
```powershell
.\upload-github.ps1
```

## Opção 2: Comandos Manuais

Se o Git estiver instalado, execute na ordem:

```bash
# 1. Inicializar repositório (se ainda não foi feito)
git init

# 2. Adicionar remote
git remote add origin https://github.com/BiroIgor/api-gerenciamento-pedidos.git

# 3. Adicionar todos os arquivos
git add .

# 4. Criar commit
git commit -m "Initial commit: API de gerenciamento de pedidos - Jitterbit"

# 5. Renomear branch para main (se necessário)
git branch -M main

# 6. Fazer push
git push -u origin main
```

## Opção 3: GitHub Desktop

1. Instale o GitHub Desktop: https://desktop.github.com/
2. Abra o GitHub Desktop
3. File → Add Local Repository
4. Selecione a pasta do projeto
5. Publish repository
6. URL: `https://github.com/BiroIgor/api-gerenciamento-pedidos`

## Opção 4: Interface Web do GitHub

1. Acesse: https://github.com/BiroIgor/api-gerenciamento-pedidos
2. Clique em "uploading an existing file"
3. Arraste todos os arquivos (exceto node_modules e .env)
4. Commit changes

## ⚠️ Importante

- **NÃO** faça commit do arquivo `.env` (já está no .gitignore)
- Certifique-se de ter configurado suas credenciais do GitHub
- Se usar HTTPS e pedir senha, pode precisar usar Personal Access Token

## 🔐 Personal Access Token

Se precisar criar um token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Marque: `repo` (Full control of private repositories)
4. Use o token como senha ao fazer push

