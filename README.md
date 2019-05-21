# todolist
## 實作環境
OS: Windows10 家用版  
### backend:
node Express: 4.16   
unit test tool:   
mocha: 6.1.4  
chai: 4.2.0  
supertest: 4.0.2  
ORM tool:  
Sequelize: 5.8.5   
Database server: Mysql 5.7  
### frontend:  
react: 16.5.2  
material-ui: 3.9.3  
jquery: 3.4.1  
## 後端設計:
* 5支API搭配不同http method達成顯示/新增/修改/刪除/回復資料
  * GET / 
取得所有DB資料  
Parameters: NULL  
Example Request: NULL  
Response formats: JSON  
Example Response:
[
{"id":1,"createdAt":"2019-05-21T11:25:19.000Z","content":"practice SE6","deltag":0},
{"id":2,"createdAt":"2019-05-21T11:28:49.000Z","content":"todo demo","deltag":0},
{"id":3,"createdAt":"2019-05-21T13:34:55.000Z","content":"find job","deltag":0}
]

  * POST / 
新增一筆資料  
Parameters: NULL  
Request form data: { oriMsg: 'practice SE6' }  
Response formats: JSON  
Example Response:  
[{"id":1,"createdAt":"2019-05-21T11:25:19.000Z","content":"practice SE6"}]  
  * DELETE /todo/:id 
刪除一筆資料  
Parameters: id: The database primary key.  
Example Request: NULL  
Response formats: JSON  
Response body:'ok'  
  * POSE /todo/:id 
回復刪除的一筆資料  
Parameters: The database primary key.  
Example Request: NULL  
Response formats: JSON  
Response body:'ok'  
  * PUT /todo/:id 
更新一筆資料  
Parameters: The database primary key.  
Example Request: NULL  
Response formats: JSON  
Response body:'ok'  
* 2支middleware function,判斷id是否存在/合法
* 修改express default listening port成3001
 讓前端(http://localhost:3000)以proxy(http://localhost:3001)方式連接
## 前端功能:
* 新增/修改/刪除/回復資料=>
jQuery發送Ajax Request,等待後端回傳sucess後再改變頁面
* 日期搜尋和全文搜尋=>
使用state判斷後直接修改頁面顯示
## Project 啟動方式
1. 分別在todo_list及todo_list/client中安裝module(npm update)
2. 設定DB Server
* 假設已存在Database server(Mysql 5.7),先自行建立好一個新的DB schema,並設定  
=>charset: utf8mb4,collate: utf8mb4_unicode_ci,以確保中文支援,
* 修改todo_list/config/config  
=>  "username": your username,  
    "password": your password,  
    "database": your new DB schema name  
* 使用migrations把todo-list struct移入,在project dir 運行cmd:  
   npx  sequelize-cli  db:migrate  
   =>將/migrations/.js 內容倒入,此時mysql中會產生一個todolist table在DB schema中
* 選填:倒入第一筆資料, 在project dir 運行cmd:  
   npx sequelize-cli db:seed:all
3. 打開express server
	在todo_list運行cmd:	npm start  
	等待執行完  
	[nodemon] restarting due to changes...  
	[nodemon] starting `node ./bin/www`  
	Executing (default): CREATE TABLE IF NOT EXISTS `todolists` (`id` INTEGER NOT NULL auto_increment , `content` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deletedAt` DATETIME, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
	Executing (default): SHOW INDEX FROM `todolists`  
4. 打開react server
	在todo_list/client中運行cmd: npm start  
	打開瀏覽器連結localhost:3000即可使用
