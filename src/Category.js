import React, { Component } from 'react'

class Category extends Component {
  



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


export default Category;