Бонус
Пагинацию для списка коммитов. 
GET /api/repos/:repositoryId/commits/:commitHash/:pageSize/:page

pageSize - количество коммитов на одной странице.
page - номер страницы.

Супер Бонус
Подсчет всех цифр и букв латиницы в репозитории.

GET /api/repos/:repositoryId/allSymbols/:commitHash

возвращает объект вида {symbols: {}, ignor: []}

symbols - объект всех подсчитанных символов (all - общая сумма).
ignor  - списог проигнорированных файлов, в которых нет хотя бы одной цифры и буквы латиницы.