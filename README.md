ra
## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique:true|

### Association
- has_many :groups, through: members
- has_many :messages
- has_many :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false,|
|message|references|null: false,foreign_key: true,|

### Association
- has_many :users, through: members
- has_many :messages
- has_many :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|message|text||
|image|string||
|user|references|null: false,foreign_key: true|
|group|references|null: false,foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group