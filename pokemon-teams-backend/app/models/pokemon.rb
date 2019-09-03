class Pokemon < ApplicationRecord
    belongs_to :trainer

    def self.addPokemon(trainer_id)
        current_trainer = Trainer.where(id: trainer_id).first
        if current_trainer.pokemons.count < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: current_trainer.id)
            return pokemon
        end
    end
end
