# ポートフォリオ用サンプルECサイト ~ Furrisode ~ 

![Furrisode](https://img.shields.io/github/issues/ken-1200/django-vue-app) ![Furrisode](https://img.shields.io/github/forks/ken-1200/django-vue-app) ![Furrisode](https://img.shields.io/github/stars/ken-1200/django-vue-app)

<https://furrisode.com/>

このサイトは振袖に特化したECサイトです。ショップのオーナーとして、振袖を世界中の人に販売することができます。
また、その振袖を購入することができます。ぜび使用して操作感を教えてください！

# こだわりポイント
1. エンドユーザーを意識したシンプルで分かりやすい導線。
2. 興味を惹くようなデザイン。
3. 実サービスを意識したAWSを用いたインフラ。
4. エンドユーザーを意識したSPA化。
5. モダンで実務未経験でも学習コストの低いフレームワークを使用。（Vue.js/ Django）

## アプリの機能紹介
### 0. 機能一覧
| 機能名 | 説明 |
| ---- | ---- |
| ショップオーナー（ストア機能） | 新規登録、ログイン、ログアウト、ゲストログイン |
| 商品登録 | 商品名、画像、500字まで商品詳細入力可、値段は100円から登録可能、品数は1個から登録可能、入力内容リセット機能 |
| 商品編集（権限有） | 商品内容を表示、各項目毎編集可能、入力内容リセット機能、削除機能 |
| ユーザー（購入者機能） | 新規登録、ログイン、ログアウト、ゲストログイン、退会処理 |
| 購入機能 | 商品の購入、在庫数に応じて購入可能数を表示 |
| 商品一覧 | 商品情報を閲覧 |
| 商品詳細 | 商品情報の詳細表示、購入数選択、在庫数を表示 |
| カート | カートの中身表示、購入数の編集、購入品のキャンセル、同一商品は追加不可、ページネーション、購入数でソート可 |
| 購入確認 | 購入者情報表示、注文内容表示 |
| 決済確定 | 購入者名表示、購入完了表示、 |
| 購入履歴 | 注文日時表示、注文数表示、合計金額表示 |
## スキルセット
- Vue 3.12.0
- Vuetify 2.4.4
- Django 3.0.8
- Django-rest-framework 3.11.1
- Python 3.7
- Nginx 1.17.7
- Gunicorn 20.0.4
- Mysql 5.7.31
- Docker 19.03.13
- Docker-compose 1.27.4

## フロントエンド
| 名称 | 説明 |
| ---- | ---- |
| Vue.js | フロントエンドフレームワーク |
| Vuetify | UIコンポーネント |
| Axios | HTTP通信 |

- Vuetifyでレスポンシブデザインを表現しました。
- Vuexでステート管理しています。
- VueRouterでページのルーティングをしています。
- BeforeEnterなどのナビゲーションガードを使用して画面遷移を制御しました。
- scrollBehaviorでトランジションありの場合のみスクロール位置を記憶しています。
- ScrollObserverでスクロールアニメーションを実装しました。
- Mixinsで同じ処理を再利用しています。
- 無駄のないコンポーネント設計を意識しました。

## バックエンド
| 名称 | 説明 |
| ---- | ---- |
| Django（Rest-Framework） | RESTful API |
| Mysql | データベース |
| Swagger | ドキュメント: <https://backend.furrisode.com/api/swagger/> |
| Redoc | ドキュメント: <https://backend.furrisode.com/api/redoc/> |

- Djangoは「Django-Rest-Framework」を使用しており、フロントエンドからのリクエストに対してレスポンスを返しています。
- SwaggerやRedocでAPIのテストやIFの仕様が分かりやすいように工夫しました。
- 画像データはパッケージ「django-storages」を使用してS3バケットに保存しています。
- データベースはRDS（MYSQL）を使用しています。※インスタンスクラスは無料枠のdb.t2.microです。
- ショップオーナー側（ストア）とユーザー側（購入者）共に、ログイン/ログアウト機能に加え、トークン/リフレッシュトークンを使用したログイン状態を保持できるように実装しました。
- ストア側は「Groupモデル」を継承して、ストアモデルを実装しました。購入者側はデフォルトの「Userモデル」をカスタマイズして実装しています。
- セキュリティ面ではパスワード保存時に「hashlib」というPythonライブラリを使用。SHA256で暗号化しセキュアな実装をしました。
- また、「BaseAuthentication、BasePermission」を継承して「認証、権限」機能を実装しています。
- 認証トークンを持った（ログイン時に発行する）ショップオーナーが自身の商品を編集/削除できるように権限が与えられています。

## テストコード
| 名称 | 説明 |
| ---- | ---- |
| Jest | フロントエンドテスト: 単体テスト/Mutationsのテスト/コンポーネントテスト |
| Unittest | バックエンドテスト: 単体テスト/APIテスト |

- CodePipelineのTestステージで実行するテストコードです。

## インフラ
| 名称 | 説明 |
| ---- | ---- |
| ECS Fargate | 本番環境用コンテナ, サーバーレスコンピューティングエンジン |
| CodePipeline | CI/CD |
| RDS | データベース（Mysql） |
| S3 | 静的ファイル保存 |
| Docker, Docker-compose | ローカル開発環境用コンテナ |
| Github | バージョン管理 |

- ローカル、本番環境共にDockerを使用しました。
- ALBを通すことで常時SSL通信化。
- AWS CodePipelineを使用してgit pushでAmazon ECSをデプロイしています。
- 本番環境の環境変数は、CodeBuildを実行中にS3から.envファイルをコピーしてきています。
- 『Sourceステージ → Testステージ → Buildステージ → Deployステージ』のパイプラインで実行。
- Testステージで問題が発生した場合は当該ソースでデプロイは実行されません。
- 本番環境のバックエンドのアプリケーションサーバー(WSGIサーバー)はGunicornを使用し、WebサーバーはNginxを使用しています。

## AWS構造図
大まかなAWSで使用したサービスのアーキテクチャ図。
![aws](https://django-vue-app-readme.s3-ap-northeast-1.amazonaws.com/django-vue-app-aws_ver1.3.png)

## DB構造図
必要最低限のテーブルを作成。
![db](https://django-vue-app-readme.s3-ap-northeast-1.amazonaws.com/db.png)
