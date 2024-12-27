import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Header(props) {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-3xl font-bold tracking-tight text-orange-500" to="/">
          MernEats.com
        </Link>
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
