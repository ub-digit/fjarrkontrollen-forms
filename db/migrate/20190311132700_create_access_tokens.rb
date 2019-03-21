class CreateAccessTokens < ActiveRecord::Migration[5.2]
  def change
    create_table :access_tokens do |t|
      t.text :token
      t.datetime :token_expire
      t.text :username
      t.integer :user_id
    end
  end
end
