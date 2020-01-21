import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavItems from './NavigationItems'
import NavItem from './NavigationItem/NavigationItem'
import React from 'react'

configure({adapter: new Adapter()})

describe('<NavigationItems/>',()=>{
    it('should render two <NavigationItem/> elements when not auth',()=>{
        const wrapper = shallow(<NavItems/>)
        expect(wrapper.find(NavItem)).toHaveLength(2)
    })
} )