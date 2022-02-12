# フロントエンド開発について
## 環境構築
```sh
git clone git@github.com:kokopelli-inc/ba-xba-frontend.git
cd ba-xba-frontend
git checkout develop
make build
npm i
npm run local
```
[Big Advance](http://localhost:3001) が表示できればOK

<br>

## コーディングルール

[Vueの公式なスタイルガイド](https://jp.vuejs.org/v2/style-guide/index.html) 

- 優先度 A:
  - 必須。
- 優先度 B:
  - 極力従う。

[Google JavaScript Style Guide](https://cou929.nu/data/google_javascript_style_guide/) 

抜粋
- 変数・メソッド名はcamelcase(testName)
- ファイル名はkebabcase(test-name)
- component名はpascalcase(TestName)
- インデントはスペース2

相談
- componentタグはpascalcase(分かりやすいと思うのでできればこれで統一したい)

<br>

## コマンド

### 開発モードでNuxtを起動

```sh
npm run local
```

<br>

### ESLintエラーについて
以下のコマンドを実行することにより自動修正&フォーマットされます
（マニュアルでの修正が大変な場合や、直せなかった場合に実行してみてください）
```sh
npm run fix
```

### Jest
以下のコマンドを実行することにより単体テストが実行されます
```sh
npm run test
```

以下のコマンドを実行することにより単体テストが実行とカバレッジ情報が出力されます
（出力先は/coverageになります）
```sh
npm run testc
```

<br>

## コメントについて
使用しているAPIについてはモジュールのコメントに記入をお願いします。
共通で利用するメソッドについては、機能・パラメータ等誰がみてもすぐに使える分かりやすいような記入をお願いします  
モジュールはTypeDocを使っていますがあまり詳しいドキュメントがないのでその場合はJSDocのマニュアルで確認してください  
[TypeDoc](https://typedoc.org/guides/doccomments/)  
[JSDoc](https://jsdoc.app/)  
利用しているエディタにプラグインを入れて利用するのが効率的だと思いますの(おすすめがありましたら情報共有お願いします)  
どうもtypedocはvueからドキュメントを生成してくれない。また、jsdocの一部のタグしか使えない

<br>

## APIのモックについて

1. /tests/api/jsonにモック用のレスポンスJSONを作成する
2. 以下のコマンドを実行する(作成してJSONデータをdb.jsonにマージする)
```sh
npm run jsonserver:merge
```
3. 以下のコマンドを実行する(モックサーバーを立ち上げる)
```sh
npm run jsonserver
```
成功すると以下のように表示される
```sh
> bigadvance2.0@ jsonserver /Users/yukosasagawa/workspace/ba-xba-frontend
> json-server --watch ./tests/api/db.json --port 3333 --routes ./tests/api/routes.json --middlewares ./tests/api/middleware.js 


  \{^_^}/ hi!

  Loading ./tests/api/db.json
  Loading ./tests/api/routes.json
  Loading ./tests/api/middleware.js
  Done

  Resources
  http://localhost:3333/activity_search
  http://localhost:3333/user_me

  Other routes
  /api/v1/* -> /$1

  Home
  http://localhost:3333

  Type s + enter at any time to create a snapshot of the database
  Watching...
```
