import React from 'react'
import CategoryPage from './CategoryPage'
import Loader from './Loader'
import Database from '../Database'

class CategoryPageContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      loaded: false,
      category: null,
      libraries: []
    }

    this.db = new Database()
  }

  componentDidMount () {
    const { match } = this.props
    const categoryId = match.params.categoryId

    this.db.getCategory(categoryId).then(category => {
      this.setState({
        loaded: true,
        category: category
      })
    })

    this.db.getLibraries(categoryId).then(libraries => {
      this.setState({libraries: libraries})
    })
  }

  render () {
    return <Loader loaded={this.state.loaded}>
      <CategoryPage category={this.state.category} libraries={this.state.libraries} />
    </Loader>
  }
}

export default CategoryPageContainer
