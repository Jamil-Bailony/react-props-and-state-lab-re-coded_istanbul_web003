import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = type => {
    this.setState({
      filters: {
        ...this.state.filters,
        type
      }
    })
  }

  handleFindPetsClick = async () => {
    const urlParameter = 
      this.state.filters.type === 'all'?
        '':
        '?type=' + this.state.filters.type;

    const url = `/api/pets${urlParameter}`

    const petsData = await fetch(url)
    const petsFound = await petsData.json()

    this.setState({
      pets: petsFound
    })
  }

  handleAdoptPet = id => {
    const petIndex = this.state.pets.findIndex(el => el.id === id)
    const copyOfPets = [...this.state.pets]
    copyOfPets[petIndex].isAdopted = true

    this.setState({
      pets: copyOfPets
    })

    console.log(copyOfPets);
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                changeType={this.onChangeType} 
                onFindPetsClick={this.handleFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets}
                onAdoptPet={this.handleAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
