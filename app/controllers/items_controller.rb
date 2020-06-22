
class ItemsController < ApplicationController

  def new
    @item = Item.new
  end

  def create

    @item = Item.new(item_params)
    brand = Brand.find_or_create_by(name:params[:item][:brand])
    @item.brand_id = brand&.id
    
    if @item.save && @item.images.length < 10 
      redirect_to root_path
    else
      redirect_to new_item_path
    end

  end

  def edit
    @item = Item.find(params[:id])
  end
  
  private
  def item_params
    params.require(:item)
          .permit(:id, 
                  :name, 
                  :detail, 
                  :price, 
                  :status, 
                  :pay_side, 
                  :post_date, 
                  :category_id, 
                  :prefecture_id, 
                  :post_way_id, 
                  images_attributes: [:id, :data, :item_id, :_destroy])
          .merge(user_id: current_user.id)
  end

end
