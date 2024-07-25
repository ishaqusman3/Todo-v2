import React from 'react'

const Salutation = () => {
    const getSslutation = () => {
        const currentHour = new  Date().getHours();
        if (currentHour < 12){
            return('Good Morning')
        }else if (currentHour < 18 ){
            return('Good Afternoon')
        } else {
            return('Good Evening')
        }
    }
  return (
    <div>{getSslutation()}</div>
  )
}

export default Salutation