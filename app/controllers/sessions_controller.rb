class SessionsController < ApplicationController

    def login
        user = User.find_by(name: params[:name])
        if user.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        else 
            render json: { error: "not authorized"}, status: 401
        end 
    end 

    def logout
        if session[:user_id]
            session.destroy
            head :no_content
        else 
            render_unauthorized
        end 
    end 

end
