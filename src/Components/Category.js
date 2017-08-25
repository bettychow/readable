import React, { Component } from 'react'
import { fetchByCategory } from '../Actions'
import { connect } from 'react-redux'

class Category extends Component {
  
  componentDidMount() {
    console.log('aaa', this.props.match.params.category)
    this.props.fetchPostsByCategory(this.props.match.params.category)
  }


  render () {

const { postByCat } = this.props
const time = (timestamp) => {
      let time =  parseInt(timestamp)
      let d = new Date(time)
      return `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}    ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }

   
console.log('postbycat', postByCat)
  return (
    <div>
      <div >
            <ul>              
            
                    <li>
                    </li>            
            </ul>
        </div>
      
    </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPostsByCategory: (category) => dispatch(fetchByCategory(category))
  } 
}

export default connect(null, mapDispatchToProps)(Category)