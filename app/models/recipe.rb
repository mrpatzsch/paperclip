class Recipe < ActiveRecord::Base
  has_attached_file :image, :styles => { small: "64x64", :medium => "300x300>", :thumb => "100x100>" }
  validates_attachment :image, :content_type => {:content_type => ["image/jpeg", "image/gif", "image/jpg"]}
end
