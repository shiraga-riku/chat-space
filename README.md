
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null:false|
|password|string|null:false|
|name|string|null:false|

## Association
- has_many :messages
- has_many :groups, through::users_groups
- has_many :users_groups

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

## Association
- has_many :users, through::users_groups
- has_many :users_groups
- has_many :messages

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

## Association
- belongs_to:user
- belongs_to:group

## users_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


