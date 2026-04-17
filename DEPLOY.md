# Деплой Teamocracy


Сайт собран на **Vite + React**. На хостинг нужно заливать не исходники, а **собранную папку `dist/`**.

---

## Деплой на Vercel (рекомендуется)

Самый простой способ — залить проект на [Vercel](https://vercel.com). Поддерживается из коробки.

### Через сайт Vercel

1. Зарегистрируйтесь на [vercel.com](https://vercel.com) (можно через GitHub).
2. Нажмите **Add New Project** и импортируйте репозиторий с проектом (или загрузите папку через **Import**).
3. Vercel определит **Vite** автоматически. Поля оставьте по умолчанию:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Нажмите **Deploy**. После сборки сайт получит адрес вида `teamocracy-xxx.vercel.app`.

### Через CLI

```bash
cd Teamocracy
npx vercel
```

Следуйте подсказкам (логин, выбор проекта). Для продакшн-деплоя:

```bash
npx vercel --prod
```

В корне проекта есть **`vercel.json`**: задана сборка и правило для SPA (все маршруты отдаются через `index.html`).

---

## Деплой на Mirohost

### Шаг 1. Сборка проекта

В папке проекта выполните:

```bash
cd Teamocracy
npm run build
```

После этого появится папка **`dist/`** с готовыми файлами: `index.html`, папка `assets/` (JS, CSS), `favicon.svg` и т.д.

---

## Шаг 2. Загрузка на хостинг

Заливать нужно **содержимое папки `dist/`** в каталог `/var/www/teamocracy` на сервере (не саму папку `dist`, а то, что внутри неё).

### Вариант A: через lftp (из командной строки)

Установите [lftp](https://lftp.yar.ru/), затем выполните сборку и загрузку:

```bash
cd Teamocracy
npm run build
cd dist
lftp -e "set ftp:ssl-allow no; open -u teamocracy,6CvNT62TlyAX ez1270.mirohost.net; cd /var/www/teamocracy; mirror --reverse --verbose --delete --parallel=3 . .; bye"
```

Так вы загрузите всё из текущей папки (`dist`) на сервер в `/var/www/teamocracy`.

### Вариант B: через FileZilla

1. **Хост:** `ez1270.mirohost.net`  
2. **Пользователь:** `teamocracy`  
3. **Пароль:** `6CvNT62TlyAX`  
4. **Порт:** `21`  
5. Слева откройте папку **`Teamocracy/dist`** (после `npm run build`).  
6. Справа перейдите в **`/var/www/teamocracy`**.  
7. Выделите **все файлы и папки внутри `dist`** (index.html, assets, favicon.svg и т.д.) и перетащите их в `/var/www/teamocracy`.

---

## Шаг 3. Проверка

- Сайт: http://77.87.195.239/  
- Если настроен домен: http://teamocracy.mirohost.net/

---

## Важно

- Перед каждой загрузкой заново выполняйте **`npm run build`**, чтобы на сервер попала актуальная версия.  
- Файл **`.htaccess`** (в корне `dist`) нужен для Apache: он перенаправляет все запросы на `index.html`, чтобы работала клиентская маршрутизация (SPA).  
- Права: файлы **644**, папки **755** (на Mirohost обычно выставляются автоматически).
