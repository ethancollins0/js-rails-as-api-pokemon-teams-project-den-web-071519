class PokemonsController < ApplicationController
    def index
        trainers = Trainer.all
          render json: trainers.to_json(:include => {
            :pokemons => {:only => [:id, :species, :nickname, :trainer_id]}
        }, :except => [:updated_at, :created_at]) 
    end

    def create
        pokemon = Pokemon.addPokemon(params[:trainer_id])
        render json: pokemon.to_json({:only => [:id, :species, :nickname, :trainer_id]})
    end

    def destroy
        pokemon = Pokemon.destroy(params[:id])
        render json: pokemon.to_json({:only => [:id, :species, :nickname, :trainer_id]})
    end
end
