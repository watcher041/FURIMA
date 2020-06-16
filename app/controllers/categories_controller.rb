
class CategoriesController < ApplicationController

  def index
    @categories = Category.where(ancestry:nil)
  end

  def show

    @category = Category.find(params[:id])
    @categories = @category.children

    respond_to do |format|
      format.html
      format.json{
        render json: @categories
      }
    end 

  end

end